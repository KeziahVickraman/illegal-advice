/**
 * In-browser Web Audio API sound synthesizers for "Not Guilty-ish Legal" sitcom effects.
 * Synthesizes laugh tracks, gavel strikes, retro telephone rings, and cash register ka-chings.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Synthesizes a comedic sitcom chuckle/laugh track burst.
 */
export function playLaughTrack() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Create a series of staggered "ha ha ha" formant chuckles
  const pitches = [240, 260, 220, 250, 230, 270, 210, 240];
  pitches.forEach((freq, i) => {
    const startTime = now + i * 0.12 + (Math.random() * 0.04);
    const duration = 0.16;

    // Dual oscillator for human vocal chord emulation
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc1.type = "sawtooth";
    osc2.type = "triangle";
    osc1.frequency.setValueAtTime(freq, startTime);
    osc1.frequency.exponentialRampToValueAtTime(freq * 0.85, startTime + duration);
    osc2.frequency.setValueAtTime(freq * 1.01, startTime);

    // Formant vocal filter
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(650 + (i % 3) * 150, startTime);
    filter.Q.setValueAtTime(3.5, startTime);

    // Volume envelope
    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(0.12, startTime + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(startTime);
    osc2.start(startTime);
    osc1.stop(startTime + duration + 0.05);
    osc2.stop(startTime + duration + 0.05);
  });

  // Add subtle clapping burst for sitcom applause/cheer
  for (let c = 0; c < 12; c++) {
    const clapTime = now + 0.4 + Math.random() * 0.8;
    const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.05, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let j = 0; j < noiseBuffer.length; j++) {
      output[j] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const clapFilter = ctx.createBiquadFilter();
    clapFilter.type = "bandpass";
    clapFilter.frequency.setValueAtTime(1000 + Math.random() * 500, clapTime);
    clapFilter.Q.setValueAtTime(2.0, clapTime);

    const clapGain = ctx.createGain();
    clapGain.gain.setValueAtTime(0.04, clapTime);
    clapGain.gain.exponentialRampToValueAtTime(0.001, clapTime + 0.05);

    whiteNoise.connect(clapFilter);
    clapFilter.connect(clapGain);
    clapGain.connect(ctx.destination);

    whiteNoise.start(clapTime);
    whiteNoise.stop(clapTime + 0.06);
  }
}

/**
 * Synthesizes a courtroom gavel strike: a resonant wooden crack.
 */
export function playGavel() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  // Impact thump
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(45, now + 0.12);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.22);

  // Wood crack transient
  const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.008));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.3, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
  noise.stop(now + 0.06);
}

/**
 * Synthesizes a classic retro cash register 'ka-ching' bell.
 */
export function playKaChing() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  [1046.5, 1567.98, 2093.0].forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now + index * 0.05);
    gain.gain.setValueAtTime(0.2, now + index * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.05 + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now + index * 0.05);
    osc.stop(now + index * 0.05 + 0.65);
  });
}

/**
 * Synthesizes an old-fashioned strip-mall rotary phone ring burst.
 */
export function playPhoneRing() {
  const ctx = getAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;

  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  // Dual tone frequency standard (US 440Hz + 480Hz)
  osc1.type = "sine";
  osc2.type = "sine";
  osc1.frequency.setValueAtTime(440, now);
  osc2.frequency.setValueAtTime(480, now);

  gain.gain.setValueAtTime(0.15, now);
  gain.gain.setValueAtTime(0.15, now + 0.4);
  gain.gain.setValueAtTime(0.001, now + 0.41);
  gain.gain.setValueAtTime(0.15, now + 0.6);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.15);
  osc2.stop(now + 1.15);
}
