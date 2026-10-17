/**
 * effects.ts — Dynamic floating balloons engine and festive confetti explosion system.
 */

import { birthdayAudio } from './audio';

const BALLOON_COLORS = [
  { main: '#ff7675', light: '#fab1a0', ribbon: '#e17055' }, // Coral rose
  { main: '#f6cf7a', light: '#fffbe8', ribbon: '#d49b5c' }, // Champagne gold
  { main: '#a29bfe', light: '#dff9fb', ribbon: '#6c5ce7' }, // Lavender dream
  { main: '#2f7f86', light: '#81ecec', ribbon: '#0984e3' }, // Sindhudurg cyan
  { main: '#fd79a8', light: '#ffeaa7', ribbon: '#e84393' }, // Radiant pink
  { main: '#e17055', light: '#feca57', ribbon: '#d35400' }, // Sunset amber
];

export function initBalloons() {
  const container = document.getElementById('balloon-container');
  if (!container) return;

  // Initial burst of balloons
  for (let i = 0; i < 9; i++) {
    setTimeout(() => spawnSingleBalloon(container), i * 600);
  }

  // Periodic gentle release of balloons
  setInterval(() => {
    if (document.hidden) return;
    spawnSingleBalloon(container);
  }, 3500);
}

export function releaseMoreBalloons(count = 6) {
  const container = document.getElementById('balloon-container');
  if (!container) return;
  for (let i = 0; i < count; i++) {
    setTimeout(() => spawnSingleBalloon(container, true), i * 180);
  }
}

function spawnSingleBalloon(container: HTMLElement, fast = false) {
  const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
  const size = Math.floor(45 + Math.random() * 35); // 45px - 80px
  const leftPercent = 5 + Math.random() * 90;
  const duration = fast ? 9 + Math.random() * 4 : 14 + Math.random() * 8;
  const swayAmount = (Math.random() - 0.5) * 80;

  const balloon = document.createElement('div');
  balloon.className = 'floating-balloon';
  balloon.style.left = `${leftPercent}%`;
  balloon.style.width = `${size}px`;
  balloon.style.height = `${Math.floor(size * 1.25)}px`;
  balloon.style.animationDuration = `${duration}s`;
  balloon.style.setProperty('--sway', `${swayAmount}px`);

  balloon.innerHTML = `
    <div class="balloon-body" style="background: radial-gradient(circle at 35% 30%, ${color.light} 0%, ${color.main} 60%, ${color.ribbon} 100%);">
      <div class="balloon-shine"></div>
      <div class="balloon-knot" style="background: ${color.ribbon};"></div>
    </div>
    <svg class="balloon-string" viewBox="0 0 20 100" preserveAspectRatio="none">
      <path d="M10,0 Q18,30 6,60 T10,100" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.2"/>
    </svg>
  `;

  // Tap to pop balloon!
  balloon.addEventListener('click', (e) => {
    e.stopPropagation();
    popBalloon(balloon, e.clientX, e.clientY, color.main);
  });

  balloon.addEventListener('animationend', () => {
    balloon.remove();
  });

  container.appendChild(balloon);
}

function popBalloon(balloon: HTMLElement, x: number, y: number, color: string) {
  balloon.remove();
  birthdayAudio.playTone(880, 0.3, 0, 0.2); // cheerful pop pitch
  triggerConfetti(x, y, 20, [color, '#f6cf7a', '#ffffff']);

  // Floating score / wish indicator
  const indicator = document.createElement('div');
  indicator.className = 'pop-indicator';
  indicator.textContent = 'Wish Made! ✨';
  indicator.style.left = `${x}px`;
  indicator.style.top = `${y - 20}px`;
  document.body.appendChild(indicator);
  setTimeout(() => indicator.remove(), 1200);
}

export function triggerConfetti(originX?: number, originY?: number, count = 70, customColors?: string[]) {
  const container = document.getElementById('confetti-container');
  if (!container) return;

  const startX = originX ?? window.innerWidth / 2;
  const startY = originY ?? window.innerHeight / 2;
  const colors = customColors ?? ['#F6CF7A', '#F2866B', '#FF7675', '#2F7F86', '#FFFBE8', '#A29BFE'];

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    const isRound = Math.random() > 0.4;
    const size = Math.floor(6 + Math.random() * 8);

    p.style.width = `${size}px`;
    p.style.height = `${isRound ? size : size * 2}px`;
    p.style.borderRadius = isRound ? '50%' : '2px';
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.left = `${startX}px`;
    p.style.top = `${startY}px`;

    // Random physics trajectory
    const angle = Math.random() * Math.PI * 2;
    const velocity = 80 + Math.random() * 260;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity - 100;
    const rotate = (Math.random() - 0.5) * 720;
    const dur = 1.2 + Math.random() * 1.4;

    p.style.transition = `transform ${dur}s cubic-bezier(0.1, 0.8, 0.3, 1), opacity ${dur}s ease-in`;
    container.appendChild(p);

    requestAnimationFrame(() => {
      p.style.transform = `translate(${destX}px, ${destY + 250}px) rotate(${rotate}deg)`;
      p.style.opacity = '0';
    });

    setTimeout(() => p.remove(), dur * 1000 + 100);
  }
}
