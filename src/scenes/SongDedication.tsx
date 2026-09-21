import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SceneShell } from '../components/SceneShell'
import { GoldButton } from '../components/ui'
import { content } from '../content'
import { playSoftClick } from '../lib/sounds'

export function SongDedication({ onNext }: { onNext: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.8)
  const [missing, setMissing] = useState(false)
  const [visibleLines, setVisibleLines] = useState(0)

  useEffect(() => {
    const timers = content.song.dedicationLines.map((_, i) =>
      window.setTimeout(() => setVisibleLines(i + 1), 700 + i * 1400),
    )
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => {
      if (!audio.duration) return
      setProgress(audio.currentTime / audio.duration)
    }
    const onEnd = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.pause()
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const toggle = async () => {
    const audio = audioRef.current
    if (!audio) return
    playSoftClick()
    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
        return
      }
      audio.volume = volume
      await audio.play()
      setPlaying(true)
      setMissing(false)
    } catch {
      setMissing(true)
      setPlaying(false)
    }
  }

  return (
    <SceneShell>
      <audio
        ref={audioRef}
        src={content.song.audioSrc}
        preload="none"
      />

      <p className="text-[11px] tracking-[0.32em] text-[var(--gold)] uppercase">
        {content.song.kicker}
      </p>
      <h2 className="mt-3 font-serif text-3xl text-[var(--ivory)] sm:text-5xl">
        {content.song.title}
      </h2>
      <p className="mt-2 text-sm text-[var(--blush)]">{content.song.artist}</p>

      <div className="relative mt-8 h-36 w-36">
        <div
          className={`vinyl-disc h-full w-full rounded-full border border-[var(--gold)]/40 ${playing ? '' : 'paused'}`}
          style={{
            background: `
              radial-gradient(circle at 50% 50%, #1a1014 0 18%, transparent 19%),
              repeating-radial-gradient(circle at 50% 50%, #24141b 0 2px, #1a0f14 3px, #2a1820 5px)
            `,
            boxShadow: '0 0 40px rgba(201,123,132,0.28)',
          }}
        >
          <div className="absolute top-1/2 left-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--rose)]/80" />
        </div>
      </div>

      <div className="mt-8 min-h-[108px] max-w-md space-y-3 text-center">
        {content.song.dedicationLines.map((line, i) => (
          <motion.p
            key={line}
            className="font-serif text-lg italic text-[var(--champagne)] sm:text-xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: i < visibleLines ? 1 : 0, y: i < visibleLines ? 0 : 8 }}
            transition={{ duration: 0.8 }}
          >
            {line}
          </motion.p>
        ))}
      </div>

      <div className="mt-8 flex w-full max-w-sm items-center gap-3">
        <button
          type="button"
          onClick={() => void toggle()}
          className="gold-btn flex h-11 w-11 items-center justify-center rounded-full text-sm"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? '❚❚' : '▶'}
        </button>
        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-[var(--blush)]"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.02}
          value={volume}
          aria-label="Volume"
          className="w-16 accent-[var(--gold)]"
          onChange={(e) => {
            const v = Number(e.target.value)
            setVolume(v)
            if (audioRef.current) audioRef.current.volume = v
          }}
        />
      </div>

      <div className="mt-3 flex h-6 items-end justify-center gap-1">
        {Array.from({ length: 12 }, (_, i) => (
          <span
            key={i}
            className="music-bar w-1 rounded-full bg-[var(--gold)]/80"
            style={{
              height: playing ? `${8 + ((i * 37) % 16)}px` : '4px',
              animation: playing ? `flicker ${0.28 + (i % 4) * 0.08}s infinite alternate` : 'none',
            }}
          />
        ))}
      </div>

      {missing ? (
        <p className="mt-3 max-w-xs text-center text-[11px] leading-relaxed text-[var(--champagne)]/55">
          Add your song file at <span className="text-[var(--gold)]">public/audio/dedication.mp3</span> when you have it.
        </p>
      ) : null}

      <div className="mt-8">
        <GoldButton onClick={onNext}>{content.song.continueLabel}</GoldButton>
      </div>
    </SceneShell>
  )
}
