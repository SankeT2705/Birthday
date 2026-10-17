/**
 * cake.ts — Interactive Birthday Cake centerpiece with blowable candle, confetti & chimes.
 */

import { triggerConfetti } from '../effects';
import { birthdayAudio } from '../audio';

let candleBlown = false;

export function renderCake(): string {
  return `
  <section class="cake-card-wrapper" id="cake-section">
    <div class="glass-card cake-card">
      <div class="card-badge gold-badge">✨ Make A Wish ✨</div>
      <h2 class="serif section-title">Light The Candle, Surabhi</h2>
      <p class="section-subtitle">Take a deep breath, make your biggest wish, and tap the flame to blow it out!</p>

      <!-- Interactive 3-Tier Birthday Cake SVG -->
      <div class="cake-container" id="cake-interactive-wrap">
        <svg class="birthday-cake-svg" viewBox="0 0 320 280" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="cakePlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#cfd9df"/>
              <stop offset="50%" stop-color="#ffffff"/>
              <stop offset="100%" stop-color="#e2ebf0"/>
            </linearGradient>
            <linearGradient id="tierBottom" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#e17055"/>
              <stop offset="50%" stop-color="#fab1a0"/>
              <stop offset="100%" stop-color="#d63031"/>
            </linearGradient>
            <linearGradient id="tierMid" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#f6cf7a"/>
              <stop offset="50%" stop-color="#fffbe8"/>
              <stop offset="100%" stop-color="#e5b853"/>
            </linearGradient>
            <linearGradient id="tierTop" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#fd79a8"/>
              <stop offset="50%" stop-color="#ffeaa7"/>
              <stop offset="100%" stop-color="#e84393"/>
            </linearGradient>
            <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur"/>
              <feComposite in="SourceGraphic" in2="blur" operator="over"/>
            </filter>
          </defs>

          <!-- Golden Cake Stand / Plate -->
          <ellipse cx="160" cy="255" rx="140" ry="18" fill="url(#cakePlateGrad)" stroke="rgba(246,207,122,0.6)" stroke-width="2"/>
          <ellipse cx="160" cy="252" rx="130" ry="14" fill="#ffffff" opacity="0.6"/>

          <!-- Bottom Tier -->
          <path d="M 45,210 Q 160,230 275,210 L 275,240 Q 160,260 45,240 Z" fill="url(#tierBottom)"/>
          <ellipse cx="160" cy="210" rx="115" ry="18" fill="#ffeaa7"/>
          <!-- Frosting drips on bottom tier -->
          <path d="M 45,210 Q 70,225 95,212 Q 120,230 145,215 Q 175,232 205,214 Q 240,228 275,210" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>

          <!-- Middle Tier -->
          <path d="M 75,160 Q 160,180 245,160 L 245,195 Q 160,215 75,195 Z" fill="url(#tierMid)"/>
          <ellipse cx="160" cy="160" rx="85" ry="15" fill="#fdfaf4"/>
          <!-- Decorative pearls on middle tier -->
          ${[90, 115, 140, 160, 185, 210, 230].map(cx => `<circle cx="${cx}" cy="${170 + Math.sin(cx/20)*4}" r="4" fill="#ffffff" stroke="#f6cf7a" stroke-width="1"/>`).join('')}

          <!-- Top Tier -->
          <path d="M 105,115 Q 160,132 215,115 L 215,148 Q 160,165 105,148 Z" fill="url(#tierTop)"/>
          <ellipse cx="160" cy="115" rx="55" ry="12" fill="#fffdfa"/>
          <!-- Strawberries / Gold pearls on top -->
          <circle cx="120" cy="112" r="5" fill="#d63031"/>
          <circle cx="140" cy="116" r="4.5" fill="#f6cf7a"/>
          <circle cx="180" cy="116" r="4.5" fill="#f6cf7a"/>
          <circle cx="200" cy="112" r="5" fill="#d63031"/>

          <!-- Birthday Candle -->
          <rect x="156" y="58" width="8" height="50" rx="3" fill="#ffffff" stroke="#f6cf7a" stroke-width="1.5"/>
          <!-- Spiral ribbon on candle -->
          <path d="M 156,68 L 164,74 M 156,82 L 164,88 M 156,96 L 164,102" stroke="#ff7675" stroke-width="2.5" stroke-linecap="round"/>
          <!-- Candle Wick -->
          <line x1="160" y1="58" x2="160" y2="48" stroke="#333333" stroke-width="2"/>

          <!-- Candle Flame (Interactive) -->
          <g id="cake-candle-flame" class="candle-flame-group" filter="url(#flameGlow)">
            <ellipse cx="160" cy="38" rx="7" ry="13" fill="#f6cf7a"/>
            <ellipse cx="160" cy="40" rx="3.5" ry="8" fill="#ff7675"/>
            <ellipse cx="160" cy="42" rx="1.5" ry="4" fill="#ffffff"/>
          </g>

          <!-- Smoke Curl (Initially hidden) -->
          <g id="cake-smoke-curl" class="smoke-curl" opacity="0">
            <path d="M 160,46 Q 155,30 162,20 T 158,5" fill="none" stroke="rgba(240,240,240,0.7)" stroke-width="2.5" stroke-linecap="round"/>
          </g>
        </svg>

        <!-- Tap target on flame -->
        <button id="flame-touch-target" class="flame-btn" aria-label="Tap to blow out candle"></button>
      </div>

      <!-- Action & Success Message -->
      <div class="cake-controls">
        <button id="blow-candle-btn" class="action-btn glow-btn">
          <span class="btn-icon">🌬️</span> Tap to Blow Candle
        </button>
        <button id="relight-candle-btn" class="action-btn secondary-btn" style="display:none;">
          <span class="btn-icon">🕯️</span> Relight Candle
        </button>
      </div>

      <!-- Celebratory Wish Banner (Appears after blowing) -->
      <div id="wish-banner" class="wish-reveal-banner" style="display:none;">
        <div class="banner-sparkle">✨ 🎉 🎂 🎉 ✨</div>
        <h3 class="banner-title serif">Wish Granted, Surabhi!</h3>
        <p class="banner-body">"May this year give you wings to soar to your highest dreams, health to enjoy every victory, and endless reasons to smile that radiant smile!"</p>
      </div>
    </div>
  </section>
  `;
}

export function initCakeInteractions() {
  const flameTarget = document.getElementById('flame-touch-target');
  const blowBtn = document.getElementById('blow-candle-btn');
  const relightBtn = document.getElementById('relight-candle-btn');

  function blow() {
    if (candleBlown) return;
    candleBlown = true;

    const flame = document.getElementById('cake-candle-flame');
    const smoke = document.getElementById('cake-smoke-curl');
    const banner = document.getElementById('wish-banner');

    if (flame) {
      flame.classList.add('flame-blown');
    }
    if (smoke) {
      smoke.classList.add('smoke-animate');
    }

    // Play celebration audio & burst confetti!
    birthdayAudio.playCelebrationChime();
    
    // Get flame position on screen
    const flameRect = flame?.getBoundingClientRect();
    const fx = flameRect ? flameRect.left + flameRect.width / 2 : window.innerWidth / 2;
    const fy = flameRect ? flameRect.top + flameRect.height / 2 : window.innerHeight / 2;

    triggerConfetti(fx, fy, 100);

    // Show wish banner
    setTimeout(() => {
      if (banner) {
        banner.style.display = 'block';
        banner.classList.add('banner-pop-in');
      }
      if (blowBtn) blowBtn.style.display = 'none';
      if (relightBtn) relightBtn.style.display = 'inline-flex';
    }, 600);
  }

  function relight() {
    candleBlown = false;
    const flame = document.getElementById('cake-candle-flame');
    const smoke = document.getElementById('cake-smoke-curl');
    const banner = document.getElementById('wish-banner');

    if (flame) flame.classList.remove('flame-blown');
    if (smoke) smoke.classList.remove('smoke-animate');
    if (banner) banner.style.display = 'none';

    if (blowBtn) blowBtn.style.display = 'inline-flex';
    if (relightBtn) relightBtn.style.display = 'none';

    birthdayAudio.playTone(660, 0.4, 0, 0.2);
  }

  flameTarget?.addEventListener('click', blow);
  blowBtn?.addEventListener('click', blow);
  relightBtn?.addEventListener('click', relight);
}
