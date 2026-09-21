import { motion } from 'framer-motion'
import { useMemo } from 'react'
import type { AmbientMood } from '../content'
import { HeartSvg } from './ui'

const moodTint: Record<AmbientMood, string> = {
  dawn: 'radial-gradient(ellipse at 50% 0%, rgba(243,230,200,0.22), transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(232,180,184,0.16), transparent 45%)',
  playful:
    'radial-gradient(ellipse at 20% 20%, rgba(232,180,184,0.2), transparent 50%), radial-gradient(ellipse at 90% 70%, rgba(201,168,108,0.12), transparent 45%)',
  cinematic:
    'radial-gradient(ellipse at 50% 40%, rgba(107,36,54,0.45), transparent 55%), radial-gradient(ellipse at 50% 100%, rgba(20,12,18,0.8), transparent 50%)',
  warm: 'radial-gradient(ellipse at 30% 10%, rgba(243,230,200,0.18), transparent 50%), radial-gradient(ellipse at 70% 90%, rgba(107,36,54,0.28), transparent 50%)',
  night:
    'radial-gradient(ellipse at 20% 80%, rgba(74,44,69,0.4), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,123,132,0.16), transparent 45%)',
  festive:
    'radial-gradient(ellipse at 50% 0%, rgba(201,168,108,0.22), transparent 50%), radial-gradient(ellipse at 10% 90%, rgba(232,180,184,0.18), transparent 45%)',
  paper:
    'radial-gradient(ellipse at 50% 40%, rgba(243,230,200,0.14), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(232,180,184,0.12), transparent 50%)',
}

type Particle = {
  id: number
  left: string
  top: string
  size: number
  delay: number
  duration: number
  opacity: number
}

type Floater = {
  id: number
  left: string
  size: number
  delay: number
  duration: number
  opacity: number
}

export function AmbientBackground({ mood }: { mood: AmbientMood }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1.5 + (i % 4),
        delay: (i % 7) * 0.4,
        duration: 7 + (i % 6),
        opacity: 0.15 + (i % 5) * 0.06,
      })),
    [],
  )

  const hearts = useMemo<Floater[]>(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: `${8 + i * 12}%`,
        size: 10 + (i % 3) * 4,
        delay: i * 1.1,
        duration: 14 + i * 1.4,
        opacity: 0.12 + (i % 3) * 0.05,
      })),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            ${moodTint[mood]},
            linear-gradient(165deg, var(--dusk) 0%, var(--night) 42%, var(--burgundy) 100%)
          `,
        }}
      />

      <motion.div
        className="absolute -left-24 top-10 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'rgba(232,180,184,0.18)' }}
        animate={{ x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-16 bottom-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: 'rgba(201,168,108,0.12)' }}
        animate={{ x: [0, -24, 0], y: [0, -20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/3 top-1/3 h-56 w-56 rounded-full blur-3xl"
        style={{ background: 'rgba(74,44,69,0.28)' }}
        animate={{ opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[var(--champagne)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{ y: [0, -18, 0], opacity: [p.opacity, p.opacity + 0.15, p.opacity] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {mood !== 'playful'
        ? hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-[var(--blush)]"
              style={{ left: h.left, bottom: '-8%', opacity: h.opacity }}
              animate={{ y: ['0vh', '-110vh'], x: [0, 16, -10, 0] }}
              transition={{
                duration: h.duration,
                delay: h.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <HeartSvg style={{ width: h.size, height: h.size }} />
            </motion.div>
          ))
        : null}
    </div>
  )
}
