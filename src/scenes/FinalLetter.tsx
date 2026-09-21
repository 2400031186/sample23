import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { SceneShell } from '../components/SceneShell'
import { HeartSvg } from '../components/ui'
import { content } from '../content'

export function FinalLetter() {
  const fullText = useMemo(
    () => content.letter.paragraphs.join('\n\n'),
    [],
  )
  const [chars, setChars] = useState(0)
  const done = chars >= fullText.length

  useEffect(() => {
    if (chars >= fullText.length) return
    const ch = fullText[chars]
    const delay =
      chars === 0 ? 420 : ch === '.' || ch === '!' || ch === '?' ? 90 : ch === '\n' ? 40 : 16
    const t = window.setTimeout(() => setChars((c) => c + 1), delay)
    return () => window.clearTimeout(t)
  }, [chars, fullText])

  const shown = fullText.slice(0, chars)

  return (
    <SceneShell>
      <div className="flex h-full w-full max-w-lg flex-col items-center justify-center">
        <h2 className="mb-5 font-serif text-3xl text-[var(--ivory)]">
          {content.letter.title}
        </h2>

        <motion.article
          className="letter-paper relative w-full cursor-pointer rounded-[22px] px-7 py-8 sm:px-10 sm:py-10"
          onClick={() => setChars(fullText.length)}
          initial={{ opacity: 0, y: 16, rotate: -0.4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.8 }}
        >
          <HeartSvg className="absolute top-4 right-5 h-4 w-4 text-[var(--rose)]/50" />
          <HeartSvg className="absolute bottom-5 left-5 h-3.5 w-3.5 text-[var(--gold)]/50" />

          <div className="font-hand text-[1.35rem] leading-relaxed text-[#4a2a32] sm:text-[1.5rem]">
            {shown.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4 last:mb-0">
                {para}
              </p>
            ))}
            {!done ? <span className="ml-0.5 inline-block w-[1px] animate-pulse bg-[#4a2a32]">|</span> : null}
          </div>

          {done ? (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="font-hand text-xl text-[#4a2a32]">{content.letter.closing}</p>
              <p className="font-script mt-1 text-4xl text-[var(--wine)]">
                {content.myName} ❤️
              </p>
            </motion.div>
          ) : null}
        </motion.article>

        {done ? (
          <motion.p
            className="mt-6 font-serif text-lg italic text-[var(--blush)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {content.letter.finale}
          </motion.p>
        ) : null}
      </div>
    </SceneShell>
  )
}
