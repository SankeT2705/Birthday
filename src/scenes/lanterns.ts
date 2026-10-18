/**
 * lanterns.ts — Scene 7: Sky Lanterns (12 Multidimensional Wishes)
 * Floating golden lanterns ascending into the morning sky.
 * Tapping any lantern reveals an inspiring birthday wish in both English & natural Marathi.
 */

import { LANTERN_WISHES, MARATHI_GREETING } from '../content';
import { birthdayAudio } from '../audio';
import { getLenis } from '../core/scroll';

export function renderLanterns(): string {
  // Render 12 lanterns with staggered positions and delays
  const lanternElements = LANTERN_WISHES.map((_, idx) => {
    const leftPercent = 6 + (idx * 7.5) + (Math.sin(idx * 1.5) * 3);
    const size = 36 + (idx % 3) * 7;
    const duration = 11 + (idx % 4) * 3;
    const delay = (idx * 0.7) % 6;

    return `
      <button class="lantern" data-wish-index="${idx}" 
              style="left: ${leftPercent.toFixed(1)}%; width: ${size}px; animation-duration: ${duration}s; animation-delay: ${delay.toFixed(1)}s;"
              aria-label="Lantern ${idx + 1}: Tap to reveal wish">
        <div class="lantern-body">
          <div class="lantern-glow"></div>
          <div class="lantern-flame"></div>
          <span class="lantern-number">${idx + 1}</span>
        </div>
      </button>
    `;
  }).join('');

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
            <strong>Tap any floating lantern</strong> to read what it holds.
          </p>
        </div>
      </div>

      <!-- Wish Overlay Modal -->
      <div id="wish-overlay" class="wish-overlay" aria-hidden="true" style="display: none;">
        <div class="wish-card glass-card text-center" role="dialog" aria-modal="true" aria-label="Birthday Wish">
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

          <button id="wish-close-btn" class="wish-close" aria-label="Close wish">
            Release Wish ✨
          </button>
        </div>
      </div>
    </section>
  `;
}

export function initLanterns(): void {
  const overlay = document.getElementById('wish-overlay');
  const enTextEl = document.getElementById('wish-text-en');
  const mrTextEl = document.getElementById('wish-text-mr');
  const counterEl = document.getElementById('wish-counter-text');
  const closeBtn = document.getElementById('wish-close-btn');

  if (!overlay || !enTextEl || !mrTextEl) return;
  const safeOverlay = overlay;
  const safeEnEl = enTextEl;
  const safeMrEl = mrTextEl;

  function showWish(index: number) {
    const item = LANTERN_WISHES[index % LANTERN_WISHES.length];
    safeEnEl.textContent = `"${item.en}"`;
    safeMrEl.textContent = `"${item.mr}"`;
    if (counterEl) counterEl.textContent = `Wish ${String(index + 1).padStart(2, '0')} of ${LANTERN_WISHES.length}`;

    getLenis()?.stop();
    document.body.classList.add('modal-open');

    safeOverlay.style.display = 'flex';
    safeOverlay.setAttribute('aria-hidden', 'false');
    safeOverlay.style.opacity = '0';
    safeOverlay.style.transition = 'opacity 0.3s ease';
    requestAnimationFrame(() => {
      safeOverlay.style.opacity = '1';
    });

    birthdayAudio.playTone(720 + (index % 6) * 40, 1.2, 0, 0.18);
  }

  function hideWish() {
    getLenis()?.start();
    document.body.classList.remove('modal-open');
    safeOverlay.style.opacity = '0';
    setTimeout(() => {
      safeOverlay.style.display = 'none';
      safeOverlay.setAttribute('aria-hidden', 'true');
    }, 300);
  }

  // Lantern click listeners
  document.querySelectorAll<HTMLButtonElement>('.lantern').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.wishIndex || '0', 10);
      showWish(idx);
    });
  });

  closeBtn?.addEventListener('click', hideWish);
  safeOverlay.addEventListener('click', (e) => {
    if (e.target === safeOverlay) hideWish();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && safeOverlay.style.display === 'flex') {
      hideWish();
    }
  });
}
