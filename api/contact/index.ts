import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  createContactRateLimiter,
  getSecurityHeaders,
  processContactEnquiry,
} from '../../src/server/contact-service';
import { BYTE_BRAND } from '../../src/styles/tokens';

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

const contactRateLimiter = createContactRateLimiter({
  windowMs: 15 * 60 * 1000,
  maxRequests: 15,
});

function sendJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  const securityHeaders = getSecurityHeaders();
  for (const [headerName, headerValue] of Object.entries(securityHeaders)) {
    res.setHeader(headerName, headerValue);
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
}

async function parseRequestBody(req: VercelRequest): Promise<unknown> {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return null;
      }
    }
    return req.body;
  }

  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk: Buffer | string) => {
      raw += typeof chunk === 'string' ? chunk : chunk.toString('utf8');
      if (raw.length > 65536) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!raw.trim()) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(null);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(
  req: VercelRequest,
  res: ServerResponse
): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, {
      ok: false,
      statusCode: 405,
      recipient: BYTE_BRAND.email,
      message: 'Method not allowed.',
    });
    return;
  }

  try {
    const forwardedFor = req.headers['x-forwarded-for'];
    const clientKey =
      (typeof forwardedFor === 'string'
        ? forwardedFor.split(',')[0]?.trim()
        : Array.isArray(forwardedFor)
          ? forwardedFor[0]?.trim()
          : undefined) ||
      req.socket?.remoteAddress ||
      'unknown';

    const rateCheck = contactRateLimiter.check(clientKey);
    if (!rateCheck.allowed) {
      res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
      sendJson(res, 429, {
        ok: false,
        statusCode: 429,
        recipient: BYTE_BRAND.email,
        message: `Too many consultation submissions from this network. Please wait ${rateCheck.retryAfterSeconds} seconds or email ${BYTE_BRAND.email} directly.`,
      });
      return;
    }

    const payload = await parseRequestBody(req);
    const result = await processContactEnquiry(payload, process.env);
    sendJson(res, result.statusCode, result);
  } catch {
    sendJson(res, 500, {
      ok: false,
      statusCode: 500,
      deliveryStatus: 'provider_error',
      recipient: BYTE_BRAND.email,
      message: `An unexpected server error occurred while processing your consultation request. Please email ${BYTE_BRAND.email} directly.`,
    });
  }
}
