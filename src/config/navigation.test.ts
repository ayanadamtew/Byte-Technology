import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BYTE_NAVIGATION_ITEMS,
  buildConsultationMailto,
  getVerifiedSocialLinks,
  isValidExternalHttpsUrl,
  resolveRouteMetadata,
} from './navigation';

test('Navigation structure defines all 5 approved sitemap routes in order', () => {
  assert.equal(BYTE_NAVIGATION_ITEMS.length, 5);
  assert.deepEqual(
    BYTE_NAVIGATION_ITEMS.map((item) => item.path),
    ['/', '/services', '/approach', '/about', '/contact']
  );
  assert.deepEqual(
    BYTE_NAVIGATION_ITEMS.map((item) => item.label),
    ['Home', 'Services', 'Approach', 'About', 'Contact']
  );
});

test('resolveRouteMetadata matches exact and trailing-slash paths and returns undefined for 404 routes', () => {
  const home = resolveRouteMetadata('/');
  assert.ok(home);
  assert.equal(home.label, 'Home');

  const servicesWithSlash = resolveRouteMetadata('/services/');
  assert.ok(servicesWithSlash);
  assert.equal(servicesWithSlash.label, 'Services');

  const unknown = resolveRouteMetadata('/non-existent-route');
  assert.equal(unknown, undefined);
});

test('buildConsultationMailto targets official Byte Technology email with encoded subject', () => {
  const defaultHref = buildConsultationMailto();
  assert.ok(defaultHref.startsWith('mailto:ayanadamtew@gmail.com?subject='));

  const serviceHref = buildConsultationMailto({
    serviceName: 'Custom software and ERP systems',
  });
  assert.ok(serviceHref.includes('mailto:ayanadamtew@gmail.com'));
  assert.ok(serviceHref.includes(encodeURIComponent('Custom software and ERP systems')));
});

test('getVerifiedSocialLinks returns empty array when unconfigured and only valid https:// links when provided', () => {
  assert.deepEqual(getVerifiedSocialLinks({}), []);
  assert.equal(isValidExternalHttpsUrl('http://insecure.example.com'), false);
  assert.equal(isValidExternalHttpsUrl('not-a-url'), false);
  assert.equal(isValidExternalHttpsUrl('https://linkedin.com/company/byte-technology'), true);

  const configured = getVerifiedSocialLinks({
    VITE_SOCIAL_LINKEDIN_URL: 'https://www.linkedin.com/company/byte-technology',
    VITE_SOCIAL_GITHUB_URL: 'https://github.com/byte-technology',
    VITE_SOCIAL_FACEBOOK_URL: 'https://www.facebook.com/bytetechnology',
  });

  assert.equal(configured.length, 3);
  assert.equal(configured[0].label, 'LinkedIn');
  assert.equal(configured[1].label, 'GitHub');
  assert.equal(configured[2].label, 'Facebook');
});

