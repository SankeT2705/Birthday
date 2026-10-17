/**
 * audio.ts — Web Audio Synthesizer & Sound Manager for "Her Shore".
 * Fully self-contained Web Audio API synthesis:
 * - Natural sea wave murmur with periodic swells and spray
 * - Soft piano / chime melody fading in after gate unlock
 * - Interactive melodic tones for spokes, bottles, and lanterns
 * - Celebration fanfare arpeggio for blowing out the candle
 * - Subtle morning birdsong synthesized at sunrise
 * - Tab visibility change listener (pauses audio when tab is backgrounded)
 * - Zero external mp3 dependencies (100% resilient and offline-ready)
 */

export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isPlaying = false;
  private unlocked = false;

  // Sea wave nodes
  private seaGain: GainNode | null = null;
  private seaFilter: BiquadFilterNode | null = null;
  private seaSource: AudioBufferSourceNode | null = null;
  private seaSwellInterval: number | null = null;

  // Melodic sequence timers
  private melodyInterval: number | null = null;
  private birdInterval: number | null = null;
  private pianoStartTimeout: number | null = null;

  /** Initialize the AudioContext on user gesture */
  private initContext(): AudioContext | null {
    if (this.ctx) return this.ctx;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.55, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Auto-pause when tab is hidden to save battery & respect user
      document.addEventListener('visibilitychange', () => {
        if (!this.ctx) return;
        if (document.hidden) {
          if (this.ctx.state === 'running') this.ctx.suspend();
        } else {
          if (this.isPlaying && this.ctx.state === 'suspended') {
            this.ctx.resume();
          }
        }
      });
      return this.ctx;
    } catch (e) {
      console.warn('[Her Shore Audio] Web Audio not supported:', e);
      return null;
    }
  }

  /** Call on Gate tap to unlock audio context & begin coastal soundscape */
  async unlock(): Promise<boolean> {
    if (this.unlocked) return true;
    this.initContext();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    this.unlocked = true;
    this.isPlaying = true;

    // 1. Crossfade in sea waves over 3 seconds
    this.startSeaAmbience(3.0);

    // 2. Fade in soft piano/chime melody after 6 seconds
    this.pianoStartTimeout = window.setTimeout(() => {
      if (this.isPlaying) this.startPianoMelody();
    }, 6000);

    return true;
  }

  /** Toggle sound on/off (Sound button in header) */
  toggle(): boolean {
    if (!this.unlocked) {
      this.unlock();
      return true;
    }

    this.initContext();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  get active(): boolean {
    return this.isPlaying;
  }

  private start() {
    this.isPlaying = true;
    this.startSeaAmbience(1.5);
    this.startPianoMelody();
  }

  private stop() {
    this.isPlaying = false;
    if (this.seaSwellInterval) {
      clearInterval(this.seaSwellInterval);
      this.seaSwellInterval = null;
    }
    if (this.melodyInterval) {
      clearInterval(this.melodyInterval);
      this.melodyInterval = null;
    }
    if (this.birdInterval) {
      clearInterval(this.birdInterval);
      this.birdInterval = null;
    }
    if (this.pianoStartTimeout) {
      clearTimeout(this.pianoStartTimeout);
      this.pianoStartTimeout = null;
    }
    if (this.seaSource) {
      try {
        this.seaSource.stop();
        this.seaSource.disconnect();
      } catch {}
      this.seaSource = null;
    }
    if (this.seaGain && this.ctx) {
      this.seaGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);
    }
  }

  /** Natural ocean surf murmur with periodic swells */
  private startSeaAmbience(fadeSec = 3.0) {
    if (!this.ctx || !this.masterGain) return;
    try {
      const bufferSize = this.ctx.sampleRate * 3;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Pink/Brownian noise for deep ocean rumble
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        lastOut = (lastOut + 0.025 * white) / 1.025;
        data[i] = lastOut * 3.8;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(260, this.ctx.currentTime);

      const seaGain = this.ctx.createGain();
      const now = this.ctx.currentTime;
      seaGain.gain.setValueAtTime(0.001, now);
      seaGain.gain.linearRampToValueAtTime(0.12, now + fadeSec);

      noise.connect(filter);
      filter.connect(seaGain);
      seaGain.connect(this.masterGain);

      noise.start();
      this.seaSource = noise;
      this.seaFilter = filter;
      this.seaGain = seaGain;

      // Swelling rhythm (simulating waves breaking on Konkan shore)
      const swell = () => {
        if (!this.isPlaying || !this.ctx || !this.seaGain || !this.seaFilter) return;
        const cur = this.ctx.currentTime;
        // Rising surge
        this.seaGain.gain.linearRampToValueAtTime(0.18, cur + 3.2);
        this.seaFilter.frequency.linearRampToValueAtTime(540, cur + 3.2);
        // Receding back into the sea
        this.seaGain.gain.linearRampToValueAtTime(0.07, cur + 7.5);
        this.seaFilter.frequency.linearRampToValueAtTime(280, cur + 7.5);
      };

      swell();
      this.seaSwellInterval = window.setInterval(swell, 8000);
    } catch (e) {
      console.warn('[Her Shore Audio] Error creating sea ambience:', e);
    }
  }

  /** Soft piano / chime melody with warm harmonics */
  private startPianoMelody() {
    if (this.melodyInterval) return;

    // Pentatonic scale notes evoking peaceful shores
    const chordSets = [
      [261.63, 329.63, 392.00, 523.25, 659.25], // C major
      [293.66, 369.99, 440.00, 587.33, 739.99], // D major
      [220.00, 261.63, 329.63, 440.00, 523.25], // A minor
      [196.00, 246.94, 293.66, 392.00, 493.88], // G major
    ];
    let chordIdx = 0;

    const playPhrase = () => {
      if (!this.isPlaying || !this.ctx) return;
      const currentChord = chordSets[chordIdx % chordSets.length];
      chordIdx++;

      // Play 2-3 gentle notes in sequence
      const numNotes = Math.random() > 0.4 ? 2 : 3;
      for (let i = 0; i < numNotes; i++) {
        const note = currentChord[Math.floor(Math.random() * currentChord.length)];
        const delay = i * (0.35 + Math.random() * 0.25);
        this.playTone(note, 2.6, delay, 0.08);
      }
    };

    playPhrase();
    this.melodyInterval = window.setInterval(playPhrase, 3600);
  }

  /** Synthesize warm melodic tone */
  playTone(freq: number, duration = 1.4, delay = 0, vol = 0.15) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime + delay;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const toneGain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm sub-harmonic overtone
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(freq * 0.5, now);

    // Gentle acoustic attack and decay
    toneGain.gain.setValueAtTime(0, now);
    toneGain.gain.linearRampToValueAtTime(vol, now + 0.06);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(toneGain);
    subOsc.connect(toneGain);
    toneGain.connect(this.masterGain);

    osc.start(now);
    subOsc.start(now);
    osc.stop(now + duration + 0.1);
    subOsc.stop(now + duration + 0.1);
  }

  /** Play celebration fanfare when the candle is extinguished */
  playCelebrationChime() {
    this.initContext();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    // Happy Birthday celebratory arpeggio: C4, E4, G4, B4, C5, E5, G5
    const notes = [261.63, 329.63, 392.00, 493.88, 523.25, 659.25, 783.99, 1046.50];
    notes.forEach((freq, idx) => {
      this.playTone(freq, 2.4, idx * 0.14, 0.22);
    });
  }

  /** Enable delicate morning birdsong as sunrise arrives */
  enableSunriseAmbience() {
    if (this.birdInterval || !this.isPlaying) return;

    const chirp = () => {
      if (!this.isPlaying || !this.ctx || !this.masterGain) return;
      const baseFreq = 2200 + Math.random() * 800;
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, now);
      osc.frequency.linearRampToValueAtTime(baseFreq + 600, now + 0.08);
      osc.frequency.linearRampToValueAtTime(baseFreq + 200, now + 0.16);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.25);
    };

    chirp();
    this.birdInterval = window.setInterval(chirp, 5000 + Math.random() * 4000);
  }
}

export const birthdayAudio = new AudioManager();
export const audio = birthdayAudio;
