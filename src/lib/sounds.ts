let ctx: AudioContext | null = null

export function unlockAudio() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext
    if (!AudioCtx) return
    ctx = ctx ?? new AudioCtx()
    if (ctx.state === 'suspended') {
      void ctx.resume().catch(() => undefined)
    }
  } catch {
    ctx = null
  }
}

function getCtx() {
  if (!ctx) unlockAudio()
  return ctx
}

function tone(opts: {
  freq: number
  duration: number
  type?: OscillatorType
  gain?: number
  freqEnd?: number
}) {
  try {
    const audio = getCtx()
    if (!audio) return
    const now = audio.currentTime
    const osc = audio.createOscillator()
    const g = audio.createGain()
    osc.type = opts.type ?? 'sine'
    osc.frequency.setValueAtTime(opts.freq, now)
    if (opts.freqEnd) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(opts.freqEnd, 1),
        now + opts.duration,
      )
    }
    const vol = opts.gain ?? 0.04
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(vol, now + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, now + opts.duration)
    osc.connect(g)
    g.connect(audio.destination)
    osc.start(now)
    osc.stop(now + opts.duration + 0.05)
  } catch {
    /* UI sounds are optional */
  }
}

export function playSoftClick() {
  tone({ freq: 620, duration: 0.08, type: 'triangle', gain: 0.03 })
}

export function playWhoosh() {
  tone({ freq: 280, freqEnd: 90, duration: 0.32, type: 'sine', gain: 0.03 })
}

export function playHeartCatch() {
  tone({ freq: 520, duration: 0.12, type: 'sine', gain: 0.045 })
  window.setTimeout(() => {
    tone({ freq: 780, duration: 0.16, type: 'triangle', gain: 0.03 })
  }, 50)
}

export function playSparkle() {
  tone({ freq: 880, duration: 0.14, type: 'sine', gain: 0.025 })
  tone({ freq: 1320, duration: 0.18, type: 'triangle', gain: 0.018 })
}

export function playSuccess() {
  tone({ freq: 392, duration: 0.16, type: 'sine', gain: 0.04 })
  window.setTimeout(() => tone({ freq: 523, duration: 0.18, type: 'sine', gain: 0.04 }), 90)
  window.setTimeout(() => tone({ freq: 659, duration: 0.28, type: 'triangle', gain: 0.035 }), 180)
}

export function playDodge() {
  tone({ freq: 240, freqEnd: 180, duration: 0.1, type: 'triangle', gain: 0.025 })
}
