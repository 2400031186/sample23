import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { SceneShell } from '../components/SceneShell'
import { GoldButton } from '../components/ui'
import { content } from '../content'
import { playSoftClick, playSparkle, unlockAudio } from '../lib/sounds'

export function Memories({ onNext }: { onNext: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const items = content.memories.items
  const [opened, setOpened] = useState<number[]>([])
  const [active, setActive] = useState<number | null>(null)
  const allOpened = opened.length === items.length

  useEffect(() => {
    return () => {
      const audio = audioRef.current
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [])

  const startMemoryMusic = async () => {
    try {
      unlockAudio()
      const audio = audioRef.current
      if (!audio) return
      audio.volume = 0.6
      await audio.play()
    } catch {
      /* audio is optional */
    }
  }

  const markOpened = (index: number) => {
    setOpened((prev) => (prev.includes(index) ? prev : [...prev, index]))
  }

  const open = async (index: number) => {
    playSoftClick()
    await startMemoryMusic()
    setActive(index)
    markOpened(index)
  }

  return (
    <SceneShell>
      <audio ref={audioRef} src={content.memories.audioSrc} preload="auto" loop />
      <div className="flex h-full w-full max-w-4xl flex-col items-center pt-2">
        <h2 className="font-serif text-3xl text-[var(--ivory)] sm:text-4xl">
          {content.memories.title}
        </h2>
        <p className="mt-2 text-xs tracking-[0.22em] text-[var(--champagne)]/70 uppercase">
          {allOpened ? 'our little album' : content.memories.hint}
        </p>

        <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {items.map((item, index) => {
            const seen = opened.includes(index)
            const isVideo = item.mediaType === 'video'
            const isBeginning = item.number === '01'
            return (
              <motion.button
                key={item.number}
                type="button"
                onClick={() => void open(index)}
                className="memory-frame group overflow-hidden rounded-2xl text-left"
                whileHover={{ y: -6 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={
                    isBeginning
                      ? 'relative aspect-[4/5] overflow-hidden sm:aspect-[4/5]'
                      : 'relative aspect-[16/10] overflow-hidden sm:aspect-[4/5]'
                  }
                >
                  {isVideo ? (
                    <video
                      src={item.video}
                      poster={item.photo}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isBeginning ? 'object-[center_24%]' : 'object-center'
                      }`}
                    />
                  ) : (
                    <img
                      src={item.photo}
                      alt={item.title}
                      className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                        isBeginning ? 'object-[center_24%]' : 'object-center'
                      }`}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <div className="absolute top-3 left-3 text-[11px] tracking-[0.28em] text-[var(--gold)]">
                    {item.number}
                  </div>
                  {seen ? (
                    <div className="absolute top-3 right-3 h-2 w-2 rounded-full bg-[var(--blush)]" />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className="font-serif text-xl text-[var(--ivory)]">{item.title}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="mt-8">
          <GoldButton
            disabled={!allOpened}
            onClick={() => {
              playSparkle()
              onNext()
            }}
          >
            {content.memories.continueLabel}
          </GoldButton>
        </div>
      </div>

      <AnimatePresence>
        {active !== null ? (
          <MemoryLightbox
            index={active}
            onClose={() => setActive(null)}
            onPrev={() =>
              setActive((i) => {
                const next = i === null ? 0 : (i + items.length - 1) % items.length
                markOpened(next)
                return next
              })
            }
            onNext={() =>
              setActive((i) => {
                const next = i === null ? 0 : (i + 1) % items.length
                markOpened(next)
                return next
              })
            }
          />
        ) : null}
      </AnimatePresence>
    </SceneShell>
  )
}

function MemoryLightbox({
  index,
  onClose,
  onPrev,
  onNext,
}: {
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const item = content.memories.items[index]
  if (!item) return null

  const isVideo = item.mediaType === 'video'
  const isBeginning = item.number === '01'

  return (
    <motion.div
      className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.article
        className="memory-frame w-full max-w-md overflow-hidden rounded-3xl"
        initial={{ y: 24, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={item.video}
            poster={item.photo}
            controls
            playsInline
            autoPlay
            className={`max-h-[52dvh] w-full object-cover sm:max-h-none sm:aspect-[4/5] ${
              isBeginning ? 'object-[center_24%]' : 'object-center'
            }`}
          />
        ) : (
          <img
            src={item.photo}
            alt={item.title}
            className={`max-h-[52dvh] w-full object-cover sm:max-h-none sm:aspect-[4/5] ${
              isBeginning ? 'object-[center_24%]' : 'object-center'
            }`}
          />
        )}
        <div className="bg-[var(--dusk)]/95 px-6 py-5">
          <p className="text-[11px] tracking-[0.28em] text-[var(--gold)]">
            {item.number} — {item.title}
          </p>
          <p className="mt-3 font-serif text-lg leading-relaxed text-[var(--ivory)] italic">
            {item.caption}
          </p>
          <div className="mt-5 flex items-center justify-between text-xs tracking-[0.16em] text-[var(--champagne)]/80">
            <button type="button" onClick={onPrev} className="uppercase">
              Prev
            </button>
            <button type="button" onClick={onClose} className="uppercase">
              Close
            </button>
            <button type="button" onClick={onNext} className="uppercase">
              Next
            </button>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}
