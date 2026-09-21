import { useEffect, useRef, useState } from 'react'
import { Confetti } from '../components/Confetti'
import { SceneShell } from '../components/SceneShell'
import { GoldButton } from '../components/ui'
import { content } from '../content'
import { playSparkle, playSuccess } from '../lib/sounds'

export function Cake({ onNext }: { onNext: () => void }) {
  const count = content.cake.candleCount
  const [lit, setLit] = useState(() => Array.from({ length: count }, () => true))
  const [micOn, setMicOn] = useState(false)
  const [micDenied, setMicDenied] = useState(false)
  const done = lit.every((v) => !v)
  const advanced = useRef(false)

  const extinguishAll = () => {
    setLit(Array.from({ length: count }, () => false))
  }

  const toggleCandle = (index: number) => {
    if (done) return
    setLit((prev) => prev.map((v, i) => (i === index ? false : v)))
  }

  useEffect(() => {
    if (!done || advanced.current) return
    advanced.current = true
    playSuccess()
    playSparkle()
    const t = window.setTimeout(onNext, 2800)
    return () => window.clearTimeout(t)
  }, [done, onNext])

  useEffect(() => {
    if (!micOn || done) return
    let stream: MediaStream | null = null
    let raf = 0
    let audio: AudioContext | null = null
    let cancelled = false

    const start = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        audio = new AudioContext()
        const source = audio.createMediaStreamSource(stream)
        const analyser = audio.createAnalyser()
        analyser.fftSize = 256
        source.connect(analyser)
        const data = new Uint8Array(analyser.frequencyBinCount)
        const loop = () => {
          analyser.getByteFrequencyData(data)
          let sum = 0
          for (let i = 0; i < data.length; i += 1) sum += data[i] ?? 0
          const avg = sum / data.length
          if (avg > 26) extinguishAll()
          raf = requestAnimationFrame(loop)
        }
        raf = requestAnimationFrame(loop)
      } catch {
        setMicDenied(true)
        setMicOn(false)
      }
    }

    void start()
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      stream?.getTracks().forEach((t) => t.stop())
      void audio?.close()
    }
  }, [micOn, done])

  return (
    <SceneShell>
      <Confetti active={done} density={80} />
      <p className="text-[11px] tracking-[0.3em] text-[var(--gold)] uppercase">
        {content.boxes.revealTitle.replace('{herName}', content.herName)}
      </p>
      <h2 className="mt-2 font-serif text-3xl text-[var(--ivory)]">
        {done ? content.cake.wishMade : content.cake.wish}
      </h2>

      <div className="relative mt-8 flex flex-col items-center">
        <div className="relative z-10 flex items-end justify-center gap-3">
          {lit.map((isLit, i) => (
            <button
              key={i}
              type="button"
              aria-label={isLit ? 'Extinguish candle' : 'Candle out'}
              onClick={() => toggleCandle(i)}
              className="relative flex flex-col items-center"
            >
              {isLit ? (
                <span
                  className="flame mb-0.5 block h-4 w-2.5 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 80%, #fff6d3, #ffb347 42%, #ff6b3d 72%, transparent 80%)',
                  }}
                />
              ) : (
                <span
                  className="mb-0.5 block h-5 w-3 rounded-full bg-white/25"
                  style={{ animation: 'smoke-rise 1.6s ease-out forwards' }}
                />
              )}
              <span className="h-8 w-[7px] rounded-sm bg-[var(--champagne)]" />
            </button>
          ))}
        </div>

        <CakeBody />
      </div>

      {!done ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <GoldButton onClick={extinguishAll}>{content.cake.blowButton}</GoldButton>
          <button
            type="button"
            className="text-xs tracking-[0.16em] text-[var(--champagne)]/70 uppercase"
            onClick={() => setMicOn(true)}
          >
            {micDenied ? 'Mic unavailable — use the button' : content.cake.micHint}
          </button>
        </div>
      ) : null}
    </SceneShell>
  )
}

function CakeBody() {
  return (
    <div className="relative mt-1 w-[260px] sm:w-[300px]">
      <div
        className="relative mx-auto h-[52px] w-[70%] rounded-t-[40%] rounded-b-md"
        style={{
          background: 'linear-gradient(180deg, #f7efe4, #ead7c0)',
          boxShadow: 'inset 0 8px 12px rgba(255,255,255,0.35)',
        }}
      >
        <span className="absolute -bottom-2 left-[12%] h-6 w-4 rounded-b-full bg-[#f7efe4]" />
        <span className="absolute -bottom-3 left-[38%] h-7 w-5 rounded-b-full bg-[#f4e6d4]" />
        <span className="absolute -bottom-2 right-[18%] h-6 w-4 rounded-b-full bg-[#f7efe4]" />
      </div>
      <div
        className="relative mx-auto h-3 w-[72%]"
        style={{ background: 'linear-gradient(90deg, #c97b84, #e8b4b8, #c97b84)' }}
      />
      <div
        className="relative mx-auto h-[58px] w-[86%] rounded-md"
        style={{
          background: 'linear-gradient(180deg, #f3e6c8, #e6d0b0)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
        }}
      >
        <span className="absolute top-3 left-6 h-2 w-2 rounded-full bg-[var(--gold)]/80" />
        <span className="absolute top-5 right-10 h-2 w-2 rounded-full bg-[var(--rose)]/70" />
        <span className="absolute bottom-4 left-1/3 h-2 w-2 rounded-full bg-[var(--gold)]/70" />
      </div>
      <div
        className="mx-auto h-3 w-[96%] rounded-full"
        style={{
          background: 'linear-gradient(90deg, #c9a86c, #f3e6c8, #c9a86c)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  )
}
