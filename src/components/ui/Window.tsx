import type { CSSProperties, ReactNode } from 'react'

interface WindowProps {
  icon: string
  title: string
  statusBar?: string[]
  children: ReactNode
  className?: string
  style?: CSSProperties
  titlebarClassName?: string
  isActive?: boolean
  onActivate?: () => void
  menuItems?: string[]
}

export default function Window({
  children,
  icon,
  title,
  statusBar = [],
  className = '',
  style,
  titlebarClassName,
  isActive = true,
  onActivate,
  menuItems,
}: WindowProps) {
  return (
    <section
      className={`win95-raised win95-window-animate flex flex-col bg-win95-silver ${className}`}
      style={style}
      onClick={onActivate}
    >
      <header
        className={`win95-titlebar ${!isActive ? 'win95-titlebar-inactive' : ''} ${titlebarClassName ?? ''}`.trim()}
      >
        <span className="text-lg" aria-hidden="true">
          {icon}
        </span>
        <span className="truncate flex-1">{title}</span>
        <div className="flex gap-1" aria-hidden="true">
          <button className="win95-titlebar-button" aria-label="Minimize">
            <span
              style={{ borderBottom: '1px solid black', width: 6, display: 'block' }}
            />
          </button>
          <button className="win95-titlebar-button" aria-label="Maximize">
            <span
              style={{
                border: '1px solid black',
                width: 7,
                height: 6,
                display: 'block',
                borderTopWidth: 2,
              }}
            />
          </button>
          <button className="win95-titlebar-button" aria-label="Close">
            <span style={{ fontSize: 9, fontWeight: 'bold', lineHeight: 1 }}>✕</span>
          </button>
        </div>
      </header>

      {menuItems && (
        <div className="win95-menubar">
          {menuItems.map((item) => (
            <span key={item} className="win95-menubar-item">
              <span style={{ textDecoration: 'underline' }}>{item[0]}</span>
              {item.slice(1)}
            </span>
          ))}
        </div>
      )}

      <div className="px-6 py-5">{children}</div>

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
