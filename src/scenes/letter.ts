/**
 * letter.ts — Scene 8: Sincere Letter from Your Best Friend
 * An intimate, authentic letter on warm ivory parchment,
 * communicating heartfelt pride, deep respect for her UPSC effort,
 * permission to rest, and unconditional friendship.
 * Enhanced with 3D paper tilt perspective for tactile immersion.
 */

import { LETTER_CONTENT } from '../content';
import { scrollToScene } from '../core/scroll';
import { onTilt } from '../core/tilt';

export function renderLetter(): string {
  return `
    <section id="scene-letter" class="scene letter-scene" aria-label="A Letter for You">
      <div class="letter-paper" id="letter-paper">
        <!-- Personal Warm Stationery Header -->
        <header class="letter-stationery-header">
          <div class="monogram-seal" aria-hidden="true">
            <span>${LETTER_CONTENT.monogram}</span>
          </div>
          <div class="stationery-meta text-center">
            <span class="stationery-badge text-caption uppercase monospace">${LETTER_CONTENT.stationeryBadge}</span>
            <span class="letter-date text-caption">${LETTER_CONTENT.date}</span>
          </div>
        </header>

        <hr class="letter-rule" />

        <div class="letter-recipient-row">
          <span class="letter-label text-caption">Written with care for</span>
          <span class="letter-name serif">Surabhi</span>
        </div>

        <article class="letter-body">
          <h4 class="letter-salutation serif">${LETTER_CONTENT.salutation}</h4>

          <p class="letter-para">${LETTER_CONTENT.p1}</p>
          <p class="letter-para">${LETTER_CONTENT.p2}</p>
          <p class="letter-para">${LETTER_CONTENT.p3}</p>
          <p class="letter-para">${LETTER_CONTENT.p4}</p>

          <!-- Heartfelt Marathi Reflection Block -->
          <div class="letter-marathi-box glass-card">
            <p class="letter-marathi-para devanagari">
              "${LETTER_CONTENT.marathiParagraph}"
            </p>
          </div>

          <p class="letter-closing-wish devanagari serif">
            "${LETTER_CONTENT.closingWish}"
          </p>
        </article>

        <footer class="letter-footer">
          <p class="letter-signoff handwritten">${LETTER_CONTENT.signoff}</p>
          <p class="letter-signature handwritten"><strong>${LETTER_CONTENT.signature}</strong></p>
          <p class="letter-birthday serif devanagari">वाढदिवसाच्या खूप खूप शुभेच्छा सुरभी! 🌊✨</p>
        </footer>
      </div>

      <div class="replay-wrap text-center">
        <button id="replay-btn" class="replay-btn" aria-label="Walk the shore again">
          ${LETTER_CONTENT.replayText}
        </button>
      </div>
    </section>
  `;
}

export function initLetter(): void {
  const paper = document.getElementById('letter-paper');
  const replayBtn = document.getElementById('replay-btn');

  // Subtle 3D tilt on parchment
  if (paper) {
    onTilt(({ x, y }) => {
      const rotY = x * 5.5;
      const rotX = -y * 5.5;
      paper.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });
  }

  replayBtn?.addEventListener('click', () => {
    scrollToScene('#scene-night-shore');
  });
}
