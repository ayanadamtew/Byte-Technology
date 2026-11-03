import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import zlib from 'node:zlib';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import {
  createContactRateLimiter,
  getSecurityHeaders,
  isResendConfigured,
  processContactEnquiry,
} from './src/server/contact-service';
import {
  generateRobotsTxt,
  generateSitemapXml,
  normalizeSiteOrigin,
} from './src/config/seo';
import { BYTE_BRAND } from './src/styles/tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Lightweight native gzip compression middleware for text/js/css/json/xml/svg payloads.
 */
function compressionMiddleware(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const acceptEncoding = req.headers['accept-encoding'] || '';
  if (!acceptEncoding.includes('gzip') || req.method === 'HEAD') {
    next();
    return;
  }

  const originalSend = res.send.bind(res);
  res.send = ((body?: unknown): express.Response => {
    if (res.headersSent || res.getHeader('Content-Encoding')) {
      return originalSend(body);
    }

    const contentType = String(res.getHeader('Content-Type') || '');
    const isCompressible =
      /text\/|application\/(javascript|json|xml|manifest\+json)|image\/svg\+xml/i.test(
        contentType
      );

    if (!isCompressible || body == null) {
      return originalSend(body);
    }

    const buffer = Buffer.isBuffer(body)
      ? body
      : typeof body === 'string'
        ? Buffer.from(body, 'utf8')
        : Buffer.from(JSON.stringify(body), 'utf8');

    if (buffer.byteLength < 512) {
      return originalSend(body);
    }

    const compressed = zlib.gzipSync(buffer, { level: 6 });
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Vary', 'Accept-Encoding');
    res.setHeader('Content-Length', String(compressed.byteLength));
    return originalSend(compressed);
  }) as typeof res.send;

  next();
}

async function startServer() {
  const app = express();
  const PORT = 3000;
  const contactRateLimiter = createContactRateLimiter({
    windowMs: 15 * 60 * 1000,
    maxRequests: 15,
  });
  const securityHeaders = getSecurityHeaders();

  app.disable('x-powered-by');
  app.use((_req, res, next) => {
    for (const [headerName, headerValue] of Object.entries(securityHeaders)) {
      res.setHeader(headerName, headerValue);
    }
    next();
  });
  app.use(compressionMiddleware);

  // Parse JSON payloads with strict size ceiling for security
  app.use(express.json({ limit: '64kb' }));

  /**
   * GET /robots.txt
   * Serves standards-compliant crawler directives and canonical sitemap reference.
   */
  app.get('/robots.txt', (_req, res) => {
    const origin = normalizeSiteOrigin(process.env.APP_URL);
    res
      .status(200)
      .type('text/plain; charset=utf-8')
      .setHeader('Cache-Control', 'public, max-age=3600')
      .send(generateRobotsTxt(origin));
  });

  /**
   * GET /sitemap.xml
   * Serves XML sitemap covering all 5 approved Byte Technology routes.
   */
  app.get('/sitemap.xml', (_req, res) => {
    const origin = normalizeSiteOrigin(process.env.APP_URL);
    res
      .status(200)
      .type('application/xml; charset=utf-8')
      .setHeader('Cache-Control', 'public, max-age=3600')
      .send(generateSitemapXml(origin));
  });

  /**
   * GET /api/contact/status
   * Reports whether server-side email notification (Resend) is configured
   * without exposing any API keys or secrets.
   */
  app.get('/api/contact/status', (_req, res) => {
    const recipient =
      process.env.CONTACT_RECIPIENT_EMAIL?.trim() || BYTE_BRAND.email;
    res.status(200).json({
      ok: true,
      recipient,
      provider: 'resend',
      configured: isResendConfigured(process.env),
    });
  });

  /**
   * POST /api/contact
   * Validates the consultation enquiry on the server, enforces per-IP rate limiting,
   * formats the structured brief, and triggers Resend email notification to ayanadamtew@gmail.com when configured.
   */
  app.post('/api/contact', async (req, res) => {
    try {
      const forwardedFor = req.headers['x-forwarded-for'];
      const clientKey =
        (typeof forwardedFor === 'string'
          ? forwardedFor.split(',')[0]?.trim()
          : undefined) ||
        req.ip ||
        'unknown';

      const rateCheck = contactRateLimiter.check(clientKey);
      if (!rateCheck.allowed) {
        res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
        res.status(429).json({
          ok: false,
          statusCode: 429,
          recipient: BYTE_BRAND.email,
          message: `Too many consultation submissions from this network. Please wait ${rateCheck.retryAfterSeconds} seconds or email ${BYTE_BRAND.email} directly.`,
        });
        return;
      }

      const result = await processContactEnquiry(req.body ?? {}, process.env);
      res.status(result.statusCode).json(result);
    } catch {
      res.status(500).json({
        ok: false,
        statusCode: 500,
        deliveryStatus: 'provider_error',
        recipient: BYTE_BRAND.email,
        message: `An unexpected server error occurred while processing your consultation request. Please email ${BYTE_BRAND.email} directly.`,
      });
    }
  });

  /**
   * Return 404 JSON for any unknown /api/* routes instead of falling through to SPA HTML.
   */
  app.all('/api/*', (_req, res) => {
    res.status(404).json({
      ok: false,
      statusCode: 404,
      message: 'API endpoint not found.',
    });
  });

  const distPath = path.join(__dirname, 'dist');
  const distIndexPath = path.join(distPath, 'index.html');
  const serveProductionDist =
    process.env.NODE_ENV === 'production' ||
    (process.env.DISABLE_HMR === 'true' && fs.existsSync(distIndexPath));

  if (serveProductionDist && fs.existsSync(distIndexPath)) {
    const mimeByExt: Record<string, string> = {
      '.js': 'application/javascript; charset=utf-8',
      '.css': 'text/css; charset=utf-8',
      '.svg': 'image/svg+xml; charset=utf-8',
      '.json': 'application/json; charset=utf-8',
      '.xml': 'application/xml; charset=utf-8',
      '.txt': 'text/plain; charset=utf-8',
    };

    app.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'HEAD') {
        next();
        return;
      }
      const ext = path.extname(req.path).toLowerCase();
      const mimeType = mimeByExt[ext];
      if (!mimeType) {
        next();
        return;
      }
      const safeRelPath = path.normalize(req.path).replace(/^(\.\.(\/|\\|$))+/, '');
      const candidatePath = path.join(distPath, safeRelPath);
      if (!candidatePath.startsWith(distPath) || !fs.existsSync(candidatePath) || !fs.statSync(candidatePath).isFile()) {
        next();
        return;
      }
      res.setHeader('Content-Type', mimeType);
      if (req.path.startsWith('/assets/')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      } else {
        res.setHeader('Cache-Control', 'public, max-age=3600');
      }
      res.send(fs.readFileSync(candidatePath));
    });

    // Serve binary/image assets with long-term immutable caching
    app.use(
      '/assets',
      express.static(path.join(distPath, 'assets'), {
        maxAge: '365d',
        immutable: true,
      })
    );
    app.use(
      express.static(distPath, {
        index: false,
        maxAge: '1h',
      })
    );
    app.get('*', (_req, res) => {
      res.type('text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'no-cache');
      res.send(fs.readFileSync(distIndexPath, 'utf8'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Byte Technology full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
