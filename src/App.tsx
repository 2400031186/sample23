import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AmbientBackground } from './components/AmbientBackground'
import { ProgressDots } from './components/ProgressDots'
import {
  palette,
  SCENE_IDS,
  type AmbientMood,
  type SceneId,
} from './content'
import { playWhoosh } from './lib/sounds'
import { Cake } from './scenes/Cake'
import { FinalLetter } from './scenes/FinalLetter'
import { HeartGame } from './scenes/HeartGame'
import { LoveQuestion } from './scenes/LoveQuestion'
import { Memories } from './scenes/Memories'
import { Opening } from './scenes/Opening'
import { SongDedication } from './scenes/SongDedication'
import { StolenHeart } from './scenes/StolenHeart'
import { SurpriseBoxes } from './scenes/SurpriseBoxes'

const moodByScene: Record<SceneId, AmbientMood> = {
  opening: 'dawn',
  question: 'playful',
  game: 'playful',
  stolen: 'cinematic',
  memories: 'warm',
  song: 'night',
  boxes: 'festive',
  cake: 'warm',
  letter: 'paper',
}

function nextScene(current: SceneId): SceneId {
  const i = SCENE_IDS.indexOf(current)
  return SCENE_IDS[Math.min(i + 1, SCENE_IDS.length - 1)] ?? current
}

export default function App() {
  const [scene, setScene] = useState<SceneId>('opening')

  useEffect(() => {
    const root = document.documentElement
    for (const [key, value] of Object.entries(palette)) {
      root.style.setProperty(`--${key}`, value)
    }
  }, [])

  const goNext = () => {
    try {
      playWhoosh()
    } catch {
      /* sound is optional */
    }
    setScene((s) => nextScene(s))
  }

  return (
    <div className="relative h-dvh w-full select-none overflow-hidden bg-[var(--night)]">
      <AmbientBackground mood={moodByScene[scene]} />
      <div className="vignette" />
      <div className="grain" />

      <AnimatePresence mode="wait">
        {scene === 'opening' ? <Opening key="opening" onNext={goNext} /> : null}
        {scene === 'question' ? <LoveQuestion key="question" onNext={goNext} /> : null}
        {scene === 'game' ? <HeartGame key="game" onNext={goNext} /> : null}
        {scene === 'stolen' ? <StolenHeart key="stolen" onNext={goNext} /> : null}
        {scene === 'memories' ? <Memories key="memories" onNext={goNext} /> : null}
        {scene === 'song' ? <SongDedication key="song" onNext={goNext} /> : null}
        {scene === 'boxes' ? <SurpriseBoxes key="boxes" onNext={goNext} /> : null}
        {scene === 'cake' ? <Cake key="cake" onNext={goNext} /> : null}
        {scene === 'letter' ? <FinalLetter key="letter" /> : null}
      </AnimatePresence>

      <ProgressDots current={scene} />
    </div>
  )
}
