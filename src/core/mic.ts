/**
 * mic.ts — Blow detection using AnalyserNode.
 * Low-frequency RMS + sustained threshold + room calibration.
 * Stops all mic tracks immediately after success.
 */

interface MicOptions {
  onBlow: () => void;
  onDenied?: () => void;
}

const SUSTAINED_MS   = 350;  // must blow for this long
const CALIBRATE_MS   = 1000; // first second = baseline
const BLOW_FREQ_MAX  = 400;  // Hz — blowing energy is below this
const THRESHOLD_MULT = 3.5;  // how many times above noise floor to count as blow

let _stream: MediaStream | null = null;
let _ctx: AudioContext | null = null;
let _animId = 0;

export async function startMicDetection(opts: MicOptions): Promise<void> {
  try {
    _stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch {
    opts.onDenied?.();
    return;
  }

  _ctx = new AudioContext();
  const source   = _ctx.createMediaStreamSource(_stream);
  const analyser = _ctx.createAnalyser();
  analyser.fftSize = 2048;

  source.connect(analyser);

  const bufLen = analyser.frequencyBinCount;
  const freqArr  = new Uint8Array(bufLen);    // frequency domain

  let noiseFloor    = 0;
  let calibrated    = false;
  let calibSamples: number[] = [];
  let blowStartMs   = 0;
  let triggered     = false;

  const startTime = performance.now();

  function getBlowEnergy(): number {
    analyser.getByteFrequencyData(freqArr);
    // Only look at low-frequency bins
    const nyquist    = _ctx!.sampleRate / 2;
    const binHz      = nyquist / bufLen;
    const maxBin     = Math.floor(BLOW_FREQ_MAX / binHz);
    let sum = 0;
    for (let i = 0; i < maxBin; i++) sum += freqArr[i] ** 2;
    return Math.sqrt(sum / maxBin);
  }

  function frame() {
    if (triggered) return;
    _animId = requestAnimationFrame(frame);

    const now    = performance.now();
    const energy = getBlowEnergy();

    // ── Phase 1: calibrate ──────────────────────────────────
    if (!calibrated) {
      calibSamples.push(energy);
      if (now - startTime >= CALIBRATE_MS) {
        const avg = calibSamples.reduce((a, b) => a + b, 0) / calibSamples.length;
        noiseFloor = avg;
        calibrated = true;
      }
      return;
    }

    // ── Phase 2: detect ────────────────────────────────────
    const threshold = noiseFloor * THRESHOLD_MULT;

    if (energy > threshold) {
      if (blowStartMs === 0) blowStartMs = now;
      if (now - blowStartMs >= SUSTAINED_MS) {
        triggered = true;
        stopMic();
        opts.onBlow();
      }
    } else {
      blowStartMs = 0; // reset if energy drops
    }
  }

  frame();
}

export function stopMic(): void {
  cancelAnimationFrame(_animId);
  _stream?.getTracks().forEach(t => t.stop());
  _stream = null;
  _ctx?.close();
  _ctx = null;
}
