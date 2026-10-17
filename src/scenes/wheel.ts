/**
 * wheel.ts — Scene 4: UPSC Journey — "A Dream That Serves"
 * Cinematic visual journey featuring the 24-spoke Ashoka Chakra,
 * focusing on the 8 core virtues of public administration and an intimate,
 * supportive emotional message from a best friend.
 */

import { UPSC_CONTENT } from '../content';
import { birthdayAudio } from '../audio';
import { onTilt } from '../core/tilt';

export function renderWheel(): string {
  // Generate precisely 24 spokes at 15-degree intervals (360 / 24 = 15)
  const cx = 150;
  const cy = 150;
  const hubRadius = 26;
  const rimRadius = 122;

  const spokesSvg = Array.from({ length: 24 }).map((_, i) => {
    const deg = i * 15;
    const rad = (deg * Math.PI) / 180;
    const x1 = cx + hubRadius * Math.cos(rad);
    const y1 = cy + hubRadius * Math.sin(rad);
    const x2 = cx + rimRadius * Math.cos(rad);
    const y2 = cy + rimRadius * Math.sin(rad);

    // Tip terminal dot
    const dotX = cx + (rimRadius - 2) * Math.cos(rad);
    const dotY = cy + (rimRadius - 2) * Math.sin(rad);

    return `
      <g class="spoke-group ${i % 3 === 0 ? 'cardinal-spoke' : ''}" data-spoke-index="${i}">
        <!-- Main Spoke Line -->
        <line class="spoke-line" x1="${x1.toFixed(2)}" y1="${y1.toFixed(2)}" x2="${x2.toFixed(2)}" y2="${y2.toFixed(2)}" stroke-width="2.2" stroke-linecap="round" />
        <!-- Terminal Bead -->
        <circle class="spoke-dot" cx="${dotX.toFixed(2)}" cy="${dotY.toFixed(2)}" r="2.2" />
      </g>
    `;
  }).join('');

  const virtuesList = UPSC_CONTENT.eightVirtues;

  return `
    <section id="scene-wheel" class="scene wheel-scene" aria-label="A Dream That Serves">
      <div class="chakra-ambient-glow" aria-hidden="true"></div>

      <!-- Section Header -->
      <div class="scene-header text-center">
        <span class="card-badge gold-badge">${UPSC_CONTENT.badge}</span>
        <h2 class="section-title serif">${UPSC_CONTENT.title}</h2>
        <p class="section-subtitle">${UPSC_CONTENT.subtitle}</p>
      </div>

      <div class="chakra-stage" id="chakra-stage">
        <!-- Proportioned 24-Spoke Ashoka Chakra -->
        <div class="chakra-wrap" id="chakra-wrap">
          <svg id="chakra-svg" class="chakra-svg" viewBox="0 0 300 300" fill="none">
            <defs>
              <filter id="chakra-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="gold-rim-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fff8db" />
                <stop offset="50%" stop-color="#f6cf7a" />
                <stop offset="100%" stop-color="#c29339" />
              </linearGradient>
            </defs>

            <!-- Outer Dual Rims with gold detailing -->
            <circle cx="150" cy="150" r="136" stroke="url(#gold-rim-grad)" stroke-width="2.6" opacity="0.95" filter="url(#chakra-subtle-glow)" />
            <circle cx="150" cy="150" r="126" stroke="#f6cf7a" stroke-width="1.6" opacity="0.6" />

            <!-- Hub Outer & Inner -->
            <circle cx="150" cy="150" r="28" fill="#070b1a" stroke="url(#gold-rim-grad)" stroke-width="2.4" />
            <circle cx="150" cy="150" r="10" fill="#f6cf7a" opacity="0.95" />

            <!-- The 24 Spokes -->
            <g id="spokes-container" stroke="#f6cf7a" fill="#f6cf7a">
              ${spokesSvg}
            </g>
          </svg>
        </div>

        <!-- 8 Core Public Service Virtues Display Card -->
        <div class="virtue-card glass-card text-center" id="virtue-card">
          <div class="virtue-step-counter">
            <span id="virtue-step-text" class="text-caption uppercase monospace">VIRTUE 01 OF 08</span>
          </div>

          <div class="virtue-word-wrap">
            <h3 id="virtue-english" class="virtue-title serif">${virtuesList[0].word}</h3>
            <span id="virtue-marathi" class="virtue-marathi-tag devanagari">${virtuesList[0].marathi}</span>
          </div>

          <p id="virtue-desc" class="virtue-description">
            ${virtuesList[0].description}
          </p>

          <!-- Navigation Controls -->
          <div class="virtue-controls">
            <button id="virtue-prev-btn" class="virtue-ctrl-btn" aria-label="Previous virtue">← Prev</button>
            <div class="virtue-dots" id="virtue-dots">
              ${virtuesList.map((_, i) => `<span class="v-dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
            </div>
            <button id="virtue-next-btn" class="virtue-ctrl-btn" aria-label="Next virtue">Next →</button>
          </div>
        </div>
      </div>

      <!-- Main Emotional Best Friend Message -->
      <div class="upsc-emotional-container glass-card text-center">
        <p class="upsc-marathi-core devanagari">
          "${UPSC_CONTENT.mainMessageMarathi}"
        </p>
        <hr class="upsc-divider" />
        <p class="upsc-marathi-hope devanagari">
          ${UPSC_CONTENT.hopeMarathi}
        </p>
      </div>
    </section>
  `;
}

export function initWheel(): void {
  const stageEl = document.getElementById('chakra-stage');
  const chakraSvg = document.getElementById('chakra-svg');
  const englishEl = document.getElementById('virtue-english');
  const marathiEl = document.getElementById('virtue-marathi');
  const descEl = document.getElementById('virtue-desc');
  const stepEl = document.getElementById('virtue-step-text');
  const dotsContainer = document.getElementById('virtue-dots');
  const prevBtn = document.getElementById('virtue-prev-btn');
  const nextBtn = document.getElementById('virtue-next-btn');

  if (!chakraSvg || !englishEl || !marathiEl || !descEl) return;

  const virtues = UPSC_CONTENT.eightVirtues;
  let currentIdx = 0;

  function selectVirtue(idx: number, playSound = true) {
    currentIdx = (idx + virtues.length) % virtues.length;
    const v = virtues[currentIdx];

    // Smoothly rotate the wheel (each virtue corresponds to 45 degrees: 360 / 8 = 45)
    const targetAngle = -currentIdx * 45;
    chakraSvg!.style.transform = `rotate(${targetAngle}deg)`;
    chakraSvg!.style.transition = 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';

    // Update text
    englishEl!.style.opacity = '0';
    marathiEl!.style.opacity = '0';
    descEl!.style.opacity = '0';

    setTimeout(() => {
      englishEl!.textContent = v.word;
      marathiEl!.textContent = v.marathi;
      descEl!.textContent = v.description;
      if (stepEl) stepEl.textContent = `VIRTUE ${String(currentIdx + 1).padStart(2, '0')} OF 08`;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.v-dot');
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIdx));
      }

      englishEl!.style.opacity = '1';
      marathiEl!.style.opacity = '1';
      descEl!.style.opacity = '1';
    }, 140);

    if (playSound) {
      birthdayAudio.playTone(520 + currentIdx * 30, 0.35, 0, 0.1);
    }
  }

  // 3D Parallax Tilt on the Chakra Stage
  if (stageEl) {
    onTilt(({ x, y }) => {
      const rotY = x * 7;
      const rotX = -y * 7;
      stageEl.style.transform = `perspective(900px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });
  }

  prevBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectVirtue(currentIdx - 1);
  });

  nextBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    selectVirtue(currentIdx + 1);
  });

  // Tap dots directly
  dotsContainer?.querySelectorAll('.v-dot').forEach((dot, index) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      selectVirtue(index);
    });
  });
}
