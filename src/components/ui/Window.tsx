import type { CSSProperties, ReactNode } from 'react'

type WindowMenuItem = string | { label: string; underlineIndex?: number }

interface WindowProps {
  icon: string
  title: string
  statusBar?: string[]
  children: ReactNode
  className?: string
  contentClassName?: string
  style?: CSSProperties
  titlebarClassName?: string
  isActive?: boolean
  onActivate?: () => void
  menuItems?: WindowMenuItem[]
}

export default function Window({
  children,
  icon,
  title,
  statusBar = [],
  className = '',
  contentClassName = '',
  style,
  titlebarClassName,
  isActive = true,
  onActivate,
  menuItems,
}: WindowProps) {
  const menuItemsWithUnderline = (menuItems ?? []).map((item) => {
    const label = typeof item === 'string' ? item : item.label
    const requestedIndex = typeof item === 'string' ? 0 : item.underlineIndex ?? 0
    const maxIndex = label.length > 0 ? label.length - 1 : 0
    const underlineIndex = Math.max(0, Math.min(requestedIndex, maxIndex))
    return { label, underlineIndex }
  })

  return (
    <section
      className={`win95-raised win95-window-animate flex flex-col bg-win95-silver ${className}`}
      style={style}
      onClick={onActivate}
    >
      <header
        className={`win95-titlebar ${!isActive ? 'win95-titlebar-inactive' : ''} ${
          titlebarClassName ?? ''
        }`.trim()}
      >
        <span className="text-lg" aria-hidden="true">
          {icon}
        </span>
        <span className="truncate flex-1">{title}</span>
        <div className="flex gap-1" aria-hidden="true">
          <button className="win95-titlebar-button win95-titlebar-btn-min" aria-label="Minimize" />
          <button className="win95-titlebar-button win95-titlebar-btn-max" aria-label="Maximize" />
          <button className="win95-titlebar-button" aria-label="Close">
            <span className="win95-titlebar-btn-close">✕</span>
          </button>
        </div>
      </header>

      {menuItemsWithUnderline.length > 0 && (
        <div className="win95-menubar">
          {menuItemsWithUnderline.map((item, index) => {
            const before = item.label.slice(0, item.underlineIndex)
            const highlightedChar = item.label[item.underlineIndex] ?? ''
            const after = highlightedChar
              ? item.label.slice(item.underlineIndex + 1)
              : item.label.slice(item.underlineIndex)

            return (
              <span key={`${item.label}-${index}`} className="win95-menubar-item">
                {before}
                {highlightedChar ? <u>{highlightedChar}</u> : null}
                {after}
              </span>
            )
          })}
        </div>
      )}

      <div className={contentClassName || 'px-6 py-5'}>{children}</div>

      {statusBar.length > 0 && (
        <footer className="win95-statusbar">
          {statusBar.map((cell) => (
            <span key={cell} className="win95-statusbar-section">
              {cell}
            </span>
          ))}
        </footer>
      )}
    </section>
  )
}
