/**
 * main.ts — Master Entry Point for "Her Shore: For Surabhi, With Love"
 * Orchestrates Lenis smooth scroll, Web Audio synthesizer, Three.js sea shader,
 * tilt interactions, backdrop time-of-day progression, and the complete 8-stage narrative.
 */

import './styles/base.css';

import { initScroll, getLenis } from './core/scroll';
import { birthdayAudio } from './audio';
import { initSeaRenderer } from './gl/renderer';

// Scenes in chronological narrative order
import { renderGate, initGate } from './scenes/gate';
import { renderNightShore, initNightShore } from './scenes/nightShore';
import { renderBottles, initBottles } from './scenes/bottles';
import { renderBlueprint, initBlueprint } from './scenes/blueprint';
import { renderWheel, initWheel } from './scenes/wheel';
import { renderFaith, initFaith } from './scenes/faith';
import { renderSunrise, initSunrise } from './scenes/sunrise';
import { renderLanterns, initLanterns } from './scenes/lanterns';
import { renderCake, initCake } from './scenes/cake';
import { renderLetter, initLetter } from './scenes/letter';

const app = document.getElementById('app')!;

app.innerHTML = `
  <!-- Top Scroll Progress Indicator -->
  <div id="scroll-progress" aria-hidden="true"></div>

  <!-- Persistent Sound Toggle (Glassmorphism Pill) -->
  <button id="sound-toggle" class="glass" aria-label="Toggle ambient music" title="Toggle Sound">
    <span id="sound-icon">🎵</span>
  </button>

  <!-- Living Shoreline Backdrop (Three.js WebGL Sea + Night to Sunrise transition) -->
  <div id="shore-backdrop" aria-hidden="true">
    <div id="shore-bg-night" class="shore-bg-layer"></div>
    <div id="shore-bg-sunrise" class="shore-bg-layer"></div>
    <div class="shore-bg-vignette"></div>
    <div class="shore-ambient-shimmer"></div>
  </div>

  <!-- Confetti Layer -->
  <div id="confetti-container" class="confetti-canvas" aria-hidden="true"></div>

  <!-- Scene 0: Welcome Gate Overlay -->
  ${renderGate()}

  <!-- Main Continuous Scroll Container -->
  <main id="story-container">
    <!-- 1. Peace — She deserves a moment for herself -->
    ${renderNightShore()}

    <!-- 2. Memories — Celebrating the person she already is -->
    ${renderBottles()}

    <!-- 3. Civil Engineering — Built on Strong Foundations -->
    ${renderBlueprint()}

    <!-- 4. UPSC & Public Service — A Dream That Serves -->
    ${renderWheel()}

    <!-- 5. Faith & Inner Strength — कर्मण्येवाधिकारस्ते (Bhagavad Gita 2.47) -->
    ${renderFaith()}

    <!-- 6. Sunrise — The Dawn of Dreams -->
    ${renderSunrise()}

    <!-- 7. Birthday Celebration — Sky Lanterns & Sandcastle Cake -->
    ${renderLanterns()}
    ${renderCake()}

    <!-- 8. Final Letter — A Sincere Message from Your Best Friend -->
    ${renderLetter()}
  </main>
`;

// ── Initialize Scroll & Core Systems ──
initScroll();

const lenis = getLenis();
const backdropEl = document.getElementById('shore-backdrop');
const bgSunrise = document.getElementById('shore-bg-sunrise');
const bgNight = document.getElementById('shore-bg-night');
const soundToggle = document.getElementById('sound-toggle');
const soundIcon = document.getElementById('sound-icon');

// Initialize WebGL Living Sea, Starfield, and Moon
const seaRenderer = backdropEl ? initSeaRenderer(backdropEl) : null;

// Forward touch/pointer ripples to WebGL ocean
window.addEventListener('pointerdown', (e) => {
  seaRenderer?.addRipple(e.clientX, e.clientY);
});

// Synchronize backdrop time-of-day and WebGL shader with scroll progression
if (lenis && bgSunrise && bgNight) {
  lenis.on('scroll', ({ progress }: { progress: number }) => {
    // WebGL ocean & celestial progression
    seaRenderer?.setProgress(progress);

    // CSS backdrop layer crossfade (0.0 - 0.45 Night, 0.45 - 0.72 Sunrise, 0.72+ Full Morning)
    if (progress <= 0.45) {
      bgSunrise.style.opacity = '0';
    } else if (progress >= 0.75) {
      bgSunrise.style.opacity = '1';
    } else {
      const sunriseProgress = (progress - 0.45) / 0.3;
      bgSunrise.style.opacity = `${sunriseProgress.toFixed(3)}`;
    }
  });
}

// Sound toggle button
soundToggle?.addEventListener('click', () => {
  const active = birthdayAudio.toggle();
  if (soundIcon) {
    soundIcon.textContent = active ? '🔊' : '🎵';
  }
});

// Initialize Scene Logic
initGate(() => {
  console.log('[Her Shore] Journey begun');
});

initNightShore();
initBottles();
initBlueprint();
initWheel();
initFaith();
initSunrise();
initLanterns();
initCake();
initLetter();
