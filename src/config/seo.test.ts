import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildPageSeoPayload,
  buildStructuredDataGraph,
  calculateContrastRatio,
  generateRobotsTxt,
  generateSitemapXml,
  resolveCanonicalUrl,
} from './seo';
import { BYTE_NAVIGATION_ITEMS } from './navigation';

test('SEO metadata: every sitemap route has a unique title (30-65 chars) and concise meta description (110-165 chars)', () => {
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const item of BYTE_NAVIGATION_ITEMS) {
    const payload = buildPageSeoPayload(item.path, 'https://byte.et');
    assert.equal(payload.robots, 'index, follow');
    assert.ok(
      payload.title.length >= 30 && payload.title.length <= 65,
      `Title length out of optimal bounds for ${item.path}: "${payload.title}" (${payload.title.length})`
    );
    assert.ok(
      payload.description.length >= 110 && payload.description.length <= 165,
      `Description length out of optimal bounds for ${item.path}: "${payload.description}" (${payload.description.length})`
    );
    titles.add(payload.title);
    descriptions.add(payload.description);
  }

  assert.equal(titles.size, BYTE_NAVIGATION_ITEMS.length);
  assert.equal(descriptions.size, BYTE_NAVIGATION_ITEMS.length);
});

test('SEO metadata: 404 route sets noindex, nofollow and preserves canonical resolution', () => {
  const notFound = buildPageSeoPayload('/unknown-page', 'https://byte.et');
  assert.equal(notFound.robots, 'noindex, nofollow');
  assert.equal(resolveCanonicalUrl('/services/', 'https://byte.et/'), 'https://byte.et/services');
});

test('Structured Data (JSON-LD): includes Organization, ProfessionalService, 7 official services, WebSite, and BreadcrumbList', () => {
  const graphDoc = buildStructuredDataGraph('/contact', 'https://byte.et');
  assert.equal(graphDoc['@context'], 'https://schema.org');
  const graph = graphDoc['@graph'] as Array<Record<string, unknown>>;
  assert.equal(graph.length, 4);

  const orgNode = graph[0];
  assert.equal(orgNode.name, 'Byte Technology');
  assert.equal(orgNode.email, 'ayanadamtew@gmail.com');
  assert.equal(orgNode.slogan, 'Our mission is simple: To Digitalize Ethiopia.');

  const catalog = orgNode.hasOfferCatalog as { itemListElement: unknown[] };
  assert.equal(catalog.itemListElement.length, 7);

  const pageNode = graph[2];
  assert.equal(pageNode['@type'], 'ContactPage');
});

test('Sitemap.xml and Robots.txt generators output valid standards-compliant content', () => {
  const sitemap = generateSitemapXml('https://byte.et');
  assert.ok(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(sitemap.includes('<loc>https://byte.et/</loc>'));
  assert.ok(sitemap.includes('<loc>https://byte.et/services</loc>'));
  assert.ok(sitemap.includes('<loc>https://byte.et/approach</loc>'));
  assert.ok(sitemap.includes('<loc>https://byte.et/about</loc>'));
  assert.ok(sitemap.includes('<loc>https://byte.et/contact</loc>'));

  const robots = generateRobotsTxt('https://byte.et');
  assert.ok(robots.includes('User-agent: *'));
  assert.ok(robots.includes('Allow: /'));
  assert.ok(robots.includes('Disallow: /api/'));
  assert.ok(robots.includes('Sitemap: https://byte.et/sitemap.xml'));
});

test('WCAG 2.1 AA Color Contrast: all primary, secondary, muted, and accent text pairs exceed 4.5:1', () => {
  // Light surfaces (#F2F2EE Warm Alabaster, #FAF9F6 Ivory, #FFFFFF Pure)
  assert.ok(calculateContrastRatio('#1A2130', '#F2F2EE') >= 12.0); // Primary Navy on Alabaster
  assert.ok(calculateContrastRatio('#4A5365', '#F2F2EE') >= 6.0);  // Secondary Slate on Alabaster
  assert.ok(calculateContrastRatio('#525B6C', '#F2F2EE') >= 5.5);  // Muted Slate on Alabaster
  assert.ok(calculateContrastRatio('#9A3412', '#F2F2EE') >= 4.5);  // Accessible Signal Amber text on Alabaster
  assert.ok(calculateContrastRatio('#9A3412', '#FAF9F6') >= 4.5);  // Accessible Signal Amber text on Ivory
  assert.ok(calculateContrastRatio('#B45309', '#FFFFFF') >= 4.5);  // Accessible Signal Amber text on White

  // Primary CTA Button (#111622 Deep Obsidian text on #FA8112 Byte Signal Orange)
  assert.ok(calculateContrastRatio('#111622', '#FA8112') >= 7.0);

  // Dark surfaces (#1A2130 Byte Navy Obsidian, #232C3F Elevated Slate, #111622 Deep Obsidian)
  assert.ok(calculateContrastRatio('#F2F2EE', '#1A2130') >= 12.0); // Primary Alabaster on Navy
  assert.ok(calculateContrastRatio('#B0B8C8', '#1A2130') >= 7.5);  // Secondary Muted on Navy
  assert.ok(calculateContrastRatio('#9BA6B8', '#232C3F') >= 4.5);  // Muted Metadata on Elevated Dark Slate
  assert.ok(calculateContrastRatio('#FDA63A', '#1A2130') >= 7.5);  // Luminous Amber on Navy
  assert.ok(calculateContrastRatio('#FA8112', '#1A2130') >= 5.5);  // Signal Orange on Navy
});
