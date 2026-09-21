import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SceneShell } from '../components/SceneShell'
import { HeartSvg } from '../components/ui'
import { content } from '../content'
import { playHeartCatch } from '../lib/sounds'

type Heart = {
  id: number
  x: number
  y: number
  size: number
  drift: number
  duration: number
  hue: string
  born: number
  ttl: number
}

type Burst = { id: number; x: number; y: number }

let heartSeq = 1
let burstSeq = 1

function spawnHeart(): Heart {
  const sizes = [52, 60, 70, 82]
  const hues = ['#F2C9CC', '#E8B4B8', '#E39AA3', '#E8C9A0']
  return {
    id: heartSeq++,
    x: 10 + Math.random() * 80,
    y: 28 + Math.random() * 54,
    size: sizes[Math.floor(Math.random() * sizes.length)] ?? 56,
    drift: (Math.random() - 0.5) * 40,
    duration: 4.2 + Math.random() * 2.4,
    hue: hues[Math.floor(Math.random() * hues.length)] ?? '#E8B4B8',
    born: Date.now(),
    ttl: 4200 + Math.random() * 1800,
  }
}

export function HeartGame({ onNext }: { onNext: () => void }) {
  const needed = content.game.needed
  const [caught, setCaught] = useState(0)
  const [hearts, setHearts] = useState<Heart[]>(() => [spawnHeart(), spawnHeart(), spawnHeart()])
  const [bursts, setBursts] = useState<Burst[]>([])
  const caughtRef = useRef(0)
  const finishing = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      if (finishing.current) return
      const now = Date.now()
      setHearts((prev) => {
        const alive = prev.filter((h) => now - h.born < h.ttl)
        if (alive.length >= 3) return alive
        return [...alive, spawnHeart()]
      })
    }, 500)
    return () => window.clearInterval(id)
  }, [])

  const catchHeart = (heart: Heart) => {
    if (finishing.current) return
    playHeartCatch()
    if (navigator.vibrate) navigator.vibrate(12)
    setHearts((prev) => prev.filter((h) => h.id !== heart.id))
    setBursts((prev) => [...prev, { id: burstSeq++, x: heart.x, y: heart.y }])
    caughtRef.current += 1
    const next = caughtRef.current
    setCaught(next)
    if (next >= needed) {
      finishing.current = true
      window.setTimeout(onNext, 650)
    }
  }

  return (
    <SceneShell>
      <div className="pointer-events-none absolute inset-x-0 top-6 z-20 text-center sm:top-8">
        <h2 className="font-serif text-3xl text-[var(--ivory)] sm:text-4xl">
          {content.game.title}
        </h2>
        <p className="mt-2 text-sm text-[var(--champagne)]/80">{content.game.instruction}</p>
        <p className="mt-4 text-[11px] tracking-[0.28em] text-[var(--gold)]">
          {content.game.counterLabel}: {caught} / {needed}
        </p>
        <div className="mx-auto mt-3 h-1 w-44 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-[var(--blush)]"
            animate={{ width: `${(caught / needed) * 100}%` }}
          />
        </div>
      </div>

      <div className="absolute inset-0">
        <AnimatePresence>
          {hearts.map((heart) => (
            <motion.button
              key={heart.id}
              type="button"
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer touch-manipulation rounded-full"
              aria-label="Catch heart"
              style={{
                left: `${heart.x}%`,
                top: `${heart.y}%`,
                width: heart.size,
                height: heart.size,
                color: heart.hue,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                x: [0, heart.drift, 0],
                y: [0, -18, 8, 0],
              }}
              exit={{ scale: 1.45, opacity: 0, transition: { duration: 0.28 } }}
              transition={{
                scale: { duration: 0.25 },
                opacity: { duration: 0.25 },
                x: { duration: heart.duration, repeat: Infinity, ease: 'easeInOut' },
                y: { duration: heart.duration, repeat: Infinity, ease: 'easeInOut' },
              }}
              onClick={() => catchHeart(heart)}
            >
              <HeartSvg className="h-full w-full drop-shadow-[0_0_16px_rgba(232,180,184,0.95)]" />
            </motion.button>
          ))}
        </AnimatePresence>

        {bursts.map((b) => (
          <Burst key={b.id} x={b.x} y={b.y} onDone={() => setBursts((p) => p.filter((x) => x.id !== b.id))} />
        ))}
      </div>
    </SceneShell>
  )
}

function Burst({ x, y, onDone }: { x: number; y: number; onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 500)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {Array.from({ length: 6 }, (_, i) => (
        <motion.span
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full bg-[var(--champagne)]"
          initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
          animate={{
            opacity: 0,
            x: Math.cos((i / 6) * Math.PI * 2) * 28,
            y: Math.sin((i / 6) * Math.PI * 2) * 28,
            scale: 0.3,
          }}
          transition={{ duration: 0.45 }}
        />
      ))}
    </div>
  )
}
