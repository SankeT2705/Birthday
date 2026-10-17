/**
 * cake.ts — Scene 7: The Sandcastle Birthday Cake
 * Interactive candle flame with real microphone breath blow detection
 * AND accessible tap/hold blowout fallback, accompanied by fanfare, smoke, confetti & wish reveal.
 */

import { CAKE_CONTENT } from '../content';
import { birthdayAudio } from '../audio';
import { startMicDetection, stopMic } from '../core/mic';
import { triggerConfetti } from '../effects';

export function renderCake(): string {
  return `
    <section id="scene-cake" class="scene cake-scene" aria-label="Birthday Cake">
      <div class="scene-header text-center">
        <span class="card-badge gold-badge">${CAKE_CONTENT.badge}</span>
        <h2 class="section-title serif">${CAKE_CONTENT.title}</h2>
        <p class="section-subtitle">${CAKE_CONTENT.prompt}</p>
      </div>

      <div class="sandcastle-wrap text-center" id="sandcastle-wrap">
        <svg class="sandcastle-svg" viewBox="0 0 320 280" fill="none">
          <defs>
            <!-- Flame Radial Glow -->
            <radialGradient id="candle-glow-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#fffbe8" />
              <stop offset="40%" stop-color="#f6cf7a" />
              <stop offset="85%" stop-color="#f2866b" />
              <stop offset="100%" stop-color="transparent" />
            </radialGradient>

            <linearGradient id="frosting-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fdfaf4" />
              <stop offset="60%" stop-color="#f4e9d8" />
              <stop offset="100%" stop-color="#e3cfa9" />
            </linearGradient>

            <linearGradient id="sand-tier-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#f7eedf" />
              <stop offset="50%" stop-color="#ecd9bd" />
              <stop offset="100%" stop-color="#d6bd96" />
            </linearGradient>
          </defs>

          <!-- Serving Shell / Base Plinth -->
          <ellipse cx="160" cy="245" rx="140" ry="24" fill="rgba(7,11,26,0.6)" />
          <ellipse cx="160" cy="240" rx="135" ry="20" fill="url(#sand-tier-grad)" stroke="#d49b5c" stroke-width="2" />

          <!-- Bottom Tier (Sandcastle Base) -->
          <path d="M50 236 C50 205, 270 205, 270 236 L265 190 C265 165, 55 165, 55 190 Z" fill="url(#sand-tier-grad)" stroke="#c29f6b" stroke-width="1.5" />
          <path d="M55 190 Q160 178 265 190" stroke="#f6cf7a" stroke-width="3" stroke-linecap="round" fill="none" />

          <!-- Middle Tier -->
          <path d="M80 190 C80 155, 240 155, 240 190 L232 145 C232 120, 88 120, 88 145 Z" fill="url(#sand-tier-grad)" stroke="#c29f6b" stroke-width="1.5" />
          <path d="M88 145 Q160 134 232 145" stroke="#f6cf7a" stroke-width="3" stroke-linecap="round" fill="none" />

          <!-- Top Tier -->
          <path d="M110 145 C110 120, 210 120, 210 145 L204 105 C204 88, 116 88, 116 105 Z" fill="url(#frosting-grad)" stroke="#c29f6b" stroke-width="1.5" />

          <!-- Sandcastle Battlements / Turrets -->
          <rect x="120" y="86" width="12" height="18" rx="2" fill="#d49b5c" />
          <rect x="142" y="86" width="12" height="18" rx="2" fill="#d49b5c" />
          <rect x="166" y="86" width="12" height="18" rx="2" fill="#d49b5c" />
          <rect x="188" y="86" width="12" height="18" rx="2" fill="#d49b5c" />

          <!-- Decorative Golden Pearls -->
          <circle cx="125" cy="116" r="3" fill="#f6cf7a" />
          <circle cx="145" cy="114" r="3" fill="#f6cf7a" />
          <circle cx="160" cy="113" r="3.5" fill="#f6cf7a" />
          <circle cx="175" cy="114" r="3" fill="#f6cf7a" />
          <circle cx="195" cy="116" r="3" fill="#f6cf7a" />

          <!-- Candle -->
          <rect id="candle-stick" x="156" y="55" width="8" height="34" rx="2" fill="#fdfaf4" stroke="#e74c3c" stroke-width="1" />
          <line x1="160" y1="55" x2="160" y2="47" stroke="#333" stroke-width="1.8" />

          <!-- Candle Flame Group -->
          <g id="candle-flame-group" class="flame-active" cursor="pointer">
            <!-- Glow Aura -->
            <ellipse id="flame-aura" cx="160" cy="38" rx="30" ry="30" fill="url(#candle-glow-grad)" opacity="0.8" />
            <!-- Inner Flame -->
            <path id="flame-body" d="M160 22 C164 30, 166 38, 163 43 C160 48, 155 46, 157 43 C154 38, 156 30, 160 22 Z" 
                  fill="#f6cf7a" />
            <path d="M160 30 C162 35, 163 40, 161 43 C159 45, 158 44, 159 43 C157 40, 158 35, 160 30 Z" 
                  fill="#ffffff" />
          </g>

          <!-- Rising Smoke Trail (Initially Hidden) -->
          <g id="smoke-trail" style="display: none; opacity: 0;">
            <path d="M160 45 Q154 30 162 18 T158 2" fill="none" stroke="rgba(244,233,216,0.7)" stroke-width="2" stroke-linecap="round" />
          </g>
        </svg>
      </div>

      <!-- Action Controls -->
      <div class="cake-controls" id="cake-controls">
        <button id="cake-mic-btn" class="mic-btn" aria-label="Blow candle using microphone">
          <span>${CAKE_CONTENT.micButton}</span>
          <small>${CAKE_CONTENT.micHint}</small>
        </button>
        <button id="cake-tap-btn" class="hold-btn" aria-label="Tap to blow out candle">
          <span>${CAKE_CONTENT.holdButton}</span>
        </button>
      </div>

      <!-- Wish Revealed Banner -->
      <div id="candle-message-box" class="candle-message-box glass-card text-center" style="display: none;">
        <div class="message-crown">✨ 🎂 ✨</div>
        <h3 class="message-title serif">Wish Sealed With The Sea</h3>
        <p class="candle-message serif">${CAKE_CONTENT.extinguishedMessage}</p>
        <button id="relight-btn" class="relight-btn" aria-label="Relight candle">
          ${CAKE_CONTENT.relightPrompt}
        </button>
      </div>
    </section>
  `;
}

export function initCake(): void {
  const flameGroup = document.getElementById('candle-flame-group');
  const smokeTrail = document.getElementById('smoke-trail');
  const messageBox = document.getElementById('candle-message-box');
  const controls = document.getElementById('cake-controls');
  const micBtn = document.getElementById('cake-mic-btn');
  const tapBtn = document.getElementById('cake-tap-btn');
  const relightBtn = document.getElementById('relight-btn');

  let isExtinguished = false;

  function extinguishCandle() {
    if (isExtinguished) return;
    isExtinguished = true;

    // Stop mic if running
    stopMic();

    // Hide flame
    if (flameGroup) {
      flameGroup.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      flameGroup.style.opacity = '0';
      flameGroup.style.transform = 'scale(0.3) translateY(-10px)';
    }

    // Show smoke curl
    if (smokeTrail) {
      smokeTrail.style.display = 'block';
      smokeTrail.style.transition = 'opacity 1.5s ease, transform 2s ease';
      smokeTrail.style.opacity = '0.9';
      smokeTrail.style.transform = 'translateY(-15px)';
      setTimeout(() => {
        smokeTrail.style.opacity = '0';
      }, 1800);
    }

    // Audio chime fanfare
    birthdayAudio.playCelebrationChime();

    // Trigger golden and coral confetti explosion
    const cakeRect = document.getElementById('sandcastle-wrap')?.getBoundingClientRect();
    const originX = cakeRect ? cakeRect.left + cakeRect.width / 2 : window.innerWidth / 2;
    const originY = cakeRect ? cakeRect.top + 80 : window.innerHeight / 2;
    triggerConfetti(originX, originY, 90, ['#f6cf7a', '#f2866b', '#ffffff', '#2f7f86', '#f7c8c1']);

    // Hide blowout controls & reveal message
    if (controls) controls.style.display = 'none';
    if (messageBox) {
      messageBox.style.display = 'block';
      messageBox.style.opacity = '0';
      messageBox.style.transform = 'translateY(16px)';
      messageBox.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      requestAnimationFrame(() => {
        messageBox.style.opacity = '1';
        messageBox.style.transform = 'translateY(0)';
      });
    }
  }

  function relightCandle() {
    isExtinguished = false;
    if (flameGroup) {
      flameGroup.style.opacity = '1';
      flameGroup.style.transform = 'scale(1) translateY(0)';
    }
    if (controls) controls.style.display = 'flex';
    if (messageBox) messageBox.style.display = 'none';
    birthdayAudio.playTone(660, 0.4, 0, 0.15);
  }

  // Tap button & direct flame tap
  tapBtn?.addEventListener('click', extinguishCandle);
  flameGroup?.addEventListener('click', extinguishCandle);

  // Microphone detection
  micBtn?.addEventListener('click', async () => {
    micBtn.classList.add('listening');
    micBtn.querySelector('span')!.textContent = '🎙️ Listening... Blow now!';

    await startMicDetection({
      onBlow: () => {
        extinguishCandle();
      },
      onDenied: () => {
        micBtn.classList.remove('listening');
        micBtn.querySelector('span')!.textContent = 'Mic unavailable — use button below';
      },
    });
  });

  relightBtn?.addEventListener('click', relightCandle);
}
