/**
 * gate.ts — Scene 0: The Gate
 * Peaceful night invitation screen with ambient glow.
 * Focused purely on Surabhi and her birthday experience.
 */

import { GATE_CONTENT } from '../content';
import { birthdayAudio } from '../audio';
import { initTilt } from '../core/tilt';

export function renderGate(): string {
  return `
    <section id="scene-gate" class="gate-scene" role="dialog" aria-label="Welcome Gate">
      <div class="gate-glow" aria-hidden="true"></div>
      <div class="gate-content text-center">
        <span class="gate-badge">${GATE_CONTENT.badge}</span>
        <h1 class="gate-main serif">${GATE_CONTENT.title}</h1>
        <p class="gate-sub">${GATE_CONTENT.subtitle}</p>
        <button id="gate-btn" class="gate-btn" aria-label="${GATE_CONTENT.prompt}">
          <span class="gate-btn-icon">🌊</span>
          <span class="gate-btn-text">${GATE_CONTENT.prompt}</span>
        </button>
        <span class="gate-hint text-caption">${GATE_CONTENT.hint}</span>
      </div>
    </section>
  `;
}

export function initGate(onUnlock: () => void): void {
  const gate = document.getElementById('scene-gate');
  const btn = document.getElementById('gate-btn');
  if (!gate) return;

  let unlocked = false;

  const unlock = async () => {
    if (unlocked) return;
    unlocked = true;

    // 1. Unlock Web Audio synthesizer & begin sea ambience
    await birthdayAudio.unlock();

    // 2. Unlock tilt (iOS accelerometer / pointer)
    initTilt();

    // 3. Play gentle chime
    birthdayAudio.playTone(523.25, 2.0, 0, 0.2);

    // 4. Smoothly fade out the gate overlay
    gate.style.transition = 'opacity 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), transform 1.2s ease';
    gate.style.opacity = '0';
    gate.style.transform = 'scale(1.05)';
    gate.style.pointerEvents = 'none';

    setTimeout(() => {
      gate.remove();
      onUnlock();
    }, 1200);
  };

  btn?.addEventListener('click', unlock);
  gate.addEventListener('click', (e) => {
    if (e.target === gate) unlock();
  });
}
