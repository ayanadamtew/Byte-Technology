import {
  validateConsultationForm,
  formatConsultationBrief,
  type ConsultationFormInput,
  type ConsultationValidationResult,
} from '../config/pages';
import { BYTE_BRAND } from '../styles/tokens';

export interface ServerContactPayload extends ConsultationFormInput {
  /** Optional anti-spam honeypot field; must be empty */
  websiteHoneypot?: string;
}

export type EmailDeliveryStatus =
  | 'delivered'
  | 'provider_unconfigured'
  | 'provider_error';

export interface ContactSubmissionResult {
  ok: boolean;
  statusCode: number;
  deliveryStatus?: EmailDeliveryStatus;
  recipient: string;
  messageId?: string;
  message: string;
  errors?: ConsultationValidationResult['errors'];
  formattedBrief?: {
    subject: string;
    body: string;
    mailtoHref: string;
  };
}

export interface ResendEnvConfig {
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  CONTACT_RECIPIENT_EMAIL?: string;
}

/**
 * Checks whether a real Resend API key is configured in server environment variables.
 * Never exposes the key value.
 */
export function isResendConfigured(env: ResendEnvConfig): boolean {
  const rawKey = (env.RESEND_API_KEY ?? '').trim();
  return (
    rawKey.length > 0 &&
    rawKey !== 'MY_RESEND_API_KEY' &&
    rawKey !== 'YOUR_RESEND_API_KEY'
  );
}

/**
 * Escapes HTML special characters to prevent injection inside HTML email templates.
 */
export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Strips carriage-return and line-feed characters from single-line header fields
 * (sender name, role, organization, email) to prevent CRLF / header injection.
 */
export function sanitizeSingleLineInput(input: string, maxLength: number): string {
  return input.replace(/[\r\n\0]+/g, ' ').slice(0, maxLength);
}

/**
 * Standard HTTP security headers for Byte Technology responses.
 * Preserves iframe compatibility for the AI Studio preview environment.
 */
export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  };
}

export interface RateLimitCheckResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Creates a memory-safe sliding-window per-IP rate limiter for POST /api/contact.
 */
export function createContactRateLimiter(options?: {
  windowMs?: number;
  maxRequests?: number;
}) {
  const windowMs = options?.windowMs ?? 15 * 60 * 1000;
  const maxRequests = options?.maxRequests ?? 15;
  const hitsByIp = new Map<string, number[]>();

  return {
    check(clientKey: string, nowMs: number = Date.now()): RateLimitCheckResult {
      const key = (clientKey || 'unknown').trim() || 'unknown';
      const cutoff = nowMs - windowMs;
      const existing = (hitsByIp.get(key) ?? []).filter((ts) => ts > cutoff);

      if (existing.length >= maxRequests) {
        const oldestInWindow = existing[0] ?? nowMs;
        const retryAfterSeconds = Math.max(
          1,
          Math.ceil((oldestInWindow + windowMs - nowMs) / 1000)
        );
        hitsByIp.set(key, existing);
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds,
        };
      }

      existing.push(nowMs);
      hitsByIp.set(key, existing);

      // Periodic bound on map size to prevent unbounded memory growth
      if (hitsByIp.size > 1000) {
        for (const [k, timestamps] of hitsByIp.entries()) {
          if (timestamps.every((ts) => ts <= cutoff)) {
            hitsByIp.delete(k);
          }
        }
      }

      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - existing.length),
        retryAfterSeconds: 0,
      };
    },
  };
}

/**
 * Builds a clean, high-contrast HTML email body matching Byte Technology's architectural identity.
 */
export function buildConsultationHtmlEmail(
  input: ConsultationFormInput,
  formatted: { subject: string; body: string }
): string {
  const safeOrg = escapeHtml(input.organizationName.trim());
  const safeName = escapeHtml(input.senderName.trim());
  const safeRole = escapeHtml(input.senderRole.trim());
  const safeEmail = escapeHtml(input.workEmail.trim());
  const safeBody = escapeHtml(formatted.body);

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<body style="margin:0;padding:24px;background-color:#F2F2EE;font-family:Inter,system-ui,sans-serif;color:#1A2130;">',
    '  <div style="max-width:640px;margin:0 auto;background-color:#FFFFFF;border:1px solid #DFDFD9;border-radius:8px;overflow:hidden;">',
    '    <div style="background-color:#1A2130;padding:20px 24px;border-bottom:3px solid #FA8112;">',
    '      <p style="margin:0;font-family:monospace;font-size:11px;letter-spacing:0.08em;color:#FDA63A;text-transform:uppercase;">Byte Technology · Ethiopia</p>',
    `      <h1 style="margin:6px 0 0;font-size:18px;color:#F2F2EE;">${escapeHtml(formatted.subject)}</h1>`,
    '    </div>',
    '    <div style="padding:24px;">',
    `      <p style="margin:0 0 12px;font-size:14px;color:#4A5365;">New project consultation inquiry from <strong>${safeName}</strong>${safeRole ? ` (${safeRole})` : ''} at <strong>${safeOrg}</strong> (<a href="mailto:${safeEmail}" style="color:#FA8112;">${safeEmail}</a>).</p>`,
    `      <pre style="margin:16px 0 0;padding:16px;background-color:#FAF9F6;border:1px solid #DFDFD9;border-radius:6px;font-family:monospace;font-size:12px;line-height:1.6;color:#1A2130;white-space:pre-wrap;">${safeBody}</pre>`,
    '    </div>',
    '  </div>',
    '</body>',
    '</html>',
  ].join('\n');
}

/**
 * Sanitizes and processes a contact enquiry on the server.
 * - Enforces server-side input validation and anti-spam honeypot checks.
 * - Dispatches via Resend API when RESEND_API_KEY is configured.
 * - Truthfully reports provider status without ever claiming unverified email delivery.
 */
export async function processContactEnquiry(
  rawPayload: unknown,
  env: ResendEnvConfig,
  fetchImpl: typeof fetch = fetch
): Promise<ContactSubmissionResult> {
  const recipient =
    (env.CONTACT_RECIPIENT_EMAIL ?? '').trim() || BYTE_BRAND.email;

  if (!rawPayload || typeof rawPayload !== 'object') {
    return {
      ok: false,
      statusCode: 400,
      recipient,
      message: 'Invalid request payload.',
    };
  }

  const record = rawPayload as Record<string, unknown>;

  // Honeypot anti-spam check
  if (
    typeof record.websiteHoneypot === 'string' &&
    record.websiteHoneypot.trim().length > 0
  ) {
    return {
      ok: false,
      statusCode: 400,
      recipient,
      message: 'Automated spam submission rejected.',
    };
  }

  const input: ConsultationFormInput = {
    selectedServiceIds: Array.isArray(record.selectedServiceIds)
      ? record.selectedServiceIds
          .filter((item): item is string => typeof item === 'string')
          .slice(0, 7)
      : [],
    senderName:
      typeof record.senderName === 'string'
        ? sanitizeSingleLineInput(record.senderName, 120)
        : '',
    senderRole:
      typeof record.senderRole === 'string'
        ? sanitizeSingleLineInput(record.senderRole, 120)
        : '',
    organizationName:
      typeof record.organizationName === 'string'
        ? sanitizeSingleLineInput(record.organizationName, 160)
        : '',
    workEmail:
      typeof record.workEmail === 'string'
        ? sanitizeSingleLineInput(record.workEmail, 160)
        : '',
    projectContext:
      typeof record.projectContext === 'string'
        ? record.projectContext.replace(/\0/g, '').slice(0, 4000)
        : '',
  };

  const validation = validateConsultationForm(input);
  if (!validation.valid) {
    return {
      ok: false,
      statusCode: 400,
      recipient,
      message: 'Please correct the highlighted fields and try again.',
      errors: validation.errors,
    };
  }

  const formattedBrief = formatConsultationBrief(input);

  // Check if Resend is configured on the server
  if (!isResendConfigured(env)) {
    return {
      ok: true,
      statusCode: 200,
      deliveryStatus: 'provider_unconfigured',
      recipient,
      formattedBrief,
      message:
        'Your consultation inquiry was validated by the server and structured for ayanadamtew@gmail.com. Because RESEND_API_KEY is not yet configured in the server environment, automated background email delivery was not executed—please click "Open in Email Client" below to send your prepared brief directly.',
    };
  }

  const fromAddress =
    (env.RESEND_FROM_EMAIL ?? '').trim() ||
    'Byte Technology Platform <onboarding@resend.dev>';

  try {
    const response = await fetchImpl('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${(env.RESEND_API_KEY ?? '').trim()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress,
        to: [recipient],
        reply_to: input.workEmail.trim(),
        subject: formattedBrief.subject,
        text: formattedBrief.body,
        html: buildConsultationHtmlEmail(input, formattedBrief),
      }),
    });

    const responseBody = (await response.json().catch(() => ({}))) as {
      id?: string;
      message?: string;
      error?: string;
    };

    if (!response.ok) {
      const reason =
        responseBody.message ||
        responseBody.error ||
        `HTTP ${response.status}`;
      return {
        ok: true,
        statusCode: 200,
        deliveryStatus: 'provider_error',
        recipient,
        formattedBrief,
        message: `Your consultation brief was validated and prepared, but the email provider returned an error (${reason}). You can dispatch your brief immediately using the direct email link below.`,
      };
    }

    return {
      ok: true,
      statusCode: 200,
      deliveryStatus: 'delivered',
      recipient,
      messageId: responseBody.id,
      formattedBrief,
      message: `Your consultation inquiry has been sent to ${recipient}.`,
    };
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : 'Network connection error';
    return {
      ok: true,
      statusCode: 200,
      deliveryStatus: 'provider_error',
      recipient,
      formattedBrief,
      message: `Your consultation brief was validated and prepared, but the email provider could not be reached (${errorMessage}). Please use the direct email link below to send immediately.`,
    };
  }
}
