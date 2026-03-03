import { useEffect } from 'react'

interface StartMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  { label: '💻 Portfólio', href: '#hero' },
  // { label: '👤 Sobre Mim', href: '#about' },
  { label: '⚙️ Tecnologias', href: '#tech' },
  { label: '📁 Projetos', href: '#projects' },
  { label: '✉️ Contato', href: '#contact' },
  { label: '🔌 Desligar', href: '#' },
]

export default function StartMenu({ isOpen, onClose }: StartMenuProps) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element | null
      if (target && !target.closest('.start-menu')) {
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
      <div aria-hidden="true" className="start-menu__banner w-[26px] bg-gradient-to-t from-win-navy to-win-blue" />
      <div className="p-2">
        {menuItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block px-3 py-2 text-[11px] font-bold hover:bg-win-navy hover:text-white"
            role="menuitem"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  )
}
