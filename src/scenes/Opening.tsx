import { motion } from 'framer-motion'
import { content } from '../content'
import { playSoftClick, playWhoosh, unlockAudio } from '../lib/sounds'
import { GoldButton } from '../components/ui'
import { SceneShell } from '../components/SceneShell'

export function Opening({ onNext }: { onNext: () => void }) {
  const start = () => {
    try {
      unlockAudio()
      playSoftClick()
      playWhoosh()
    } catch {
      /* sound is optional */
    }
    onNext()
  }

  return (
    <SceneShell>
      <div className="glass-card w-full max-w-md rounded-[28px] px-7 py-12 text-center sm:px-10 sm:py-14">
        <motion.p
          className="mb-5 text-[11px] tracking-[0.38em] text-[var(--champagne)] uppercase opacity-80"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
        >
          a quiet little surprise
        </motion.p>

        <motion.h1
          className="font-serif text-5xl leading-tight text-[var(--ivory)] sm:text-6xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          {content.opening.title}
        </motion.h1>

        <motion.p
          className="mt-4 font-serif text-lg italic text-[var(--blush)] sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.9 }}
        >
          {content.opening.subtitle}
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7 }}
        >
          <GoldButton onClick={start}>{content.opening.startLabel}</GoldButton>
        </motion.div>
      </div>
    </SceneShell>
  )
}
