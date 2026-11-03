import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BYTE_BRAND,
  BYTE_COLORS,
  BYTE_OFFICIAL_SERVICES,
  BYTE_SPACING,
  BYTE_TYPOGRAPHY,
} from './tokens';

test('Byte Technology brand constants preserve official company facts and mission', () => {
  assert.equal(BYTE_BRAND.name, 'Byte Technology');
  assert.equal(BYTE_BRAND.location, 'Ethiopia');
  assert.equal(BYTE_BRAND.mission, 'Our mission is simple: To Digitalize Ethiopia.');
  assert.equal(BYTE_BRAND.email, 'ayanadamtew@gmail.com');
  assert.equal(BYTE_BRAND.logoPath, '/assets/aistudio/byte_logo_2939abed.jpeg');
});

test('Color tokens match the official Byte Technology logo palette', () => {
  assert.equal(BYTE_COLORS.light.canvas, '#F2F2EE');
  assert.equal(BYTE_COLORS.dark.canvas, '#1A2130');
  assert.equal(BYTE_COLORS.accent.orange, '#FA8112');
  assert.equal(BYTE_COLORS.accent.amber, '#FDA63A');
});

test('Official services list contains exactly the 7 approved services in order', () => {
  assert.equal(BYTE_OFFICIAL_SERVICES.length, 7);
  const serviceNames = BYTE_OFFICIAL_SERVICES.map((s) => s.name);
  assert.deepEqual(serviceNames, [
    'Web development',
    'Mobile application development',
    'Custom software and ERP systems',
    'IT consulting',
    'Cloud solutions',
    'UI/UX design',
    'AI and business automation',
  ]);
});

test('Spacing and typography tokens enforce 8px baseline and 2+1 font rule', () => {
  assert.equal(BYTE_SPACING.baselineUnitPx, 8);
  assert.equal(BYTE_SPACING.containerMaxWidthPx, 1280);
  assert.ok(BYTE_TYPOGRAPHY.fonts.display.includes('Plus Jakarta Sans'));
  assert.ok(BYTE_TYPOGRAPHY.fonts.sans.includes('DM Sans'));
  assert.ok(BYTE_TYPOGRAPHY.fonts.mono.includes('JetBrains Mono'));
});
