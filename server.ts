import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import {
  isResendConfigured,
  processContactEnquiry,
} from './src/server/contact-service';
import { BYTE_BRAND } from './src/styles/tokens';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON payloads with strict size ceiling for security
  app.use(express.json({ limit: '64kb' }));

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
   * Validates the consultation enquiry on the server, formats the structured brief,
   * and triggers Resend email notification to ayanadamtew@gmail.com when configured.
   */
  app.post('/api/contact', async (req, res) => {
    try {
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

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Byte Technology full-stack server running on http://localhost:${PORT}`);
  });
}

startServer();
