import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { SceneShell } from '../components/SceneShell'
import { GoldButton, HeartSvg } from '../components/ui'
import { content } from '../content'
import { playSuccess } from '../lib/sounds'

export function StolenHeart({ onNext }: { onNext: () => void }) {
  const [phase, setPhase] = useState<'whisper' | 'merge' | 'reveal'>('whisper')
  const bits = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: Math.cos((i / 10) * Math.PI * 2) * (110 + (i % 3) * 30),
        y: Math.sin((i / 10) * Math.PI * 2) * (90 + (i % 4) * 24),
      })),
    [],
  )

  useEffect(() => {
    const a = window.setTimeout(() => setPhase('merge'), 1600)
    const b = window.setTimeout(() => {
      setPhase('reveal')
      playSuccess()
    }, 2900)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [])

  return (
    <SceneShell>
      <div className="relative flex h-full w-full flex-col items-center justify-center">
        <AnimatePresence>
          {phase === 'whisper' ? (
            <motion.h2
              className="font-serif text-3xl italic text-[var(--champagne)] sm:text-4xl"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {content.stolenHeart.whisper}
            </motion.h2>
          ) : null}
        </AnimatePresence>

        <div className="relative mt-6 flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
          {phase !== 'whisper'
            ? bits.map((bit, i) => (
                <motion.div
                  key={bit.id}
                  className="absolute text-[var(--blush)]"
                  initial={{ x: bit.x, y: bit.y, scale: 1, opacity: 1 }}
                  animate={{ x: 0, y: 0, scale: 0.15, opacity: 0.2 }}
                  transition={{ delay: i * 0.04, duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <HeartSvg className="h-8 w-8" />
                </motion.div>
              ))
            : null}

          <motion.div
            className="heart-glow text-[var(--rose)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={
              phase === 'reveal'
                ? { scale: 1, opacity: 1 }
                : { scale: 0, opacity: 0 }
            }
            transition={{ type: 'spring', stiffness: 160, damping: 12 }}
            style={{ animation: phase === 'reveal' ? 'pulse-heart 2.2s ease-in-out infinite' : undefined }}
          >
            <HeartSvg className="h-28 w-28 sm:h-32 sm:w-32" />
          </motion.div>
        </div>

        {phase === 'reveal' ? (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-glow font-serif text-3xl text-[var(--ivory)] sm:text-5xl">
              {content.stolenHeart.reveal}
            </h2>
            <div className="mt-8">
              <GoldButton onClick={onNext}>{content.stolenHeart.continueLabel}</GoldButton>
            </div>
          </motion.div>
        ) : null}
      </div>
    </SceneShell>
  )
}
