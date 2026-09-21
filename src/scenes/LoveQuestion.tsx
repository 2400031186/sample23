import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { SceneShell } from '../components/SceneShell'
import { GoldButton } from '../components/ui'
import { content } from '../content'
import { playDodge, playSoftClick, playSparkle } from '../lib/sounds'

type Pos = { x: number; y: number; scale: number }

export function LoveQuestion({ onNext }: { onNext: () => void }) {
  const arenaRef = useRef<HTMLDivElement | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [noLabel, setNoLabel] = useState<string>(content.question.no)
  const [noPos, setNoPos] = useState<Pos>({ x: 0, y: 0, scale: 1 })
  const [swapped, setSwapped] = useState(false)
  const [gaveIn, setGaveIn] = useState(false)

  const dodge = () => {
    if (gaveIn) return
    const arena = arenaRef.current
    const nextAttempt = attempts + 1
    setAttempts(nextAttempt)
    playDodge()

    const phrases = content.question.noDodges
    setNoLabel(phrases[(nextAttempt - 1) % phrases.length] ?? content.question.no)

    const bounds = arena?.getBoundingClientRect()
    const maxX = bounds ? Math.min(110, bounds.width * 0.28) : 90
    const maxY = bounds ? Math.min(70, bounds.height * 0.28) : 50
    const shrink = nextAttempt % 3 === 0

    setNoPos({
      x: (Math.random() * 2 - 1) * maxX,
      y: (Math.random() * 2 - 1) * maxY,
      scale: shrink ? 0.78 : 1,
    })

    if (nextAttempt % 2 === 0) setSwapped((s) => !s)

    if (nextAttempt >= content.question.attemptsBeforeGiveIn) {
      setGaveIn(true)
    }
  }

  const yes = () => {
    playSoftClick()
    playSparkle()
    onNext()
  }

  const yesBtn = (
    <GoldButton onClick={yes} className="min-w-[132px]">
      {content.question.yes}
    </GoldButton>
  )

  const noBtn = gaveIn ? null : (
    <motion.button
      type="button"
      className="rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm tracking-[0.12em] text-[var(--ivory)]/80"
      style={{ touchAction: 'none' }}
      animate={{ x: noPos.x, y: noPos.y, scale: noPos.scale }}
      transition={{ type: 'spring', stiffness: 520, damping: 22 }}
      onPointerEnter={dodge}
      onPointerDown={(e) => {
        e.preventDefault()
        e.stopPropagation()
        dodge()
      }}
    >
      {noLabel}
    </motion.button>
  )

  return (
    <SceneShell>
      <div className="glass-card w-full max-w-lg overflow-hidden rounded-[28px] px-6 py-10 text-center sm:px-10 sm:py-12">
        <h2 className="font-serif text-3xl text-[var(--ivory)] sm:text-4xl">
          {content.question.title}
        </h2>
        <p className="mt-3 text-sm text-[var(--champagne)]/80">
          Choose carefully. One of these is a trap.
        </p>

        <div
          ref={arenaRef}
          className="relative mx-auto mt-10 flex min-h-[160px] w-full items-center justify-center gap-4"
        >
          {swapped ? (
            <>
              {noBtn}
              {yesBtn}
            </>
          ) : (
            <>
              {yesBtn}
              {noBtn}
            </>
          )}
        </div>

        {gaveIn ? (
          <motion.p
            className="mt-4 font-serif text-lg italic text-[var(--blush)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {content.question.afterAttempts}
          </motion.p>
        ) : null}
      </div>
    </SceneShell>
  )
}
