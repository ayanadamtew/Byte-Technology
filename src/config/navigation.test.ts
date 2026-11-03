import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BYTE_NAVIGATION_ITEMS,
  buildConsultationMailto,
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
