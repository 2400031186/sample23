import { SCENE_IDS, type SceneId } from '../content'

export function ProgressDots({ current }: { current: SceneId }) {
  const index = SCENE_IDS.indexOf(current)

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center gap-1.5 sm:bottom-6">
      {SCENE_IDS.map((id, i) => (
        <span
          key={id}
          className="h-1 rounded-full transition-all duration-500"
          style={{
            width: i === index ? 18 : 6,
            background:
              i === index
                ? 'var(--gold)'
                : i < index
                  ? 'rgba(232,180,184,0.7)'
                  : 'rgba(255,255,255,0.18)',
          }}
        />
      ))}
    </div>
  )
}
