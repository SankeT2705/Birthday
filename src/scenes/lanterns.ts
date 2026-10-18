/**
 * lanterns.ts — Scene 7: Sky Lanterns (12 Multidimensional Wishes)
 * Floating golden lanterns ascending into the morning sky.
 * Tapping any lantern reveals an inspiring birthday wish in both English & natural Marathi.
 * Free, non-blocking scrolling: scrolling or swiping automatically dismisses the wish so the user can seamlessly reach the cake!
 */

import { LANTERN_WISHES, MARATHI_GREETING } from '../content';
import { birthdayAudio } from '../audio';
import { getLenis } from '../core/scroll';

export function renderLanterns(): string {
  // Render 12 lanterns with staggered positions, durations, and delays
  const lanternElements = LANTERN_WISHES.map((_, idx) => {
    const leftPercent = 5 + (idx * 7.6) + (Math.sin(idx * 1.5) * 2.5);
    const size = 38 + (idx % 3) * 6;
    const duration = 12 + (idx % 4) * 2.5;
    const delay = (idx * 0.8) % 6;

    return `
      <button class="lantern" data-wish-index="${idx}" 
              style="left: ${leftPercent.toFixed(1)}%; width: ${size}px; animation-duration: ${duration}s; animation-delay: -${delay.toFixed(1)}s;"
              aria-label="Lantern ${idx + 1}: Tap to reveal wish">
        <div class="lantern-body">
          <div class="lantern-glow"></div>
          <div class="lantern-flame"></div>
          <span class="lantern-number">${idx + 1}</span>
        </div>
      </button>
    `;
  }).join('');

  // 12 quick-select wish buttons for easy mobile tapping
  const wishOrbsHtml = Array.from({ length: 12 }).map((_, i) => `
    <button class="wish-orb-btn" data-wish-index="${i}" aria-label="Read Wish ${i + 1}">
      ${i + 1}
    </button>
  `).join('');

  return `
    <section id="scene-lanterns" class="scene lanterns-scene" aria-label="Sky Lanterns">
      <!-- Sky Lanterns Canvas -->
      <div class="lanterns-container" id="lanterns-container" aria-hidden="true">
        ${lanternElements}
      </div>

      <div class="lanterns-center-content text-center">
        <!-- Marathi Greeting -->
        <div class="marathi-greeting-card glass-card">
          <span class="card-badge gold-badge">A Heartfelt Blessing</span>
          <h2 class="marathi-greeting devanagari">${MARATHI_GREETING}</h2>
          <p class="lanterns-instruction">
            Twelve golden lanterns carry twelve wishes into the sky for you.<br />
            <strong>Tap any floating lantern</strong> or select below to read your wishes:
          </p>

          <div class="lanterns-quick-select" aria-label="12 Wishes Quick Select">
            ${wishOrbsHtml}
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderWishOverlay(): string {
  return `
    <!-- Global Wish Overlay Modal (Root Level for Safe Full-Screen Display) -->
    <div id="wish-overlay" class="wish-overlay" aria-hidden="true" style="display: none;">
      <div class="wish-backdrop" id="wish-backdrop"></div>
      <div class="wish-card glass-card text-center" role="dialog" aria-modal="true" aria-label="Birthday Wish">
        <button id="wish-close-x" class="wish-close-x" aria-label="Close wish">✕</button>

        <div class="wish-header">
          <span class="sparkle-icon">✨</span>
          <span id="wish-counter-text" class="text-caption uppercase monospace">Wish 01 of 12</span>
          <span class="sparkle-icon">✨</span>
        </div>

        <div class="wish-content-wrap">
          <p id="wish-text-en" class="wish-text-en serif">"May your hard work..."</p>
          <hr class="wish-divider" />
          <p id="wish-text-mr" class="wish-text-mr devanagari">"तुझ्या प्रामाणिक कष्टांना..."</p>
        </div>

        <button id="wish-close-btn" class="wish-close" aria-label="Release wish">
          Release Wish ✨
        </button>

        <p class="wish-scroll-hint text-caption muted">Scroll down or tap anywhere to continue to cake</p>
      </div>
    </div>
  `;
}

export function initLanterns(): void {
  const overlay = document.getElementById('wish-overlay');
  const enTextEl = document.getElementById('wish-text-en');
  const mrTextEl = document.getElementById('wish-text-mr');
  const counterEl = document.getElementById('wish-counter-text');
  const closeBtn = document.getElementById('wish-close-btn');
  const closeX = document.getElementById('wish-close-x');
  const backdrop = document.getElementById('wish-backdrop');

  if (!overlay || !enTextEl || !mrTextEl) return;
  const safeOverlay = overlay;
  const safeEnEl = enTextEl;
  const safeMrEl = mrTextEl;

  let isWishOpen = false;

  function showWish(index: number) {
    const item = LANTERN_WISHES[index % LANTERN_WISHES.length];
    safeEnEl.textContent = `"${item.en}"`;
    safeMrEl.textContent = `"${item.mr}"`;
    if (counterEl) counterEl.textContent = `Wish ${String(index + 1).padStart(2, '0')} of ${LANTERN_WISHES.length}`;

    isWishOpen = true;
    safeOverlay.style.display = 'flex';
    safeOverlay.setAttribute('aria-hidden', 'false');
    safeOverlay.style.opacity = '0';
    safeOverlay.style.transition = 'opacity 0.25s ease';
    requestAnimationFrame(() => {
      safeOverlay.style.opacity = '1';
    });

    birthdayAudio.playTone(720 + (index % 6) * 40, 1.2, 0, 0.18);
  }

  function hideWish() {
    if (!isWishOpen) return;
    isWishOpen = false;
    safeOverlay.style.opacity = '0';
    setTimeout(() => {
      if (!isWishOpen) {
        safeOverlay.style.display = 'none';
        safeOverlay.setAttribute('aria-hidden', 'true');
      }
    }, 250);
  }

  // Lantern & Orb click listeners
  document.querySelectorAll<HTMLButtonElement>('.lantern, .wish-orb-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.wishIndex || '0', 10);
      showWish(idx);
    });
  });

  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    hideWish();
  });

  closeX?.addEventListener('click', (e) => {
    e.stopPropagation();
    hideWish();
  });

  backdrop?.addEventListener('click', hideWish);
  safeOverlay.addEventListener('click', (e) => {
    if (e.target === safeOverlay) hideWish();
  });

  // Automatically dismiss wish when user scrolls, ensuring they never get stuck!
  const onUserScroll = () => {
    if (isWishOpen) hideWish();
  };

  window.addEventListener('wheel', onUserScroll, { passive: true });
  window.addEventListener('touchmove', onUserScroll, { passive: true });
  getLenis()?.on('scroll', onUserScroll);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isWishOpen) {
      hideWish();
    }
  });
}
