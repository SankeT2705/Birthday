/**
 * faith.ts — Scene 5: Sacred Wisdom & Inner Strength
 * Authentic Bhagavad Gita 2.47 verse with clear Marathi explanation
 * and peaceful spiritual reflections offering calm, courage, and perspective for UPSC preparation.
 */

import { FAITH_CONTENT } from '../content';
import { onTilt } from '../core/tilt';

export function renderFaith(): string {
  return `
    <section id="scene-faith" class="scene faith-scene" aria-label="Sacred Wisdom & Inner Strength">
      <div class="faith-ambient-halo" aria-hidden="true"></div>

      <!-- Header -->
      <div class="scene-header text-center">
        <span class="card-badge gold-badge">${FAITH_CONTENT.badge}</span>
        <h2 class="section-title devanagari">${FAITH_CONTENT.title}</h2>
        <p class="section-subtitle">${FAITH_CONTENT.subtitle}</p>
      </div>

      <!-- Sacred Verse Meditation Card -->
      <div class="sacred-card glass-card text-center" id="sacred-card">
        <div class="sacred-symbol" aria-hidden="true">ॐ</div>

        <!-- Authentic Sanskrit Verse -->
        <blockquote class="sanskrit-verse devanagari">
          ${FAITH_CONTENT.sanskritVerse.split('\n').join('<br />')}
        </blockquote>

        <span class="scripture-citation text-caption monospace">
          — ${FAITH_CONTENT.scriptureRef} —
        </span>

        <hr class="sacred-divider" />

        <!-- Clear Marathi Meaning -->
        <div class="verse-meaning-box">
          <p class="verse-meaning-marathi devanagari">
            "${FAITH_CONTENT.marathiMeaning}"
          </p>
          <p class="verse-context-upsc">
            ${FAITH_CONTENT.upscReflection}
          </p>
        </div>
      </div>

      <!-- Three Peaceful Spiritual Reflections -->
      <div class="reflections-grid">
        ${FAITH_CONTENT.reflections.map((r, i) => `
          <div class="reflection-pill glass-card">
            <span class="reflection-num">0${i + 1}</span>
            <div class="reflection-body">
              <p class="reflection-marathi devanagari">"${r.marathi}"</p>
              <p class="reflection-english serif italic">${r.english}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

export function initFaith(): void {
  const card = document.getElementById('sacred-card');
  if (card) {
    onTilt(({ x, y }) => {
      const rotY = x * 5;
      const rotX = -y * 5;
      card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });
  }
}
