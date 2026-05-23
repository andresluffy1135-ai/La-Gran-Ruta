// Sound system using native Web Audio API for Retro GBA/Minish Cap sound effects
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playSound(type: 'punch' | 'gatling' | 'whip' | 'dash' | 'hit' | 'pickup' | 'unlock' | 'victory' | 'gameover') {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    switch (type) {
      case 'punch': {
        // High pitch sweep down with speed for Luffy's stretch GUM-GUM PISTOL
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(100, now + 0.15);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.15);

        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }
      case 'gatling': {
        // Multiple rapid punch noises
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'square';
          osc.frequency.setValueAtTime(450 - i * 50, now + i * 0.06);
          osc.frequency.exponentialRampToValueAtTime(80, now + i * 0.06 + 0.05);

          gain.gain.setValueAtTime(0.15, now + i * 0.06);
          gain.gain.linearRampToValueAtTime(0.01, now + i * 0.06 + 0.05);

          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.05);
        }
        break;
      }
      case 'whip': {
        // High frequency wash sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);

        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }
      case 'dash': {
        // Simple GBA roll/dash whoosh
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(200, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.1);

        gain.gain.setValueAtTime(0.15, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.12);

        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }
      case 'hit': {
        // Thick crash sound (Luffy taking damage or hitting hard barriers)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, now);
        osc.frequency.linearRampToValueAtTime(30, now + 0.2);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.25);

        osc.start(now);
        osc.stop(now + 0.25);
        break;
      }
      case 'pickup': {
        // Shiny coin/heart ping melody (Minish Cap treasure chest item find!)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.type = 'sine';
        osc2.type = 'triangle';

        // Arpeggio C5 (523Hz) then E5 (659Hz) then G5 (784Hz) then C6 (1046Hz)
        osc1.frequency.setValueAtTime(523, now);
        osc1.frequency.setValueAtTime(659, now + 0.08);
        osc1.frequency.setValueAtTime(784, now + 0.16);
        osc1.frequency.setValueAtTime(1046, now + 0.24);

        osc2.frequency.setValueAtTime(1046, now + 0.24);

        gain.gain.setValueAtTime(0.25, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.4);

        osc1.start(now);
        osc1.stop(now + 0.4);
        osc2.start(now + 0.24);
        osc2.stop(now + 0.4);
        break;
      }
      case 'unlock': {
        // Mechanical stone rumble and shiny chime (glorious Zelda door open!)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.setValueAtTime(330, now + 0.1);
        osc.frequency.setValueAtTime(440, now + 0.2);
        osc.frequency.setValueAtTime(554, now + 0.3);

        gain.gain.setValueAtTime(0.3, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.5);

        osc.start(now);
        osc.stop(now + 0.5);
        break;
      }
      case 'victory': {
        // High fidelity upbeat victory fan-fare: GUM-GUM SUCCESS
        const notes = [261, 329, 392, 523, 659, 784, 1046]; // Arpeggio major chords
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.type = 'square';
          osc.frequency.setValueAtTime(freq, now + idx * 0.1);

          gain.gain.setValueAtTime(0.15, now + idx * 0.1);
          gain.gain.linearRampToValueAtTime(0.01, now + idx * 0.1 + 0.3);

          osc.start(now + idx * 0.1);
          osc.stop(now + idx * 0.1 + 0.3);
        });
        break;
      }
      case 'gameover': {
        // Tragic retro dying tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(55, now + 0.8);

        gain.gain.setValueAtTime(0.4, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.8);

        osc.start(now);
        osc.stop(now + 0.8);
        break;
      }
    }
  } catch (error) {
    console.warn("Audio Context blocked or failed to initialize", error);
  }
}
