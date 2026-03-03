import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
}

export default function Tag({ children }: TagProps) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 text-[10px] shadow-raised bg-win-gray">
      {children}
    </span>
  )
}
