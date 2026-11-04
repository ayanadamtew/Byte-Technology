import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  getSecurityHeaders,
  isResendConfigured,
} from '../../src/server/contact-service';
import { BYTE_BRAND } from '../../src/styles/tokens';

function sendJson(res: ServerResponse, statusCode: number, payload: unknown): void {
  const securityHeaders = getSecurityHeaders();
  for (const [headerName, headerValue] of Object.entries(securityHeaders)) {
    res.setHeader(headerName, headerValue);
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.statusCode = statusCode;
  res.end(JSON.stringify(payload));
}

export default function handler(
  req: IncomingMessage,
  res: ServerResponse
): void {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    sendJson(res, 405, {
      ok: false,
      statusCode: 405,
      message: 'Method not allowed.',
    });
    return;
  }

  const recipient =
    process.env.CONTACT_RECIPIENT_EMAIL?.trim() || BYTE_BRAND.email;

  sendJson(res, 200, {
    ok: true,
    recipient,
    provider: 'resend',
    configured: isResendConfigured(process.env),
  });
}
