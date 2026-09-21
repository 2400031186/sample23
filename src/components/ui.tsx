import type { CSSProperties, ReactNode } from 'react'

type HeartProps = {
  className?: string
  style?: CSSProperties
}

export function HeartSvg({ className = '', style }: HeartProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      style={style}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.1 21.35c-.1 0-.2-.03-.28-.1C7.14 17.12 4.2 14.4 2.9 11.86 1.5 9.1 2.22 5.78 5.12 4.62c1.7-.68 3.62-.18 4.86 1.22.3.34.55.72.77 1.13.22-.41.47-.79.77-1.13 1.24-1.4 3.16-1.9 4.86-1.22 2.9 1.16 3.62 4.48 2.22 7.24-1.3 2.54-4.24 5.26-8.92 9.39-.08.07-.18.1-.28.1Z" />
    </svg>
  )
}

export function GoldButton({
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  type?: 'button' | 'submit'
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`gold-btn cursor-pointer rounded-full px-8 py-3.5 text-sm font-medium tracking-[0.22em] uppercase transition-transform duration-200 enabled:active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}
