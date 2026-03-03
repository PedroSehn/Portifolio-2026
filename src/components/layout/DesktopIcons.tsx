import { useState } from 'react'

const icons = [
  { emoji: '💼', label: 'Portfólio', href: '#hero' },
  { emoji: '📁', label: 'Projetos', href: '#projects' },
  { emoji: '✉️', label: 'Contato', href: '#contact' },
  { emoji: '🐙', label: 'GitHub', href: 'https://github.com' },
]

export default function DesktopIcons() {
  const [activeHref, setActiveHref] = useState('')

  return (
    <nav
      className="desktop-icons hidden md:flex fixed top-5 left-[14px] flex-col gap-[18px] z-10"
      aria-label="Atalhos da área de trabalho"
    >
      {icons.map((icon) => {
        const isActive = activeHref === icon.href
        return (
          <a
            key={icon.label}
            href={icon.href}
            className={`desktop-icon inline-flex flex-col items-center gap-1 w-[68px] text-center text-[11px] ${
              isActive ? 'desktop-icon--active' : ''
            }`}
            onFocus={() => setActiveHref(icon.href)}
          >
            <span className="text-[30px] leading-none desktop-icon__img" aria-hidden="true">
              {icon.emoji}
            </span>
            <span
              className="text-white text-[11px] font-semibold desktop-icon__label"
              style={{ textShadow: '1px 1px 1px black' }}
            >
              {icon.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
