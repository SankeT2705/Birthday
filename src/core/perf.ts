/**
 * perf.ts — Device tier detection.
 * Runs once at startup to choose High / Medium / Low quality settings.
 */

export type DeviceTier = 'high' | 'medium' | 'low';

interface PerfConfig {
  tier: DeviceTier;
  pixelRatio: number;
  shaderResolution: number; // 0–1 multiplier on renderer size
  lanternCount: number;
  enableBloom: boolean;
  enableBlur: boolean;
  parallaxLayers: boolean;
}

function detectTier(): DeviceTier {
  // Memory check (Chrome/Android)
  const mem = (navigator as any).deviceMemory as number | undefined;
  if (mem !== undefined && mem <= 2) return 'low';

  // Concurrency proxy
  const cores = navigator.hardwareConcurrency ?? 4;
  if (cores <= 2) return 'low';

  // Pixel ratio + screen size
  const dpr = window.devicePixelRatio ?? 1;
  const area = window.screen.width * window.screen.height;

  if (dpr >= 3 && area > 1_200_000 && cores >= 6) return 'high';
  if (dpr >= 2 || cores >= 4) return 'medium';
  return 'low';
}

function buildConfig(tier: DeviceTier): PerfConfig {
  switch (tier) {
    case 'high':
      return { tier, pixelRatio: Math.min(window.devicePixelRatio, 2), shaderResolution: 1, lanternCount: 12, enableBloom: true, enableBlur: true, parallaxLayers: true };
    case 'medium':
      return { tier, pixelRatio: Math.min(window.devicePixelRatio, 1.5), shaderResolution: 0.75, lanternCount: 8, enableBloom: false, enableBlur: true, parallaxLayers: true };
    case 'low':
    default:
      return { tier, pixelRatio: 1, shaderResolution: 0.6, lanternCount: 5, enableBloom: false, enableBlur: false, parallaxLayers: false };
  }
}

let _config: PerfConfig | null = null;

export function getPerfConfig(): PerfConfig {
  if (!_config) _config = buildConfig(detectTier());
  return _config;
}
