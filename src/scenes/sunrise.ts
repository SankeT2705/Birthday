/**
 * sunrise.ts — Scene 6: Sunrise (The Dawn of Dreams)
 * Golden sun rising over the sea, god rays and golden reflection path,
 * revealing the heartwarming Marathi and English dawn blessings.
 * Triggers ambient morning birdsong synthesis.
 */

import { SUNRISE_CONTENT } from '../content';
import { birthdayAudio } from '../audio';

export function renderSunrise(): string {
  return `
    <section id="scene-sunrise" class="scene sunrise-scene" aria-label="The Dawn of Dreams">
      <div class="sunrise-glow-backdrop" aria-hidden="true"></div>

      <div class="sunrise-sun-wrap" aria-hidden="true">
        <div class="god-rays"></div>
        <div class="sunrise-sun"></div>
        <div class="water-reflection-path"></div>
      </div>

      <div class="sunrise-content text-center">
        <div class="sunrise-tagline text-caption uppercase tracking">
          <span>${SUNRISE_CONTENT.badge}</span>
        </div>

        <!-- Primary Dawn Blessing in Marathi -->
        <h2 class="sunrise-marathi-main devanagari">
          "${SUNRISE_CONTENT.primaryMarathi}"
        </h2>

        <!-- Hope & Strength Blessing in Marathi -->
        <p class="sunrise-marathi-secondary devanagari">
          ${SUNRISE_CONTENT.secondaryMarathi}
        </p>

        <!-- Key English Affirmation -->
        <div class="sunrise-english-wrap glass-card">
          <h3 class="sunrise-key-line serif">
            "${SUNRISE_CONTENT.keyLine}"
          </h3>
          <p class="sunrise-subline serif italic">
            ${SUNRISE_CONTENT.subLine}
          </p>
        </div>

        <!-- Comfort for Disappointing Days -->
        <p class="sunrise-comfort-marathi devanagari">
          "${SUNRISE_CONTENT.comfortMarathi}"
        </p>

        <div class="sunrise-scroll-cue">
          <span class="pulse-icon">✨</span>
          <span>Scroll to release your birthday lanterns</span>
        </div>
      </div>
    </section>
  `;
}

export function initSunrise(): void {
  const section = document.getElementById('scene-sunrise');
  const bgSunrise = document.getElementById('shore-bg-sunrise');
  if (!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (bgSunrise) {
          bgSunrise.style.transition = 'opacity 2.5s ease-in-out';
          bgSunrise.style.opacity = '1';
        }
        // Fade in morning birdsong as dawn arrives
        birthdayAudio.enableSunriseAmbience();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(section);
}
