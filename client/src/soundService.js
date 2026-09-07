class SoundManager {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.volume = 0.5;

    if (typeof window !== 'undefined') {
      const savedMute = window.localStorage.getItem('cosbia_quiz_muted');
      if (savedMute !== null) {
        this.isMuted = savedMute === 'true';
      }

      const savedVol = window.localStorage.getItem('cosbia_quiz_volume');
      if (savedVol !== null) {
        const parsed = Number.parseFloat(savedVol);
        if (!Number.isNaN(parsed)) {
          this.volume = Math.max(0, Math.min(1, parsed));
        }
      }
    }
  }

  notifyMuteState() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sound:mute-change'));
    }
  }

  initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cosbia_quiz_muted', String(this.isMuted));
    }

    if (this.isMuted && this.bgmPlaying) {
      this.stopBgm();
    }

    this.notifyMuteState();
    return this.isMuted;
  }

  getIsMuted() {
    return this.isMuted;
  }

  setVolume(value) {
    this.volume = Math.max(0, Math.min(1, Number(value) || 0));
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cosbia_quiz_volume', String(this.volume));
    }
  }

  getVolume() {
    return this.volume;
  }

  getIsBgmPlaying() {
    return this.bgmPlaying;
  }

  playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.15 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const now = this.ctx.currentTime;
    osc.frequency.setValueAtTime(400, now);

    gain.gain.setValueAtTime(0.03 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }

  playCorrect() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const startTime = now + idx * 0.08;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.25 * this.volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  playWrong() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.25);

    gain.gain.setValueAtTime(0.2 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }

  playXpGain() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.08);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3 * this.volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playStreak() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [587.33, 739.99, 880, 1174.66, 1479.98];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const startTime = now + idx * 0.06;
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2 * this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  playBotBlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const blipsCount = 3;

    for (let i = 0; i < blipsCount; i += 1) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      const pitch = 500 + Math.random() * 400;
      const startTime = now + i * 0.06;

      osc.frequency.setValueAtTime(pitch, startTime);
      gain.gain.setValueAtTime(0.08 * this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.04);
    }
  }

  playNext() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.08);

    gain.gain.setValueAtTime(0.12 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  playVictory() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const arpeggio = [
      { f: 523.25, t: 0 },
      { f: 659.25, t: 0.12 },
      { f: 783.99, t: 0.24 },
      { f: 1046.5, t: 0.36 },
      { f: 880.0, t: 0.5 },
      { f: 1046.5, t: 0.62 },
      { f: 1318.51, t: 0.76 },
    ];

    const now = this.ctx.currentTime;

    arpeggio.forEach(({ f, t }) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      const startTime = now + t;
      osc.frequency.setValueAtTime(f, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3 * this.volume, startTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  }

  toggleBgm() {
    if (this.bgmPlaying) {
      this.stopBgm();
      return false;
    }

    this.startBgm();
    return true;
  }

  startBgm() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    this.stopBgm();
    this.bgmPlaying = true;

    const notes = [
      261.63, 329.63, 392.0, 523.25,
      392.0, 329.63, 261.63, 196.0,
      220.0, 261.63, 329.63, 440.0,
      392.0, 329.63, 293.66, 261.63,
    ];
    let step = 0;

    const playStep = () => {
      if (!this.bgmPlaying || this.isMuted || !this.ctx) return;

      const freq = notes[step % notes.length];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.04 * this.volume, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.28);

      step += 1;
    };

    playStep();
    this.bgmInterval = window.setInterval(playStep, 320);
  }

  stopBgm() {
    this.bgmPlaying = false;
    if (this.bgmInterval !== null) {
      window.clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  playSparkle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [659.25, 783.99, 1046.5, 1174.66];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startTime = now + idx * 0.06;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.12 * this.volume, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.18);
    });
  }

  playBubble() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);

    gain.gain.setValueAtTime(0.08 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);
  }

  playShield() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const notes = [392.0, 523.25, 659.25, 783.99];
    const now = this.ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      const startTime = now + idx * 0.09;
      osc.frequency.setValueAtTime(freq, startTime);
      gain.gain.setValueAtTime(0.12 * this.volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(startTime);
      osc.stop(startTime + 0.22);
    });
  }

  playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.18);

    gain.gain.setValueAtTime(0.1 * this.volume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }
}

export const soundManager = new SoundManager();
