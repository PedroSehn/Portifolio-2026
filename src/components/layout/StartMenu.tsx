import { useEffect } from 'react'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: '👤 Sobre Mim', href: '#about' },
  { label: '⚙️ Tecnologias', href: '#tech' },
  { label: '📁 Projetos', href: '#projects' },
  { label: '✉️ Contato', href: '#contact' },
]

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
    <div
      className="start-menu fixed bottom-[30px] left-0 w-[220px] bg-win-gray border-2 border-win-white border-r-win-dark border-b-win-dark shadow-win-outer z-[10000] animate-menu-pop"
      hidden={!isOpen}
      role="menu"
      aria-label="Menu Iniciar"
    >
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
            onClick={onClose}
          >
            {item.label}
          </a>
        ))}
        <div className="start-menu__separator" aria-hidden="true" />
        <div
          className="start-menu__item"
          role="menuitem"
          onClick={onClose}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              onClose()
            }
          }}
        >
          <span>🔌&nbsp; Desligar</span>
        </div>
      </div>
    </div>
  )
}
