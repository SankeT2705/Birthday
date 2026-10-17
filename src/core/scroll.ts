/**
 * scroll.ts — Lenis smooth scroll + GSAP ScrollTrigger integration.
 * Exposes a scene manager with enter / leave / progress(p) contracts.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface Scene {
  id: string;
  enter(): void;
  leave(): void;
  progress(p: number): void;
}

let lenis: Lenis;
const scenes: Map<string, Scene> = new Map();

export function initScroll(): void {
  lenis = new Lenis({
    duration: 1.4,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
  });

  // Feed Lenis into GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  // Sync ScrollTrigger with Lenis
  lenis.on('scroll', ScrollTrigger.update);

  // Progress bar
  const progressBar = document.getElementById('scroll-progress');
  lenis.on('scroll', ({ progress }: { progress: number }) => {
    if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  });
}

export function registerScene(scene: Scene): void {
  scenes.set(scene.id, scene);
}

/**
 * Create a ScrollTrigger for a scene element.
 * Calls scene.enter(), scene.leave(), and scene.progress(p).
 */
export function bindScene(
  scene: Scene,
  trigger: string | Element,
  start = 'top top',
  end   = 'bottom top',
): ScrollTrigger {
  return ScrollTrigger.create({
    trigger,
    start,
    end,
    scrub: 1.5,
    onEnter:     () => scene.enter(),
    onLeave:     () => scene.leave(),
    onEnterBack: () => scene.enter(),
    onLeaveBack: () => scene.leave(),
    onUpdate: (self) => scene.progress(self.progress),
  });
}

/** Scroll smoothly to a scene element. */
export function scrollToScene(selector: string): void {
  const el = document.querySelector(selector) as HTMLElement | null;
  if (el) {
    if (lenis) {
      lenis.scrollTo(el, { offset: 0, duration: 2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

export function getLenis(): Lenis { return lenis; }
