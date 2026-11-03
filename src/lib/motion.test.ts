import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  BYTE_EASE,
  BYTE_DURATIONS,
  createRevealVariants,
  createStaggerContainerVariants,
  splitHeadlineIntoTokens,
  createPageTransitionVariants,
} from './motion';

describe('Byte Technology Motion System (src/lib/motion.ts)', () => {
  it('defines the approved high-damping architectural easing curve and durations', () => {
    assert.deepEqual(BYTE_EASE, [0.22, 1, 0.36, 1]);
    assert.equal(BYTE_DURATIONS.micro, 0.18);
    assert.equal(BYTE_DURATIONS.module, 0.28);
    assert.equal(BYTE_DURATIONS.reveal, 0.45);
  });

  it('creates standard reveal variants with vertical offset when motion is enabled', () => {
    const variants = createRevealVariants({
      prefersReducedMotion: false,
      yOffset: 14,
      delay: 0.05,
    });
    assert.equal(variants.hidden.opacity, 0);
    assert.equal(variants.hidden.y, 14);
    assert.equal(variants.visible.opacity, 1);
    assert.equal(variants.visible.y, 0);
    assert.equal(variants.visible.transition.delay, 0.05);
  });

  it('disables vertical translation and delays when prefersReducedMotion is true', () => {
    const reveal = createRevealVariants({
      prefersReducedMotion: true,
      yOffset: 16,
      delay: 0.2,
    });
    assert.equal(reveal.hidden.opacity, 1);
    assert.equal(reveal.hidden.y, 0);
    assert.equal(reveal.visible.transition.delay, 0);

    const stagger = createStaggerContainerVariants(true, 0.08, 0.1);
    assert.equal(stagger.visible.transition.staggerChildren, 0);
    assert.equal(stagger.visible.transition.delayChildren, 0);

    const page = createPageTransitionVariants(true);
    assert.equal(page.initial.y, 0);
    assert.equal(page.exit.y, 0);
  });

  it('splits hero headlines into non-empty word tokens accurately', () => {
    const tokens = splitHeadlineIntoTokens(
      'Build smarter. Work better. Move Ethiopia forward.'
    );
    assert.deepEqual(tokens, [
      'Build',
      'smarter.',
      'Work',
      'better.',
      'Move',
      'Ethiopia',
      'forward.',
    ]);
  });
});
