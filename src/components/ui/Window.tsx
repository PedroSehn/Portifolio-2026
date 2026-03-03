import type { CSSProperties, ReactNode } from 'react'

interface WindowProps {
  icon: string
  title: string
  statusBar?: string[]
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export default function Window({
  children,
  icon,
  title,
  statusBar = [],
  className = '',
  style,
}: WindowProps) {
  return (
    <section
      className={`bg-win-gray border-2 border-t-win-white border-l-win-white border-r-win-dark border-b-win-dark shadow-win-outer animate-window-open ${className}`}
      style={style}
    >
      <header className="flex items-center gap-2 px-3 py-1 bg-titlebar text-white text-[11px] font-bold tracking-tight">
        <span className="text-lg" aria-hidden="true">
          {icon}
        </span>
        <span className="truncate flex-1">{title}</span>
        <div className="flex gap-1" aria-hidden="true">
          {['_', '□', '✕'].map((symbol) => (
            <button
              key={symbol}
              type="button"
              className="w-4 h-3 bg-win-gray shadow-raised text-[10px] leading-none"
              tabIndex={-1}
            >
              {symbol}
            </button>
          ))}
        </div>
      </header>
      <div className="px-6 py-5">{children}</div>
      {statusBar.length > 0 && (
        <footer className="flex border-t border-win-dark px-3 py-2 gap-2 text-[10px]">
          {statusBar.map((cell) => (
            <span
              key={cell}
              className="px-2 py-0.5 shadow-sunken text-win-darker"
            >
              {cell}
            </span>
          ))}
        </footer>
      )}
    </section>
  )
}
