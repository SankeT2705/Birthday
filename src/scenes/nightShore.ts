/**
 * nightShore.ts — Scene 1: Peace (Opening Night Shore)
 * "For Surabhi, With Love"
 * Elegant opening focusing on Surabhi, her dreams, and the birthday experience.
 * Removes all geographical location labels, presents intimate Marathi thoughts,
 * and maintains the sand calligraphy and interactive water ripples.
 */

import { HER_NAME, SHORE_CONTENT } from '../content';

export function renderNightShore(): string {
  const letters = HER_NAME.split('')
    .map((l, i) => `<span class="sand-letter" style="animation-delay: ${0.2 + i * 0.12}s">${l}</span>`)
    .join('');

  return `
    <section id="scene-night-shore" class="scene night-shore-scene" aria-label="For Surabhi, With Love">
      <canvas id="water-ripples-canvas" class="water-ripples-layer" aria-hidden="true"></canvas>

      <div class="night-shore-content text-center">
        <!-- Personal Elegant Tag (No location label) -->
        <div class="personal-opening-badge">
          <span class="sparkle-dot"></span>
          <span>${SHORE_CONTENT.headerTitle}</span>
        </div>

        <!-- The Central Visual Focal Point: Surabhi -->
        <div class="sand-name-wrap">
          <h1 class="sand-name serif">${letters}</h1>
          <div class="sand-underline" aria-hidden="true"></div>
        </div>

        <!-- Intimate Marathi Opening Message -->
        <div class="opening-message-box glass-card">
          <p class="shore-marathi-main devanagari">
            "${SHORE_CONTENT.openingMarathi}"
          </p>
          <hr class="opening-divider" />
          <p class="shore-marathi-sub devanagari">
            ${SHORE_CONTENT.reflectionMarathi}
          </p>
        </div>

        <p class="shore-thought serif">
          ${SHORE_CONTENT.englishQuote}
        </p>

        <div class="scroll-hint">
          <span class="scroll-arrow">↓</span>
          <span>${SHORE_CONTENT.instruction}</span>
        </div>
      </div>

      <div class="foreground-rocks" aria-hidden="true"></div>
    </section>
  `;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
}

export function initNightShore(): void {
  const canvas = document.getElementById('water-ripples-canvas') as HTMLCanvasElement | null;
  const section = document.getElementById('scene-night-shore');
  if (!canvas || !section) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = section.clientWidth);
  let height = (canvas.height = section.clientHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = section.clientWidth;
    height = canvas.height = section.clientHeight;
  });

  const ripples: Ripple[] = [];
  const RIPPLE_COLORS = ['rgba(246, 207, 122, ', 'rgba(47, 127, 134, ', 'rgba(242, 134, 107, '];

  function addRipple(x: number, y: number) {
    const rect = section!.getBoundingClientRect();
    const relX = x - rect.left;
    const relY = y - rect.top;
    const color = RIPPLE_COLORS[Math.floor(Math.random() * RIPPLE_COLORS.length)];

    ripples.push({
      x: relX,
      y: relY,
      radius: 5,
      maxRadius: Math.min(width, height) * 0.35,
      alpha: 0.8,
      color,
    });
  }

  // Pointer / Touch listener
  section.addEventListener('pointerdown', (e) => addRipple(e.clientX, e.clientY));
  let lastMove = 0;
  section.addEventListener('pointermove', (e) => {
    const now = performance.now();
    if (now - lastMove > 120) {
      addRipple(e.clientX, e.clientY);
      lastMove = now;
    }
  });

  // Animation loop
  function animate() {
    ctx!.clearRect(0, 0, width, height);

    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      r.radius += 1.8;
      r.alpha *= 0.965;

      if (r.alpha < 0.01 || r.radius > r.maxRadius) {
        ripples.splice(i, 1);
        continue;
      }

      ctx!.beginPath();
      ctx!.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      ctx!.strokeStyle = `${r.color}${r.alpha})`;
      ctx!.lineWidth = 2;
      ctx!.stroke();

      // Inner faint secondary ring
      if (r.radius > 20) {
        ctx!.beginPath();
        ctx!.arc(r.x, r.y, r.radius * 0.65, 0, Math.PI * 2);
        ctx!.strokeStyle = `${r.color}${r.alpha * 0.5})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}
