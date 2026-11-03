import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOMEPAGE_HERO,
  HERO_SYSTEM_LAYERS,
  HOMEPAGE_SERVICES_BENTO,
  FEATURED_SOLUTION_BLUEPRINTS,
  WHY_BYTE_PILLARS,
  DEVELOPMENT_PROCESS_PHASES,
  TARGET_AUDIENCE_SEGMENTS,
  getBlueprintById,
} from './homepage';

test('Homepage hero preserves the exact requested headline and official mission', () => {
  assert.equal(
    HOMEPAGE_HERO.headline,
    'Build smarter. Work better. Move Ethiopia forward.'
  );
  assert.equal(
    HOMEPAGE_HERO.mission,
    'Our mission is simple: To Digitalize Ethiopia.'
  );
});

test('Homepage services bento covers all 7 official Byte Technology services without additions', () => {
  assert.equal(HOMEPAGE_SERVICES_BENTO.length, 7);
  assert.deepEqual(
    [...HOMEPAGE_SERVICES_BENTO].map((s) => s.name).sort(),
    [
      'Web development',
      'Mobile application development',
      'Custom software and ERP systems',
      'IT consulting',
      'Cloud solutions',
      'UI/UX design',
      'AI and business automation',
    ].sort()
  );
});

test('Hero system layers organize all 7 services across 3 architectural layers', () => {
  assert.equal(HERO_SYSTEM_LAYERS.length, 3);
  const totalServicesInLayers = HERO_SYSTEM_LAYERS.reduce(
    (acc, layer) => acc + layer.services.length,
    0
  );
  assert.equal(totalServicesInLayers, 7);
});

test('Featured solution blueprints and lookup helper work deterministically', () => {
  assert.equal(FEATURED_SOLUTION_BLUEPRINTS.length, 4);
  const aiBlueprint = getBlueprintById('ai-automation-blueprint');
  assert.equal(aiBlueprint.id, 'ai-automation-blueprint');
  assert.ok(aiBlueprint.servicesCombined.length >= 2);

  const fallbackBlueprint = getBlueprintById('non-existent');
  assert.equal(fallbackBlueprint.id, FEATURED_SOLUTION_BLUEPRINTS[0].id);
});

test('Target audience segments, Why Byte pillars, and 4-phase process are complete', () => {
  assert.equal(TARGET_AUDIENCE_SEGMENTS.length, 4);
  assert.equal(WHY_BYTE_PILLARS.length, 4);
  assert.equal(DEVELOPMENT_PROCESS_PHASES.length, 4);
  assert.deepEqual(
    DEVELOPMENT_PROCESS_PHASES.map((p) => p.phase),
    ['01', '02', '03', '04']
  );
});
