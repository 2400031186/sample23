import { useEffect, useRef } from 'react'

type Piece = {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  rot: number
  vr: number
  life: number
  shape: 'rect' | 'heart'
}

const COLORS = ['#E8B4B8', '#C9A86C', '#F3E6C8', '#C97B84', '#FBF6F0', '#6B2436']

export function Confetti({
  active,
  density = 70,
}: {
  active: boolean
  density?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const pieces: Piece[] = Array.from({ length: density }, () => ({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * canvas.height * 0.4,
      vx: (Math.random() - 0.5) * 3.2,
      vy: 1.4 + Math.random() * 2.8,
      size: 4 + Math.random() * 7,
      color: COLORS[Math.floor(Math.random() * COLORS.length)] ?? '#C9A86C',
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.14,
      life: 1,
      shape: Math.random() > 0.78 ? 'heart' : 'rect',
    }))

    let raf = 0
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of pieces) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.012
        p.rot += p.vr
        p.life -= 0.0035
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = Math.max(p.life, 0)
        ctx.fillStyle = p.color
        if (p.shape === 'heart') {
          ctx.beginPath()
          ctx.moveTo(0, p.size * 0.3)
          ctx.bezierCurveTo(-p.size, -p.size * 0.4, -p.size * 0.3, -p.size, 0, -p.size * 0.35)
          ctx.bezierCurveTo(p.size * 0.3, -p.size, p.size, -p.size * 0.4, 0, p.size * 0.3)
          ctx.fill()
        } else {
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
        }
        ctx.restore()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active, density])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30"
      aria-hidden="true"
    />
  )
}
