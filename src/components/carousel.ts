/**
 * carousel.ts — Center Carousel & Collage Showcase of Surabhi's 5 photos.
 * Features touch-swipe gestures, view toggling (Carousel ↔ Collage), and lightbox view.
 */

import { PHOTO_MEMORIES } from '../content';
import { triggerConfetti } from '../effects';
import { birthdayAudio } from '../audio';

let currentIndex = 0;
let isCollageMode = false;

export function renderCarousel(): string {
  const slidesHtml = PHOTO_MEMORIES.map((m: any, idx: number) => `
    <div class="carousel-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
      <div class="slide-card glass-card">
        <div class="photo-frame" data-img-index="${idx}">
          <img src="${m.photo}" alt="${m.title}" class="carousel-img" loading="eager" />
          <div class="photo-overlay-badge">${m.badge}</div>
          <button class="zoom-btn" title="View Fullscreen" aria-label="View Fullscreen">⛶</button>
        </div>
        <div class="slide-content">
          <div class="slide-meta">
            <span class="slide-counter text-caption">Memory ${idx + 1} of ${PHOTO_MEMORIES.length}</span>
            <span class="slide-tagline text-caption">${m.tagline}</span>
          </div>
          <h3 class="slide-title serif">${m.title}</h3>
          <p class="slide-note handwritten">${m.note}</p>
        </div>
      </div>
    </div>
  `).join('');

  const dotsHtml = PHOTO_MEMORIES.map((_: any, idx: number) => `
    <button class="nav-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}" aria-label="Go to slide ${idx + 1}"></button>
  `).join('');

  const collageHtml = PHOTO_MEMORIES.map((m: any, idx: number) => `
    <div class="collage-item item-${idx}" data-img-index="${idx}">
      <img src="${m.photo}" alt="${m.title}" class="collage-img" loading="lazy" />
      <div class="collage-overlay">
        <span class="collage-badge">${m.badge}</span>
        <h4 class="collage-title serif">${m.title}</h4>
        <p class="collage-note text-caption">${m.tagline}</p>
      </div>
    </div>
  `).join('');

  return `
  <section class="gallery-section" id="gallery-section">
    <div class="section-header text-center">
      <div class="card-badge gold-badge">✨ Captured Moments ✨</div>
      <h2 class="serif section-title">Surabhi's Moments of Radiance</h2>
      <p class="section-subtitle">Every photograph tells a story of elegance, warmth, and dreams in motion.</p>
      
      <!-- View mode switcher -->
      <div class="view-switcher">
        <button id="view-carousel-btn" class="switch-btn active" aria-label="Carousel View">
          <span>🎞️</span> Carousel
        </button>
        <button id="view-collage-btn" class="switch-btn" aria-label="Collage View">
          <span>🖼️</span> Collage Grid
        </button>
      </div>
    </div>

    <!-- 1. Carousel Mode Container -->
    <div class="carousel-container" id="carousel-view">
      <div class="carousel-track" id="carousel-track">
        ${slidesHtml}
      </div>

      <!-- Controls -->
      <div class="carousel-controls">
        <button id="prev-slide-btn" class="carousel-arrow prev-arrow" aria-label="Previous photo">
          ‹
        </button>
        <div class="carousel-dots">
          ${dotsHtml}
        </div>
        <button id="next-slide-btn" class="carousel-arrow next-arrow" aria-label="Next photo">
          ›
        </button>
      </div>

      <div class="swipe-hint text-caption">👈 Swipe on mobile to browse 👉</div>
    </div>

    <!-- 2. Collage Mode Container -->
    <div class="collage-container" id="collage-view" style="display:none;">
      <div class="collage-grid">
        ${collageHtml}
      </div>
      <p class="text-caption text-center muted" style="margin-top:16px;">Tap any photo to view in high definition</p>
    </div>

    <!-- Lightbox Modal -->
    <div id="photo-lightbox" class="lightbox-modal" style="display:none;" role="dialog" aria-modal="true">
      <div class="lightbox-backdrop" id="lightbox-backdrop"></div>
      <div class="lightbox-content">
        <button id="lightbox-close" class="lightbox-close" aria-label="Close modal">×</button>
        <div class="lightbox-image-wrap">
          <img id="lightbox-img" src="" alt="Full view" />
        </div>
        <div class="lightbox-details">
          <h3 id="lightbox-title" class="serif"></h3>
          <p id="lightbox-note" class="handwritten"></p>
          <div class="lightbox-actions">
            <button id="heart-react-btn" class="heart-btn">❤️ Love This Photo</button>
          </div>
        </div>
      </div>
    </div>
  </section>
  `;
}

export function initCarouselInteractions() {
  const track = document.getElementById('carousel-track');
  const slides = document.querySelectorAll<HTMLElement>('.carousel-slide');
  const dots = document.querySelectorAll<HTMLElement>('.nav-dot');
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');

  const carouselView = document.getElementById('carousel-view');
  const collageView = document.getElementById('collage-view');
  const btnCarousel = document.getElementById('view-carousel-btn');
  const btnCollage = document.getElementById('view-collage-btn');

  function updateSlide(index: number) {
    currentIndex = (index + PHOTO_MEMORIES.length) % PHOTO_MEMORIES.length;

    slides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentIndex);
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });

    // Sound effect
    birthdayAudio.playTone(520 + currentIndex * 60, 0.2, 0, 0.08);
  }

  prevBtn?.addEventListener('click', () => updateSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => updateSlide(currentIndex + 1));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = Number(dot.dataset.index);
      if (!isNaN(idx)) updateSlide(idx);
    });
  });

  // Touch Swipe for Mobile
  let startX = 0;
  let endX = 0;

  track?.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  track?.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        updateSlide(currentIndex + 1); // Swiped left -> next
      } else {
        updateSlide(currentIndex - 1); // Swiped right -> prev
      }
    }
  }, { passive: true });

  // View Switcher (Carousel vs Collage)
  btnCarousel?.addEventListener('click', () => {
    if (!isCollageMode) return;
    isCollageMode = false;
    btnCarousel.classList.add('active');
    btnCollage?.classList.remove('active');
    if (carouselView) carouselView.style.display = 'block';
    if (collageView) collageView.style.display = 'none';
  });

  btnCollage?.addEventListener('click', () => {
    if (isCollageMode) return;
    isCollageMode = true;
    btnCollage.classList.add('active');
    btnCarousel?.classList.remove('active');
    if (carouselView) carouselView.style.display = 'none';
    if (collageView) collageView.style.display = 'block';
    triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 30);
  });

  // Lightbox Modal Setup
  const lightbox = document.getElementById('photo-lightbox');
  const lbImg = document.getElementById('lightbox-img') as HTMLImageElement;
  const lbTitle = document.getElementById('lightbox-title');
  const lbNote = document.getElementById('lightbox-note');
  const lbClose = document.getElementById('lightbox-close');
  const lbBackdrop = document.getElementById('lightbox-backdrop');
  const heartBtn = document.getElementById('heart-react-btn');

  function openLightbox(idx: number) {
    const memory = PHOTO_MEMORIES[idx];
    if (!memory || !lightbox || !lbImg) return;

    lbImg.src = memory.photo;
    if (lbTitle) lbTitle.textContent = memory.title;
    if (lbNote) lbNote.textContent = memory.note;

    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }

  // Open on slide click or collage click
  document.querySelectorAll<HTMLElement>('[data-img-index]').forEach((el) => {
    el.addEventListener('click', () => {
      const idx = Number(el.dataset.imgIndex);
      if (!isNaN(idx)) openLightbox(idx);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lbBackdrop?.addEventListener('click', closeLightbox);
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  heartBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    heartBtn.textContent = '❤️ Loved! ✨';
    triggerConfetti(window.innerWidth / 2, window.innerHeight / 2, 40, ['#ff7675', '#fd79a8', '#f6cf7a']);
    birthdayAudio.playTone(800, 0.4, 0, 0.2);
  });
}
