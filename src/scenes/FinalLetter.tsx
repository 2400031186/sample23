import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Confetti } from '../components/Confetti'
import { SceneShell } from '../components/SceneShell'
import { content } from '../content'
import { playSparkle, playSuccess } from '../lib/sounds'

export function FinalLetter() {
  const [opened, setOpened] = useState(false)

  const openGift = () => {
    if (opened) return
    playSparkle()
    window.setTimeout(() => playSuccess(), 350)
    setOpened(true)
  }

  return (
    <SceneShell className="justify-start overflow-y-auto pt-10 sm:pt-14">
      <Confetti active={opened} density={120} />
      {!opened ? <GiftCover onOpen={openGift} /> : <VideoReveal />}
    </SceneShell>
  )
}

function GiftCover({ onOpen }: { onOpen: () => void }) {
  return (
    <motion.div
      className="flex min-h-full w-full flex-col items-center justify-center"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <p className="text-[11px] tracking-[0.36em] text-[var(--gold)] uppercase">One last surprise</p>
      <h2 className="mt-3 text-center font-serif text-4xl text-[var(--ivory)] sm:text-6xl">For you, always</h2>
      <p className="mt-3 max-w-xs text-center text-sm text-[var(--champagne)]/75">There is one more little moment waiting inside.</p>

      <motion.button
        type="button"
        onClick={onOpen}
        className="group relative mt-12 h-52 w-64 sm:h-60 sm:w-72"
        whileHover={{ y: -8, scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Open your gift"
      >
        <span className="absolute -top-8 left-1/2 h-16 w-16 -translate-x-1/2 rounded-full bg-[var(--gold)]/25 blur-2xl transition group-hover:bg-[var(--blush)]/45" />
        <span className="absolute top-12 left-[12%] h-32 w-[76%] rounded-md bg-[var(--wine)] shadow-[0_25px_45px_rgba(0,0,0,0.45)]" />
        <span className="absolute top-8 left-[8%] z-10 h-9 w-[84%] rounded-md bg-[var(--rose)] shadow-[0_8px_18px_rgba(0,0,0,0.3)]" />
        <span className="absolute top-8 left-1/2 z-20 h-36 w-5 -translate-x-1/2 bg-[var(--gold)] shadow-[inset_2px_0_rgba(255,255,255,0.25)]" />
        <span className="absolute top-[47%] left-[12%] z-20 h-5 w-[76%] bg-[var(--gold)]" />
        <span className="absolute top-0 left-1/2 z-30 h-14 w-14 -translate-x-1/2 rounded-full border-[10px] border-[var(--champagne)]/90 border-b-transparent border-l-transparent rotate-45" />
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.28em] text-[var(--champagne)] uppercase">Touch to open</span>
      </motion.button>

      <div className="mt-8 flex gap-2 text-[var(--blush)]/75" aria-hidden="true">
        <span>✦</span><span className="text-[var(--gold)]">♡</span><span>✦</span>
      </div>
    </motion.div>
  )
}

function VideoReveal() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.muted = false
    video.volume = 1
    void video.play().catch(() => {
      /* browser may block autoplay until the user taps the video */
    })
  }, [])

  return (
    <motion.div
      className="flex w-full max-w-3xl flex-col items-center pb-8"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85 }}
    >
      <p className="text-[11px] tracking-[0.36em] text-[var(--gold)] uppercase">A memory made just for you</p>
      <h2 className="mt-3 text-center font-serif text-4xl text-[var(--ivory)] sm:text-6xl">Happy Birthday, {content.herName} ❤️</h2>
      <p className="mt-3 text-center font-serif text-lg italic text-[var(--champagne)]/85">Press play and keep this moment close.</p>

      <div className="relative mt-8 w-full max-w-[420px] rounded-[2rem] border border-[var(--gold)]/55 bg-[var(--dusk)]/75 p-2 shadow-[0_30px_100px_rgba(201,123,132,0.35)] sm:p-3">
        <div className="pointer-events-none absolute -inset-2 rounded-[2rem] border border-[var(--blush)]/20" />
        <div className="pointer-events-none absolute inset-5 z-10 rounded-[1.4rem] border border-white/20" />
        <video
          ref={videoRef}
          src="/memories/my-final-video-fixed.mp4"
          poster="/memories/02-poster.svg"
          controls
          autoPlay
          playsInline
          preload="auto"
          muted={false}
          className="aspect-[9/16] w-full rounded-[1.5rem] bg-black object-cover"
        />
      </div>

      <div className="mt-7 flex items-center gap-4 text-[var(--gold)]" aria-hidden="true">
        <span className="h-px w-16 bg-[var(--gold)]/45" />
        <span className="text-xl">✦</span>
        <span className="text-2xl text-[var(--blush)]">♡</span>
        <span className="text-xl">✦</span>
        <span className="h-px w-16 bg-[var(--gold)]/45" />
      </div>
    </motion.div>
  )
}
