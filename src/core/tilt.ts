/**
 * tilt.ts — Gyroscope and pointer parallax.
 * Normalises input from DeviceOrientation OR pointer movement to a
 * unified { x, y } in the range [-1, 1] with linear interpolation.
 * Exposes an observer subscription `onTilt()` for components like 3D polaroids,
 * the Ashoka Chakra, and atmospheric layers.
 */

interface TiltState {
  x: number; // -1 = left tilt,  +1 = right tilt
  y: number; // -1 = top tilt,   +1 = bottom tilt
  _rawX: number;
  _rawY: number;
}

type TiltListener = (tilt: { x: number; y: number }) => void;

const MAX_TILT_DEG = 14; // clamp to ±14°
const LERP_FACTOR  = 0.08; // smooth interpolation

const state: TiltState = { x: 0, y: 0, _rawX: 0, _rawY: 0 };
const listeners = new Set<TiltListener>();

let _gyroEnabled = false;
let _rafId = 0;
let _initialized = false;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function tick() {
  state.x = lerp(state.x, state._rawX, LERP_FACTOR);
  state.y = lerp(state.y, state._rawY, LERP_FACTOR);

  // Notify active listeners
  for (const listener of listeners) {
    try {
      listener({ x: state.x, y: state.y });
    } catch (e) {
      console.warn('[Tilt error]', e);
    }
  }

  _rafId = requestAnimationFrame(tick);
}

/** Subscribe to smoothed tilt updates */
export function onTilt(callback: TiltListener): () => void {
  listeners.add(callback);
  // Initial immediate call with current state
  callback({ x: state.x, y: state.y });
  return () => {
    listeners.delete(callback);
  };
}

/** Call from the gate tap. Requests iOS permission if needed. */
export async function initTilt(): Promise<void> {
  if (_initialized) return;
  _initialized = true;

  // iOS requires explicit permission from a user gesture
  if (
    typeof (DeviceOrientationEvent as any)?.requestPermission === 'function'
  ) {
    try {
      const res = await (DeviceOrientationEvent as any).requestPermission();
      if (res === 'granted') enableGyro();
      else enablePointer();
    } catch {
      enablePointer();
    }
  } else if (window.DeviceOrientationEvent && ('ontouchstart' in window)) {
    enableGyro();
    // Also listen to touch moves as backup
    window.addEventListener('touchmove', onTouch, { passive: true });
  } else {
    enablePointer();
  }

  // Pointer move is always good as a fallback on desktop
  window.addEventListener('pointermove', onPointer, { passive: true });

  tick();
}

function enableGyro() {
  _gyroEnabled = true;
  window.addEventListener('deviceorientation', onOrientation, { passive: true });
}

function enablePointer() {
  _gyroEnabled = false;
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('touchmove', onTouch, { passive: true });
}

function onOrientation(e: DeviceOrientationEvent) {
  const gamma = e.gamma ?? 0; // left-right, degrees
  const beta  = e.beta  ?? 0; // front-back, degrees

  state._rawX = clamp(gamma / MAX_TILT_DEG, -1, 1);
  state._rawY = clamp((beta - 45) / MAX_TILT_DEG, -1, 1); // 45° is neutral portrait hold
}

function onPointer(e: PointerEvent) {
  state._rawX = clamp((e.clientX / window.innerWidth  - 0.5) * 2, -1, 1);
  state._rawY = clamp((e.clientY / window.innerHeight - 0.5) * 2, -1, 1);
}

function onTouch(e: TouchEvent) {
  if (e.touches.length > 0) {
    const t = e.touches[0];
    state._rawX = clamp((t.clientX / window.innerWidth  - 0.5) * 2, -1, 1);
    state._rawY = clamp((t.clientY / window.innerHeight - 0.5) * 2, -1, 1);
  }
}

/** Returns whether gyroscope orientation is currently active */
export function isGyroActive(): boolean {
  return _gyroEnabled;
}

/** Returns the current smoothed tilt {x, y} in range [-1, 1]. */
export function getTilt(): { x: number; y: number } {
  return { x: state.x, y: state.y };
}

export function destroyTilt() {
  cancelAnimationFrame(_rafId);
  listeners.clear();
  window.removeEventListener('deviceorientation', onOrientation);
  window.removeEventListener('pointermove', onPointer);
  window.removeEventListener('touchmove', onTouch);
  _initialized = false;
}
