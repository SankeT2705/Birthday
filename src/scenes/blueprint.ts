/**
 * blueprint.ts — Scene 2: Civil Engineering — "Built on Strong Foundations"
 * Professional engineering editorial design on a dark navy blueprint canvas.
 * Unifies Foundation, Structural Frame, and Bridge into one cohesive technical drafting sheet.
 * Connects the discipline of civil engineering with patience, UPSC preparation, and courage.
 */

import { ENGINEERING_CONTENT } from '../content';
import { onTilt } from '../core/tilt';

export function renderBlueprint(): string {
  const p1 = ENGINEERING_CONTENT.principles[0];
  const p2 = ENGINEERING_CONTENT.principles[1];
  const p3 = ENGINEERING_CONTENT.principles[2];

  return `
    <section id="scene-blueprint" class="scene blueprint-scene" aria-label="Built on Strong Foundations">
      <div class="blueprint-canvas-grid" aria-hidden="true"></div>

      <!-- Section Header -->
      <div class="scene-header text-center">
        <span class="card-badge blueprint-badge">${ENGINEERING_CONTENT.badge}</span>
        <h2 class="section-title serif">${ENGINEERING_CONTENT.title}</h2>
        <p class="section-subtitle">${ENGINEERING_CONTENT.subtitle}</p>
      </div>

      <!-- Main Unified Engineering Drawing Sheet -->
      <div class="blueprint-drafting-sheet glass-card" id="blueprint-drafting-sheet">
        <!-- Drafting Sheet Top Metadata Strip -->
        <div class="sheet-meta-bar">
          <div class="meta-item">
            <span class="meta-label">DRAWING NO.</span>
            <span class="meta-val monospace">${ENGINEERING_CONTENT.drawingMeta.sheetNo}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">DISCIPLINE</span>
            <span class="meta-val monospace">${ENGINEERING_CONTENT.drawingMeta.discipline}</span>
          </div>
          <div class="meta-item">
            <span class="meta-label">LEAD DESIGNER</span>
            <span class="meta-val monospace">${ENGINEERING_CONTENT.drawingMeta.author}</span>
          </div>
          <div class="meta-item hide-mobile">
            <span class="meta-label">SCALE</span>
            <span class="meta-val monospace">${ENGINEERING_CONTENT.drawingMeta.scale}</span>
          </div>
        </div>

        <!-- Stage Navigation Tabs -->
        <nav class="blueprint-stage-tabs" role="tablist" aria-label="Engineering Principles">
          <button class="stage-tab-btn active" role="tab" aria-selected="true" data-stage="0" id="tab-0">
            <span class="tab-num">01</span>
            <span class="tab-name">FOUNDATION</span>
          </button>
          <button class="stage-tab-btn" role="tab" aria-selected="false" data-stage="1" id="tab-1">
            <span class="tab-num">02</span>
            <span class="tab-name">STRUCTURE</span>
          </button>
          <button class="stage-tab-btn" role="tab" aria-selected="false" data-stage="2" id="tab-2">
            <span class="tab-num">03</span>
            <span class="tab-name">BRIDGE</span>
          </button>
        </nav>

        <!-- Dynamic Architectural SVG Stage -->
        <div class="drawing-viewport-wrap">
          <!-- 01. Foundation SVG Drawing -->
          <div class="drawing-stage-panel active" id="stage-panel-0" role="tabpanel" aria-labelledby="tab-0">
            <div class="svg-drawing-container">
              <svg class="eng-drawing-svg" viewBox="0 0 720 380" fill="none" stroke="currentColor">
                <defs>
                  <!-- Hatched Soil Pattern -->
                  <pattern id="soil-hatch" width="12" height="12" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <line x1="0" y1="0" x2="0" y2="12" stroke="#2b4c7e" stroke-width="1.2" opacity="0.4" />
                  </pattern>
                </defs>

                <!-- Ground Level Datum Line -->
                <line x1="60" y1="160" x2="660" y2="160" stroke="#f6cf7a" stroke-width="1.5" stroke-dasharray="6 4" />
                <text x="70" y="152" fill="#f6cf7a" font-size="11" class="monospace">▼ NGL ±0.000 m (NATURAL GROUND LEVEL)</text>

                <!-- Soil Hatching below ground -->
                <rect x="60" y="160" width="600" height="190" fill="url(#soil-hatch)" />

                <!-- Column Pedestal & Shaft -->
                <path class="eng-line" d="M320 60 L320 200 L400 200 L400 60" stroke="#e3cfa9" stroke-width="2.5" />
                <!-- Column Longitudinal Rebar -->
                <line class="eng-line rebar" x1="332" y1="60" x2="332" y2="280" stroke="#f6cf7a" stroke-width="2" />
                <line class="eng-line rebar" x1="388" y1="60" x2="388" y2="280" stroke="#f6cf7a" stroke-width="2" />
                <!-- Column Lateral Ties / Stirrups -->
                <line class="eng-line tie" x1="326" y1="90" x2="394" y2="90" stroke="#f6cf7a" stroke-width="1.2" stroke-dasharray="2 2" />
                <line class="eng-line tie" x1="326" y1="120" x2="394" y2="120" stroke="#f6cf7a" stroke-width="1.2" stroke-dasharray="2 2" />
                <line class="eng-line tie" x1="326" y1="150" x2="394" y2="150" stroke="#f6cf7a" stroke-width="1.2" stroke-dasharray="2 2" />
                <line class="eng-line tie" x1="326" y1="180" x2="394" y2="180" stroke="#f6cf7a" stroke-width="1.2" stroke-dasharray="2 2" />

                <!-- Stepped Isolated Footing Profile -->
                <path class="eng-line footing" d="M280 200 L280 230 L200 250 L200 290 L520 290 L520 250 L440 230 L440 200 Z" 
                      fill="rgba(43,76,126,0.18)" stroke="#f4e9d8" stroke-width="2.5" />

                <!-- Bottom Rebar Mat (Fe500 Orthogonal Mesh) -->
                <line class="eng-line rebar" x1="210" y1="280" x2="510" y2="280" stroke="#f6cf7a" stroke-width="2.8" />
                <!-- Rebar Hooks at ends -->
                <path d="M210 280 L210 262" stroke="#f6cf7a" stroke-width="2.8" />
                <path d="M510 280 L510 262" stroke="#f6cf7a" stroke-width="2.8" />
                <!-- Distribution rebar dots -->
                <g fill="#f6cf7a">
                  <circle cx="235" cy="274" r="3" />
                  <circle cx="270" cy="274" r="3" />
                  <circle cx="305" cy="274" r="3" />
                  <circle cx="340" cy="274" r="3" />
                  <circle cx="380" cy="274" r="3" />
                  <circle cx="415" cy="274" r="3" />
                  <circle cx="450" cy="274" r="3" />
                  <circle cx="485" cy="274" r="3" />
                </g>

                <!-- PCC Bedding Layer -->
                <rect x="185" y="290" width="350" height="20" fill="rgba(244,233,216,0.08)" stroke="#c2a677" stroke-width="1.5" stroke-dasharray="4 3" />
                <text x="195" y="304" fill="#c2a677" font-size="9" class="monospace">PCC 1:4:8 BLINDING (100mm THK)</text>

                <!-- Upward Soil Reaction Pressure Arrows -->
                <g stroke="#f2866b" stroke-width="1.8" marker-end="url(#arrow)">
                  <line x1="220" y1="350" x2="220" y2="315" />
                  <line x1="270" y1="350" x2="270" y2="315" />
                  <line x1="320" y1="350" x2="320" y2="315" />
                  <line x1="360" y1="350" x2="360" y2="315" />
                  <line x1="400" y1="350" x2="400" y2="315" />
                  <line x1="450" y1="350" x2="450" y2="315" />
                  <line x1="500" y1="350" x2="500" y2="315" />
                </g>
                <text x="290" y="365" fill="#f2866b" font-size="11" class="monospace font-semibold">↑ ↑ SAFE BEARING PRESSURE q_a = 280 kN/m²</text>

                <!-- Axial Load from Superstructure -->
                <line x1="360" y1="15" x2="360" y2="55" stroke="#f6cf7a" stroke-width="2.5" />
                <polygon points="354,50 360,60 366,50" fill="#f6cf7a" />
                <text x="375" y="38" fill="#f6cf7a" font-size="12" class="monospace font-bold">AXIAL LOAD P = 1200 kN</text>

                <!-- Dimension Lines -->
                <g stroke="rgba(246,207,122,0.6)" stroke-width="1" class="monospace" font-size="10" fill="#f6cf7a">
                  <!-- Width of footing -->
                  <line x1="200" y1="325" x2="520" y2="325" />
                  <line x1="200" y1="320" x2="200" y2="330" />
                  <line x1="520" y1="320" x2="520" y2="330" />
                  <text x="335" y="322">B = 2.40 m</text>
                  <!-- Column width -->
                  <line x1="320" y1="45" x2="400" y2="45" />
                  <line x1="320" y1="40" x2="320" y2="50" />
                  <line x1="400" y1="40" x2="400" y2="50" />
                  <text x="345" y="42">450 mm</text>
                </g>

                <!-- Technical Callout Leader Line -->
                <polyline points="485,274 540,240 610,240" stroke="#f6cf7a" stroke-width="1" stroke-dasharray="3 3" />
                <text x="545" y="234" fill="#f6cf7a" font-size="9" class="monospace">Fe500 REINFORCEMENT @ 150 c/c</text>
              </svg>
            </div>

            <!-- Narrative Text for Foundation -->
            <div class="stage-narrative">
              <div class="narrative-badge">
                <span>01. ${p1.subheading}</span>
              </div>
              <h3 class="narrative-heading serif">${p1.heading}</h3>
              <p class="narrative-marathi devanagari">
                "${p1.marathiQuote}"
              </p>
              <div class="tech-spec-row">
                <span class="tech-tag">${p1.techAnnotation}</span>
              </div>
              <ul class="tech-bullet-list">
                ${p1.details.map((d: string) => `<li><span class="bullet-dot"></span><span>${d}</span></li>`).join('')}
              </ul>
              <p class="emotional-lesson serif italic">${p1.emotionalLesson}</p>
            </div>
          </div>

          <!-- 02. Structure SVG Drawing -->
          <div class="drawing-stage-panel" id="stage-panel-1" role="tabpanel" aria-labelledby="tab-1">
            <div class="svg-drawing-container">
              <svg class="eng-drawing-svg" viewBox="0 0 720 380" fill="none" stroke="currentColor">
                <!-- Grid Lines -->
                <g stroke="rgba(43,76,126,0.25)" stroke-width="0.8" stroke-dasharray="4 4">
                  <line x1="100" y1="40" x2="100" y2="340" />
                  <line x1="280" y1="40" x2="280" y2="340" />
                  <line x1="460" y1="40" x2="460" y2="340" />
                  <line x1="640" y1="40" x2="640" y2="340" />
                  <line x1="60" y1="100" x2="660" y2="100" />
                  <line x1="60" y1="210" x2="660" y2="210" />
                  <line x1="60" y1="320" x2="660" y2="320" />
                </g>

                <!-- Grid Bubbles -->
                <g fill="none" stroke="#f6cf7a" stroke-width="1.2" class="monospace" font-size="11">
                  <circle cx="100" cy="24" r="12" />
                  <text x="96" y="28" fill="#f6cf7a">A</text>
                  <circle cx="280" cy="24" r="12" />
                  <text x="276" y="28" fill="#f6cf7a">B</text>
                  <circle cx="460" cy="24" r="12" />
                  <text x="456" y="28" fill="#f6cf7a">C</text>
                  <circle cx="640" cy="24" r="12" />
                  <text x="636" y="28" fill="#f6cf7a">D</text>
                </g>

                <!-- Rigid Columns (Moment-Resisting RC Columns) -->
                <path class="eng-line" d="M92 100 L92 320 M108 100 L108 320" stroke="#f4e9d8" stroke-width="2.5" />
                <path class="eng-line" d="M272 60 L272 320 M288 60 L288 320" stroke="#f4e9d8" stroke-width="3" />
                <path class="eng-line" d="M452 60 L452 320 M468 60 L468 320" stroke="#f4e9d8" stroke-width="3" />
                <path class="eng-line" d="M632 100 L632 320 M648 100 L648 320" stroke="#f4e9d8" stroke-width="2.5" />

                <!-- Beams Level 1 & Level 2 -->
                <rect x="92" y="200" width="556" height="20" fill="rgba(43,76,126,0.25)" stroke="#f4e9d8" stroke-width="2" />
                <rect x="272" y="90" width="200" height="20" fill="rgba(43,76,126,0.25)" stroke="#f4e9d8" stroke-width="2" />

                <!-- Moment-Rotation Curves at Joints -->
                <path d="M245 195 Q280 180 280 200" stroke="#f2866b" stroke-width="2" fill="none" />
                <path d="M485 195 Q450 180 450 200" stroke="#f2866b" stroke-width="2" fill="none" />
                <!-- Parabolic Bending Moment Diagram on Midspan -->
                <path d="M108 220 Q190 255 272 220" stroke="#2f7f86" stroke-width="1.8" stroke-dasharray="3 2" fill="none" />
                <path d="M288 220 Q370 260 452 220" stroke="#f6cf7a" stroke-width="2" stroke-dasharray="4 2" fill="none" />
                <path d="M468 220 Q550 255 632 220" stroke="#2f7f86" stroke-width="1.8" stroke-dasharray="3 2" fill="none" />
                <text x="328" y="276" fill="#f6cf7a" font-size="9" class="monospace">MAX +M_mid = wL²/8</text>

                <!-- Fixed Base Foundation Indicators -->
                <g stroke="#f6cf7a" stroke-width="2">
                  <line x1="80" y1="320" x2="120" y2="320" />
                  <line x1="260" y1="320" x2="300" y2="320" />
                  <line x1="440" y1="320" x2="480" y2="320" />
                  <line x1="620" y1="320" x2="660" y2="320" />
                </g>
                <!-- Hatch under supports -->
                <g stroke="rgba(246,207,122,0.4)" stroke-width="1.2">
                  <line x1="82" y1="320" x2="72" y2="332" />
                  <line x1="92" y1="320" x2="82" y2="332" />
                  <line x1="102" y1="320" x2="92" y2="332" />
                  <line x1="112" y1="320" x2="102" y2="332" />

                  <line x1="262" y1="320" x2="252" y2="332" />
                  <line x1="272" y1="320" x2="262" y2="332" />
                  <line x1="282" y1="320" x2="272" y2="332" />
                  <line x1="292" y1="320" x2="282" y2="332" />

                  <line x1="442" y1="320" x2="432" y2="332" />
                  <line x1="452" y1="320" x2="442" y2="332" />
                  <line x1="462" y1="320" x2="452" y2="332" />
                  <line x1="472" y1="320" x2="462" y2="332" />

                  <line x1="622" y1="320" x2="612" y2="332" />
                  <line x1="632" y1="320" x2="622" y2="332" />
                  <line x1="642" y1="320" x2="632" y2="332" />
                  <line x1="652" y1="320" x2="642" y2="332" />
                </g>

                <!-- Storey Height Dimension -->
                <line x1="50" y1="210" x2="50" y2="320" stroke="rgba(246,207,122,0.7)" stroke-width="1" />
                <line x1="45" y1="210" x2="55" y2="210" stroke="#f6cf7a" />
                <line x1="45" y1="320" x2="55" y2="320" stroke="#f6cf7a" />
                <text x="15" y="270" fill="#f6cf7a" font-size="9" class="monospace" transform="rotate(-90 20 270)">H = 3.60 m</text>
              </svg>
            </div>

            <!-- Narrative Text for Structure -->
            <div class="stage-narrative">
              <div class="narrative-badge">
                <span>02. ${p2.subheading}</span>
              </div>
              <h3 class="narrative-heading serif">${p2.heading}</h3>
              <p class="narrative-marathi devanagari">
                "${p2.marathiQuote}"
              </p>
              <p class="narrative-marathi-secondary devanagari">
                ${p2.marathiSecondary}
              </p>
              <div class="tech-spec-row">
                <span class="tech-tag">${p2.techAnnotation}</span>
              </div>
              <ul class="tech-bullet-list">
                ${p2.details.map((d: string) => `<li><span class="bullet-dot"></span><span>${d}</span></li>`).join('')}
              </ul>
              <p class="emotional-lesson serif italic">${p2.emotionalLesson}</p>
            </div>
          </div>

          <!-- 03. Bridge SVG Drawing -->
          <div class="drawing-stage-panel" id="stage-panel-2" role="tabpanel" aria-labelledby="tab-2">
            <div class="svg-drawing-container">
              <svg class="eng-drawing-svg" viewBox="0 0 720 380" fill="none" stroke="currentColor">
                <!-- High Flood Level / Water Horizon -->
                <line x1="40" y1="270" x2="680" y2="270" stroke="#2f7f86" stroke-width="1.8" stroke-dasharray="6 3" />
                <text x="50" y="262" fill="#2f7f86" font-size="10" class="monospace">▼ HFL +12.40 m (HIGH FLOOD LEVEL)</text>

                <!-- Rock Abutments Left & Right -->
                <path class="eng-line" d="M40 320 L120 320 L120 220 L70 220 L40 280 Z" fill="rgba(43,76,126,0.3)" stroke="#e3cfa9" stroke-width="2.5" />
                <path class="eng-line" d="M680 320 L600 320 L600 220 L650 220 L680 280 Z" fill="rgba(43,76,126,0.3)" stroke="#e3cfa9" stroke-width="2.5" />

                <!-- Parabolic Arch Rib (Tied Arch Span) -->
                <path class="eng-line arch-rib" d="M120 220 Q360 40 600 220" stroke="#f6cf7a" stroke-width="4.5" fill="none" />
                <!-- Inner Parallel Arch Line for Truss Depth -->
                <path class="eng-line" d="M128 220 Q360 62 592 220" stroke="#f4e9d8" stroke-width="2" fill="none" opacity="0.8" />

                <!-- Continuous Deck Girder -->
                <rect x="90" y="215" width="540" height="14" rx="2" fill="rgba(246,207,122,0.18)" stroke="#f6cf7a" stroke-width="2.2" />

                <!-- Vertical High-Tensile Suspender Cables (13 hangers) -->
                <g stroke="#f4e9d8" stroke-width="1.6" opacity="0.85">
                  <line x1="160" y1="184" x2="160" y2="215" />
                  <line x1="200" y1="148" x2="200" y2="215" />
                  <line x1="240" y1="118" x2="240" y2="215" />
                  <line x1="280" y1="94" x2="280" y2="215" />
                  <line x1="320" y1="78" x2="320" y2="215" />
                  <line x1="360" y1="72" x2="360" y2="215" stroke-width="2.2" stroke="#f6cf7a" />
                  <line x1="400" y1="78" x2="400" y2="215" />
                  <line x1="440" y1="94" x2="440" y2="215" />
                  <line x1="480" y1="118" x2="480" y2="215" />
                  <line x1="520" y1="148" x2="520" y2="215" />
                  <line x1="560" y1="184" x2="560" y2="215" />
                </g>

                <!-- Navigation Clearance Envelope -->
                <rect x="260" y="229" width="200" height="41" fill="none" stroke="rgba(242,134,107,0.4)" stroke-width="1" stroke-dasharray="3 3" />
                <text x="290" y="254" fill="#f2866b" font-size="9" class="monospace">CLEARANCE H = 18.0 m</text>

                <!-- Arch Rise & Span Dimension Lines -->
                <g stroke="rgba(246,207,122,0.7)" stroke-width="1" class="monospace" font-size="10" fill="#f6cf7a">
                  <!-- Span Dimension -->
                  <line x1="120" y1="300" x2="600" y2="300" />
                  <line x1="120" y1="295" x2="120" y2="305" />
                  <line x1="600" y1="295" x2="600" y2="305" />
                  <text x="320" y="318" font-size="11" font-weight="bold">CLEAR SPAN L = 160.00 m</text>
                  <!-- Arch Rise Dimension -->
                  <line x1="360" y1="40" x2="360" y2="215" stroke-dasharray="2 2" stroke="rgba(246,207,122,0.4)" />
                  <text x="368" y="145" font-size="9">RISE f = 32.0 m</text>
                </g>
              </svg>
            </div>

            <!-- Narrative Text for Bridge -->
            <div class="stage-narrative">
              <div class="narrative-badge">
                <span>03. ${p3.subheading}</span>
              </div>
              <h3 class="narrative-heading serif">${p3.heading}</h3>
              <p class="narrative-marathi devanagari">
                "${p3.marathiQuote}"
              </p>
              <div class="tech-spec-row">
                <span class="tech-tag">${p3.techAnnotation}</span>
              </div>
              <ul class="tech-bullet-list">
                ${p3.details.map((d: string) => `<li><span class="bullet-dot"></span><span>${d}</span></li>`).join('')}
              </ul>
              <p class="emotional-lesson serif italic">${p3.emotionalLesson}</p>
            </div>
          </div>
        </div>

        <!-- Sheet Footer with Title Block & Inspirational Closing -->
        <div class="sheet-footer-block">
          <p class="sheet-closing-marathi devanagari">
            "${ENGINEERING_CONTENT.closing}"
          </p>
        </div>
      </div>
    </section>
  `;
}

export function initBlueprint(): void {
  const section = document.getElementById('scene-blueprint');
  const sheet = document.getElementById('blueprint-drafting-sheet');
  const tabs = document.querySelectorAll<HTMLButtonElement>('.stage-tab-btn');
  const panels = document.querySelectorAll<HTMLElement>('.drawing-stage-panel');

  if (!section || !sheet) return;

  function switchStage(stageIndex: number) {
    tabs.forEach((tab, idx) => {
      const active = idx === stageIndex;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    panels.forEach((panel, idx) => {
      panel.classList.toggle('active', idx === stageIndex);
    });
  }

  // Tab click listeners
  tabs.forEach((tab) => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      const stage = parseInt(tab.dataset.stage || '0', 10);
      switchStage(stage);
    });
  });

  // Drafting table 3D tilt with phone / mouse
  onTilt(({ x, y }) => {
    const rotY = x * 4.5;
    const rotX = -y * 4.5;
    sheet.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
  });

  // Observe scroll to trigger SVG stroke reveals when drafting sheet enters view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Trigger SVG stroke reveals
        const activePanel = sheet.querySelector('.drawing-stage-panel.active');
        const paths = activePanel?.querySelectorAll<SVGGeometryElement>('.eng-line');
        paths?.forEach((el, index) => {
          const length = (el as any).getTotalLength ? (el as any).getTotalLength() : 240;
          el.style.strokeDasharray = `${length}`;
          el.style.strokeDashoffset = `${length}`;
          el.style.transition = `stroke-dashoffset 1.4s cubic-bezier(0.2, 0.8, 0.2, 1) ${index * 0.04}s`;
          requestAnimationFrame(() => {
            el.style.strokeDashoffset = '0';
          });
        });
      }
    });
  }, { threshold: 0.2 });

  observer.observe(section);
}
