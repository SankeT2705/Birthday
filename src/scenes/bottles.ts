/**
 * bottles.ts — Scene 3: Messages in Bottles & 3D Polaroid Memories
 * Displays 5 floating glass bottles on the sea. Tapping any bottle opens
 * a 3D Polaroid card featuring Surabhi's photos, dates, and handwritten notes.
 * Includes gyroscope/pointer 3D tilt, glossy specular highlight, and seamless modal dismissal.
 */

import { MEMORY_ITEMS } from '../content';
import { birthdayAudio } from '../audio';
import { onTilt } from '../core/tilt';
import { getLenis } from '../core/scroll';

export function renderBottles(): string {
  const bottleButtons = MEMORY_ITEMS.map((item, idx) => `
    <button class="bottle" data-memory-id="${item.id}" aria-label="Open Memory ${idx + 1}: ${item.title}" style="animation-delay: ${idx * 0.45}s">
      <span class="bottle-badge">${idx + 1}</span>
      <svg class="bottle-svg" width="56" height="110" viewBox="0 0 50 100" fill="none">
        <path d="M22 6 L28 6 L28 20 C36 26 42 35 42 50 L42 85 C42 92 36 96 25 96 C14 96 8 92 8 85 L8 50 C8 35 14 26 22 20 Z" 
              fill="rgba(47, 127, 134, 0.35)" stroke="rgba(246, 207, 122, 0.7)" stroke-width="2"/>
        <!-- Cork -->
        <rect x="21" y="1" width="8" height="6" rx="2" fill="#d49b5c" stroke="#966126" stroke-width="1"/>
        <!-- Rolled Parchment inside -->
        <path d="M18 42 Q25 38 32 42 L32 75 Q25 79 18 75 Z" fill="rgba(244, 233, 216, 0.85)" stroke="#c2a677" stroke-width="1"/>
        <line x1="22" y1="48" x2="28" y2="48" stroke="#8a6c38" stroke-width="1" stroke-linecap="round"/>
        <line x1="21" y1="56" x2="29" y2="56" stroke="#8a6c38" stroke-width="1" stroke-linecap="round"/>
        <line x1="22" y1="64" x2="28" y2="64" stroke="#8a6c38" stroke-width="1" stroke-linecap="round"/>
        <!-- Glass shine -->
        <path d="M12 55 Q12 40 16 30" stroke="rgba(255, 255, 255, 0.6)" stroke-width="1.8" stroke-linecap="round"/>
      </svg>
      <span class="bottle-caption text-caption">${item.badge}</span>
    </button>
  `).join('');

  return `
    <section id="scene-bottles" class="scene bottles-scene" aria-label="Messages in Bottles">
      <div class="scene-header text-center">
        <span class="card-badge gold-badge">Cherished Moments</span>
        <h2 class="section-title serif">Messages in Bottles</h2>
        <p class="section-subtitle">The tide brings five floating memories to your feet. Tap each bottle to unroll its story.</p>
      </div>

      <div class="bottles-row">
        ${bottleButtons}
      </div>

      <!-- Polaroid Modal Overlay -->
      <div id="polaroid-layer" class="polaroid-layer" aria-hidden="true" style="display: none;">
        <div id="polaroid-card" class="polaroid" role="dialog" aria-modal="true" aria-label="Memory Card" tabindex="-1">
          <!-- Dynamic Gloss Highlight -->
          <div id="polaroid-gloss" class="polaroid-gloss" aria-hidden="true"></div>

          <div class="polaroid-top-bar">
            <span id="p-counter" class="polaroid-counter">Memory 1 of 5</span>
            <button id="p-close" class="polaroid-close" aria-label="Close memory card">✕</button>
          </div>

          <div class="polaroid-photo-wrap">
            <img id="p-img" class="polaroid-photo" src="${MEMORY_ITEMS[0].photo}" alt="${MEMORY_ITEMS[0].title}" />
          </div>

          <div class="polaroid-body">
            <div class="polaroid-header-row">
              <h3 id="p-title" class="polaroid-caption serif">${MEMORY_ITEMS[0].title}</h3>
              <span id="p-date" class="polaroid-date text-caption">${MEMORY_ITEMS[0].date}</span>
            </div>
            <p id="p-tagline" class="polaroid-tagline text-caption muted">${MEMORY_ITEMS[0].caption}</p>
            <p id="p-note" class="polaroid-note handwritten">${MEMORY_ITEMS[0].note}</p>
            <p id="p-marathi" class="polaroid-marathi devanagari">${MEMORY_ITEMS[0].marathiReflection || ''}</p>
          </div>

          <div class="polaroid-nav">
            <button id="p-prev" class="polaroid-nav-btn" aria-label="Previous memory">← Prev</button>
            <div class="polaroid-dots" id="p-dots">
              ${MEMORY_ITEMS.map((_, i) => `<span class="p-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
            </div>
            <button id="p-next" class="polaroid-nav-btn" aria-label="Next memory">Next →</button>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initBottles(): void {
  const layer = document.getElementById('polaroid-layer');
  const card = document.getElementById('polaroid-card');
  const gloss = document.getElementById('polaroid-gloss');
  const closeBtn = document.getElementById('p-close');
  const prevBtn = document.getElementById('p-prev') as HTMLButtonElement | null;
  const nextBtn = document.getElementById('p-next') as HTMLButtonElement | null;

  const imgEl = document.getElementById('p-img') as HTMLImageElement | null;
  const titleEl = document.getElementById('p-title');
  const dateEl = document.getElementById('p-date');
  const taglineEl = document.getElementById('p-tagline');
  const noteEl = document.getElementById('p-note');
  const marathiEl = document.getElementById('p-marathi');
  const counterEl = document.getElementById('p-counter');
  const dotsContainer = document.getElementById('p-dots');

  if (!layer || !card) return;

  let currentIndex = 0;
  let isOpen = false;

  function updateCard(index: number) {
    currentIndex = (index + MEMORY_ITEMS.length) % MEMORY_ITEMS.length;
    const item = MEMORY_ITEMS[currentIndex];

    if (imgEl) {
      imgEl.src = item.photo;
      imgEl.alt = item.title;
      imgEl.onerror = () => {
        imgEl.style.opacity = '0.75';
      };
    }
    if (titleEl) titleEl.textContent = item.title;
    if (dateEl) dateEl.textContent = item.date;
    if (taglineEl) taglineEl.textContent = item.caption;
    if (noteEl) noteEl.textContent = item.note;
    if (marathiEl) marathiEl.textContent = item.marathiReflection || '';
    if (counterEl) counterEl.textContent = `Memory ${currentIndex + 1} of ${MEMORY_ITEMS.length}`;

    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.p-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    birthdayAudio.playTone(620 + currentIndex * 35, 0.35, 0, 0.1);
  }

  function openModal(index: number) {
    isOpen = true;
    updateCard(index);
    getLenis()?.stop();
    document.body.classList.add('modal-open');
    layer!.style.display = 'flex';
    layer!.setAttribute('aria-hidden', 'false');
    requestAnimationFrame(() => {
      layer!.classList.add('active');
      card!.focus();
    });
  }

  function closeModal() {
    isOpen = false;
    getLenis()?.start();
    document.body.classList.remove('modal-open');
    layer!.classList.remove('active');
    layer!.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      if (!isOpen) layer!.style.display = 'none';
    }, 300);
  }

  // 3D Tilt interaction on the Polaroid card
  onTilt(({ x, y }) => {
    if (!isOpen || !card) return;
    const rotY = x * 10;
    const rotX = -y * 10;
    card.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;

    if (gloss) {
      const posX = 50 + x * 35;
      const posY = 50 + y * 35;
      gloss.style.background = `radial-gradient(circle at ${posX}% ${posY}%, rgba(255,255,255,0.35) 0%, transparent 65%)`;
    }
  });

  // Bottle clicks
  document.querySelectorAll<HTMLButtonElement>('.bottle').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.memoryId || '1', 10);
      const idx = MEMORY_ITEMS.findIndex((m) => m.id === id);
      openModal(idx >= 0 ? idx : 0);
    });
  });

  // Nav buttons
  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateCard(currentIndex - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    updateCard(currentIndex + 1);
  });

  // Close button
  closeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    closeModal();
  });

  // Prevent clicks inside card from bubbling to layer
  card.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Clicking backdrop closes immediately
  layer.addEventListener('click', () => {
    closeModal();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!isOpen) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') updateCard(currentIndex + 1);
    if (e.key === 'ArrowLeft') updateCard(currentIndex - 1);
  });
}
