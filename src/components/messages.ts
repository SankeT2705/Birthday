/**
 * messages.ts — Beautiful birthday messages, Marathi blessings & interactive letter envelope.
 */

import { BIRTHDAY_WISHES, BIRTHDAY_LETTER, MARATHI_GREETING, HER_NAME } from '../content';
import { triggerConfetti } from '../effects';
import { birthdayAudio } from '../audio';

export function renderMessages(): string {
  const wishesCardsHtml = (BIRTHDAY_WISHES as any[]).map((item: any, idx: number) => {
    const text = typeof item === 'string' ? item : (item.en || '');
    return `
    <div class="wish-item glass-card">
      <div class="wish-number">0${idx + 1}</div>
      <p class="wish-body serif">${text}</p>
      <div class="wish-deco">✨ 🌊 ✨</div>
    </div>
  `;
  }).join('');

  return `
  <section class="messages-section" id="messages-section">
    <!-- Marathi Blessing Highlight -->
    <div class="marathi-blessing-card glass-card text-center">
      <div class="om-symbol">🌸</div>
      <h2 class="devanagari marathi-title">${MARATHI_GREETING}</h2>
      <p class="devanagari marathi-sub">
        "तुझ्या आयुष्यातील प्रत्येक दिवस नवा आनंद, समृद्धी आणि यश घेऊन येवो. तुझे हे मनमोहक हास्य असेच सदैव फुलत राहो!"
      </p>
    </div>

    <!-- 5 Heartfelt Wishes -->
    <div class="wishes-grid-wrap">
      <div class="section-header text-center">
        <div class="card-badge gold-badge">🌟 Pure Blessings 🌟</div>
        <h2 class="serif section-title">Wishes For Your Journey</h2>
      </div>
      <div class="wishes-grid">
        ${wishesCardsHtml}
      </div>
    </div>

    <!-- Interactive Letter from the Heart -->
    <div class="letter-card-wrap">
      <div class="section-header text-center">
        <div class="card-badge gold-badge">💌 A Letter For You 💌</div>
        <h2 class="serif section-title">Words From The Heart</h2>
      </div>

      <div class="envelope-container" id="birthday-envelope">
        <div class="envelope-closed" id="envelope-cover">
          <div class="stamp">🌊</div>
          <div class="wax-seal" id="open-envelope-btn" role="button" aria-label="Open letter">
            <span>SURABHI</span>
            <small>Tap to Open</small>
          </div>
          <p class="envelope-to">For ${HER_NAME} 🌹</p>
        </div>

        <div class="letter-paper" id="letter-content" style="display:none;">
          <div class="letter-header">
            <span class="letter-date">A Special Day • Celebrated Forever</span>
            <div class="letter-crest">⚜️</div>
          </div>
          
          <h3 class="letter-salutation serif">${BIRTHDAY_LETTER.salutation}</h3>
          
          <p class="letter-para">${BIRTHDAY_LETTER.p1}</p>
          <p class="letter-para">${BIRTHDAY_LETTER.p2}</p>
          <p class="letter-para">${BIRTHDAY_LETTER.p3}</p>
          
          <div class="letter-highlight-quote handwritten">
            "${HER_NAME}, the world is about to meet the brilliant, unstoppable person you have always been."
          </div>

          <p class="letter-closing serif">${BIRTHDAY_LETTER.closingWish}</p>
          <p class="letter-signature handwritten">${BIRTHDAY_LETTER.signoff} ${BIRTHDAY_LETTER.signature}</p>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function initMessagesInteractions() {
  const envelopeBtn = document.getElementById('open-envelope-btn');
  const envelopeCover = document.getElementById('envelope-cover');
  const letterContent = document.getElementById('letter-content');

  envelopeBtn?.addEventListener('click', () => {
    if (envelopeCover && letterContent) {
      envelopeCover.classList.add('envelope-opened');
      setTimeout(() => {
        envelopeCover.style.display = 'none';
        letterContent.style.display = 'block';
        letterContent.classList.add('letter-unfold');
        
        triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 50);
        birthdayAudio.playTone(659, 1.0, 0, 0.2);
        birthdayAudio.playTone(880, 1.2, 0.15, 0.2);
      }, 500);
    }
  });
}
