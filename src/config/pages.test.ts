import test from 'node:test';
import assert from 'node:assert/strict';
import {
  FULL_SERVICES_SPECIFICATIONS,
  ENGINEERING_STANDARDS,
  ABOUT_BRAND_PRINCIPLES,
  CONSULTATION_RESPONSE_STEPS,
  resolveServiceIdFromParam,
  validateConsultationForm,
  formatConsultationBrief,
} from './pages';

test('Full services specifications cover all 7 official services with 5 deliverables each', () => {
  assert.equal(FULL_SERVICES_SPECIFICATIONS.length, 7);
  for (const spec of FULL_SERVICES_SPECIFICATIONS) {
    assert.equal(spec.deliverables.length, 5);
    assert.ok(spec.overview.length > 50);
    assert.ok(spec.businessImpact.length > 20);
  }
});

test('resolveServiceIdFromParam resolves both slug IDs and service names accurately', () => {
  assert.equal(
    resolveServiceIdFromParam('custom-software-and-erp-systems'),
    'custom-software-and-erp-systems'
  );
  assert.equal(
    resolveServiceIdFromParam('Custom software and ERP systems'),
    'custom-software-and-erp-systems'
  );
  assert.equal(
    resolveServiceIdFromParam('ai-and-business-automation'),
    'ai-and-business-automation'
  );
  assert.equal(resolveServiceIdFromParam('unknown-service'), null);
  assert.equal(resolveServiceIdFromParam(null), null);
});

test('validateConsultationForm rejects empty or invalid inputs and accepts valid briefs', () => {
  const invalidResult = validateConsultationForm({
    selectedServiceIds: [],
    senderName: '',
    senderRole: '',
    organizationName: 'A',
    workEmail: 'not-an-email',
    projectContext: 'Too short',
  });

  assert.equal(invalidResult.valid, false);
  assert.ok(invalidResult.errors.selectedServiceIds);
  assert.ok(invalidResult.errors.senderName);
  assert.ok(invalidResult.errors.organizationName);
  assert.ok(invalidResult.errors.workEmail);
  assert.ok(invalidResult.errors.projectContext);

  const validResult = validateConsultationForm({
    selectedServiceIds: ['custom-software-and-erp-systems', 'cloud-solutions'],
    senderName: 'Abebe Kebede',
    senderRole: 'Operations Director',
    organizationName: 'Horizon Logistics PLC',
    workEmail: 'abebe@horizonlogistics.et',
    projectContext:
      'We need to unify our multi-branch inventory and finance workflows into a centralized ERP system.',
  });

  assert.equal(validResult.valid, true);
  assert.deepEqual(validResult.errors, {});
});

test('formatConsultationBrief generates structured brief text and mailto targeting ayanadamtew@gmail.com', () => {
  const formatted = formatConsultationBrief({
    selectedServiceIds: ['web-development', 'ui-ux-design'],
    senderName: 'Sara Tadesse',
    senderRole: 'Product Lead',
    organizationName: 'Abyssinia Commerce',
    workEmail: 'sara@abyssiniacommerce.et',
    projectContext:
      'Redesigning our customer self-service web portal with a unified UI/UX design system.',
  });

  assert.ok(formatted.mailtoHref.startsWith('mailto:ayanadamtew@gmail.com?subject='));
  assert.equal(formatted.selectedServiceNames.length, 2);
  assert.ok(formatted.body.includes('Abyssinia Commerce'));
  assert.ok(formatted.body.includes('01. Web development'));
  assert.ok(formatted.body.includes('06. UI/UX design'));
});

test('Engineering standards, About principles, and Consultation steps match documentation', () => {
  assert.equal(ENGINEERING_STANDARDS.length, 4);
  assert.equal(ABOUT_BRAND_PRINCIPLES.length, 5);
  assert.deepEqual(
    ABOUT_BRAND_PRINCIPLES.map((p) => p.principle),
    ['Modern', 'Professional', 'Innovative', 'Trustworthy', 'Ambitious']
  );
  assert.equal(CONSULTATION_RESPONSE_STEPS.length, 3);
});
