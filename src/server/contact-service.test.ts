import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  isResendConfigured,
  escapeHtml,
  processContactEnquiry,
} from './contact-service';

describe('Server-Side Contact & Resend Email Service (src/server/contact-service.ts)', () => {
  it('accurately detects whether RESEND_API_KEY is configured vs placeholder', () => {
    assert.equal(isResendConfigured({}), false);
    assert.equal(isResendConfigured({ RESEND_API_KEY: '' }), false);
    assert.equal(isResendConfigured({ RESEND_API_KEY: 'MY_RESEND_API_KEY' }), false);
    assert.equal(isResendConfigured({ RESEND_API_KEY: 're_live_123456789' }), true);
  });

  it('escapes HTML special characters in user input', () => {
    const unsafe = `<script>alert("xss")</script> & 'quote'`;
    assert.equal(
      escapeHtml(unsafe),
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt; &amp; &#39;quote&#39;'
    );
  });

  it('rejects invalid payloads and honeypot spam submissions with 400 status', async () => {
    const invalidRes = await processContactEnquiry(
      {
        selectedServiceIds: [],
        senderName: '',
        senderRole: '',
        organizationName: '',
        workEmail: 'not-an-email',
        projectContext: 'short',
      },
      {}
    );
    assert.equal(invalidRes.ok, false);
    assert.equal(invalidRes.statusCode, 400);
    assert.ok(invalidRes.errors?.selectedServiceIds);
    assert.ok(invalidRes.errors?.workEmail);

    const spamRes = await processContactEnquiry(
      {
        selectedServiceIds: ['web-development'],
        senderName: 'Bot',
        senderRole: '',
        organizationName: 'Spam Corp',
        workEmail: 'bot@spam.com',
        projectContext: 'Valid length context string for testing honeypot.',
        websiteHoneypot: 'https://spam-link.example.com',
      },
      {}
    );
    assert.equal(spamRes.ok, false);
    assert.equal(spamRes.statusCode, 400);
  });

  it('returns provider_unconfigured truthfully when RESEND_API_KEY is not set', async () => {
    const result = await processContactEnquiry(
      {
        selectedServiceIds: ['custom-software-and-erp-systems'],
        senderName: 'Abebe Kebede',
        senderRole: 'Operations Director',
        organizationName: 'Horizon Logistics Ethiopia',
        workEmail: 'abebe@horizon.et',
        projectContext:
          'We want to centralize finance, procurement, and multi-warehouse inventory.',
      },
      {}
    );

    assert.equal(result.ok, true);
    assert.equal(result.statusCode, 200);
    assert.equal(result.deliveryStatus, 'provider_unconfigured');
    assert.equal(result.recipient, 'ayanadamtew@gmail.com');
    assert.ok(result.formattedBrief?.body.includes('Horizon Logistics Ethiopia'));
    assert.ok(result.formattedBrief?.mailtoHref.startsWith('mailto:ayanadamtew@gmail.com'));
  });

  it('dispatches email via Resend API and returns delivered when RESEND_API_KEY is valid', async () => {
    let capturedUrl = '';
    let capturedHeaders: Record<string, string> = {};
    let capturedBody: Record<string, unknown> = {};

    const mockFetch: typeof fetch = async (input, init) => {
      capturedUrl = String(input);
      capturedHeaders = (init?.headers as Record<string, string>) ?? {};
      capturedBody = JSON.parse(String(init?.body ?? '{}'));
      return new Response(JSON.stringify({ id: 're_msg_987654321' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    };

    const result = await processContactEnquiry(
      {
        selectedServiceIds: ['web-development', 'ai-and-business-automation'],
        senderName: 'Selamawit Tadesse',
        senderRole: 'CTO',
        organizationName: 'Addis FinTech PLC',
        workEmail: 'selam@addisfintech.et',
        projectContext:
          'We need a modern customer portal and automated document verification pipeline.',
      },
      {
        RESEND_API_KEY: 're_test_valid_key',
        RESEND_FROM_EMAIL: 'Byte Technology <notifications@bytetechnology.et>',
      },
      mockFetch
    );

    assert.equal(capturedUrl, 'https://api.resend.com/emails');
    assert.equal(capturedHeaders.Authorization, 'Bearer re_test_valid_key');
    assert.deepEqual(capturedBody.to, ['ayanadamtew@gmail.com']);
    assert.equal(capturedBody.reply_to, 'selam@addisfintech.et');
    assert.equal(result.ok, true);
    assert.equal(result.deliveryStatus, 'delivered');
    assert.equal(result.messageId, 're_msg_987654321');
    assert.equal(result.recipient, 'ayanadamtew@gmail.com');
  });

  it('handles Resend provider API errors gracefully while preserving the prepared brief', async () => {
    const failingFetch: typeof fetch = async () =>
      new Response(
        JSON.stringify({ message: 'Domain not verified' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );

    const result = await processContactEnquiry(
      {
        selectedServiceIds: ['cloud-solutions'],
        senderName: 'Dawit Haile',
        senderRole: 'Head of IT',
        organizationName: 'Ethio Supply Chain',
        workEmail: 'dawit@ethiosupply.et',
        projectContext:
          'We are migrating our on-premise databases to a high-availability cloud architecture.',
      },
      { RESEND_API_KEY: 're_test_restricted_key' },
      failingFetch
    );

    assert.equal(result.ok, true);
    assert.equal(result.deliveryStatus, 'provider_error');
    assert.ok(result.message.includes('Domain not verified'));
    assert.ok(result.formattedBrief?.mailtoHref.startsWith('mailto:ayanadamtew@gmail.com'));
  });
});
