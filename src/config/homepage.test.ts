import test from 'node:test';
import assert from 'node:assert/strict';
import {
  HOMEPAGE_HERO,
  HERO_VALUE_PROPOSITIONS,
  HERO_WORKFLOW_COMPARISON,
  HERO_SYSTEM_LAYERS,
  HOMEPAGE_SERVICES_BENTO,
  FEATURED_SOLUTION_BLUEPRINTS,
  WHY_BYTE_PILLARS,
  DEVELOPMENT_PROCESS_PHASES,
  TARGET_AUDIENCE_SEGMENTS,
  getBlueprintById,
} from './homepage';

test('Homepage hero preserves the exact requested headline, supporting text, CTAs, and official mission', () => {
  assert.equal(
    HOMEPAGE_HERO.headline,
    'Software that replaces your manual workflows.'
  );
  assert.equal(
    HOMEPAGE_HERO.lead,
    'We build web platforms, mobile apps, ERP systems and cloud infrastructure for Ethiopian businesses, so your team stops chasing paper and spreadsheets.'
  );
  assert.equal(HOMEPAGE_HERO.primaryCta.label, 'Book a free consultation');
  assert.equal(HOMEPAGE_HERO.primaryCta.path, '/contact');
  assert.equal(HOMEPAGE_HERO.secondaryCta.label, 'See what we build');
  assert.equal(
    HOMEPAGE_HERO.mission,
    'Our mission is simple: To Digitalize Ethiopia.'
  );
});

test('Hero value propositions flag unverified claims for review instead of publishing them as confirmed facts', () => {
  assert.equal(HERO_VALUE_PROPOSITIONS.length, 4);
  const confirmed = HERO_VALUE_PROPOSITIONS.filter((item) => item.verified);
  const flagged = HERO_VALUE_PROPOSITIONS.filter((item) => !item.verified);

  assert.equal(confirmed.length, 3);
  assert.equal(flagged.length, 1);
  assert.equal(
    flagged[0].text,
    'Interfaces in Amharic, Afan Oromo and English.'
  );
  assert.ok(flagged[0].reviewFlag && flagged[0].reviewFlag.length > 0);
});

test('Hero workflow comparison defines Today and With Byte tabs with 4 rows each and illustrative disclaimer', () => {
  assert.ok(HERO_WORKFLOW_COMPARISON.disclaimer.toLowerCase().includes('illustrative'));

  const today = HERO_WORKFLOW_COMPARISON.states.today;
  assert.equal(today.tabLabel, 'Today');
  assert.equal(today.rows.length, 4);
  assert.deepEqual(
    today.rows.map((r) => [r.area, r.value]),
    [
      ['Orders', 'Written in a notebook'],
      ['Stock', 'stock_final_v3.xlsx'],
      ['Customers', 'Lost in WhatsApp chats'],
      ['Invoices', 'Paper, filed by hand'],
    ]
  );
  assert.equal(today.summaryMessage, 'Month-end report: 3 days of manual work.');

  const withByte = HERO_WORKFLOW_COMPARISON.states['with-byte'];
  assert.equal(withByte.tabLabel, 'With Byte');
  assert.equal(withByte.rows.length, 4);
  assert.deepEqual(
    withByte.rows.map((r) => [r.area, r.value]),
    [
      ['Orders', 'Organized digital workflow.'],
      ['Stock', 'Centralized inventory management.'],
      ['Customers', 'Structured customer records.'],
      ['Invoices', 'Digital document management.'],
    ]
  );
  assert.equal(
    withByte.summaryMessage,
    'Less manual work. More control. Better business decisions.'
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
