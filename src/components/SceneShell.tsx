import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const ease = [0.22, 1, 0.36, 1] as const

export function SceneShell({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.section
      className={`absolute inset-0 z-10 flex flex-col items-center justify-center overflow-y-auto px-5 py-10 sm:px-8 ${className}`}
      initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
      transition={{ duration: 0.85, ease }}
    >
      {children}
    </motion.section>
  )
}
