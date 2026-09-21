import { motion } from 'framer-motion'
import { useState } from 'react'
import { Confetti } from '../components/Confetti'
import { SceneShell } from '../components/SceneShell'
import { content } from '../content'
import { playSparkle, playSuccess } from '../lib/sounds'

const boxLooks = [
  { body: '#6B2436', lid: '#C97B84', ribbon: '#C9A86C' },
  { body: '#C9A86C', lid: '#F3E6C8', ribbon: '#6B2436' },
  { body: '#4A2C45', lid: '#E8B4B8', ribbon: '#F3E6C8' },
]

export function SurpriseBoxes({ onNext }: { onNext: () => void }) {
  const [opened, setOpened] = useState<number | null>(null)
  const revealed = opened !== null

  const openBox = (index: number) => {
    if (opened !== null) return
    setOpened(index)
    playSparkle()
    window.setTimeout(() => playSuccess(), 400)
    window.setTimeout(onNext, 2800)
  }

  return (
    <SceneShell>
      <Confetti active={revealed} density={90} />

      <h2 className="font-serif text-3xl text-[var(--ivory)] sm:text-4xl">
        {content.boxes.title}
      </h2>
      <p className="mt-2 text-sm text-[var(--champagne)]/75">Any one will do. Trust me.</p>

      <div className="mt-12 flex w-full max-w-lg items-end justify-center gap-4 sm:gap-8">
        {content.boxes.labels.map((label, i) => (
          <GiftBox
            key={label}
            label={label}
            look={boxLooks[i] ?? { body: '#6B2436', lid: '#C97B84', ribbon: '#C9A86C' }}
            dimmed={opened !== null && opened !== i}
            open={opened === i}
            onOpen={() => openBox(i)}
          />
        ))}
      </div>

      {revealed ? (
        <motion.h3
          className="text-glow mt-10 font-serif text-2xl text-[var(--ivory)] sm:text-4xl"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
        >
          {content.boxes.revealTitle.replace('{herName}', content.herName)}
        </motion.h3>
      ) : null}
    </SceneShell>
  )
}

function GiftBox({
  label,
  look,
  dimmed,
  open,
  onOpen,
}: {
  label: string
  look: { body: string; lid: string; ribbon: string }
  dimmed: boolean
  open: boolean
  onOpen: () => void
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={`box-3d flex w-[31%] max-w-[150px] flex-col items-center transition-opacity duration-500 ${dimmed ? 'opacity-30' : 'opacity-100'}`}
    >
      <span className="mb-4 text-center text-[11px] leading-tight tracking-[0.18em] text-[var(--champagne)] uppercase sm:text-xs">
        {label}
      </span>
      <div className="relative h-32 w-full sm:h-36">
        <motion.div
          className="absolute top-0 left-[8%] z-10 h-7 w-[84%] rounded-sm"
          style={{ background: look.lid, boxShadow: '0 6px 16px rgba(0,0,0,0.25)' }}
          animate={open ? { rotateX: -118, y: -18, transformOrigin: 'bottom' } : { rotateX: 0, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute top-6 left-[10%] h-[72%] w-[80%] rounded-sm"
          style={{ background: look.body, boxShadow: '0 12px 24px rgba(0,0,0,0.28)' }}
        />
        <div
          className="absolute top-6 left-1/2 z-20 h-[72%] w-3 -translate-x-1/2"
          style={{ background: look.ribbon }}
        />
        <div
          className="absolute top-[42%] left-[10%] z-20 h-3 w-[80%]"
          style={{ background: look.ribbon }}
        />
        {open ? (
          <motion.div
            className="absolute top-4 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 0.7, scale: 1.3 }}
            style={{
              background: 'radial-gradient(circle, rgba(243,230,200,0.85), transparent 70%)',
            }}
          />
        ) : null}
      </div>
    </button>
  )
}
