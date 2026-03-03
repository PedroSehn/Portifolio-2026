import { useEffect } from 'react'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: '💻 Portfólio', href: '#hero' },
  { label: '👤 Sobre Mim', href: '#about' },
  { label: '⚙️ Tecnologias', href: '#tech' },
  { label: '📁 Projetos', href: '#projects' },
  { label: '✉️ Contato', href: '#contact' },
]

const scrollToAnchor = (href?: string) => {
  if (!href || !href.startsWith('#')) {
    return
  }

  if (typeof document === 'undefined') {
    return
  }

  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element | null
      if (
        target &&
        !target.closest('.start-menu') &&
        !target.closest('.taskbar__start-btn')
      ) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => document.removeEventListener('click', handleClickOutside)
  }, [isOpen, onClose])

  return (
    <div className="start-menu" hidden={!isOpen} role="menu" aria-label="Menu Iniciar">
      <div className="start-menu__banner" aria-hidden="true">
        <span className="start-menu__banner-text">Windows</span>
      </div>
      <div className="start-menu__items">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="start-menu__item"
            role="menuitem"
            onClick={(event) => {
              event.preventDefault()
              scrollToAnchor(item.href)
              onClose()
            }}
          >
            {item.label}
          </a>
        ))}
        <div className="start-menu__separator" aria-hidden="true" />
        <div
          className="start-menu__item"
          role="menuitem"
          tabIndex={0}
          onClick={() => onClose()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onClose()
            }
          }}
        >
          🔌&nbsp; Desligar
        </div>
      </div>
    </div>
  )
}
