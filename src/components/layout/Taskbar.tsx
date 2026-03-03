import { useEffect, useState } from 'react'
import { useClock } from '../../hooks/useClock'

interface TaskbarProps {
  onStartToggle: () => void
  startMenuOpen: boolean
}

const navLinks = [
  { href: '#hero', label: '💻 portfolio.exe' },
  // { href: '#about', label: '👤 Sobre Mim' },
  { href: '#tech', label: '⚙️ Tecnologias' },
  { href: '#projects', label: '📁 Projetos' },
  { href: '#contact', label: '✉️ Contato' },
]

export default function Taskbar({ onStartToggle, startMenuOpen }: TaskbarProps) {
  const clock = useClock()
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isAnimating) return undefined

    const timer = window.setTimeout(() => {
      setIsAnimating(false)
    }, 220)

    return () => window.clearTimeout(timer)
  }, [isAnimating])

  return (
    <footer
      className="taskbar fixed bottom-0 left-0 right-0 h-[30px] bg-win-gray border-t-2 border-win-white shadow-inner z-[9999] flex items-center gap-2 px-3"
      role="navigation"
      aria-label="Barra de tarefas"
    >
      <button
        type="button"
        className={`taskbar__start-btn inline-flex items-center gap-2 px-3 py-1 bg-win-gray shadow-raised h-[22px] text-[11px] font-bold ${
          isAnimating ? 'taskbar__start-btn--active' : ''
        }`}
        onClick={(event) => {
          event.stopPropagation()
          setIsAnimating(true)
          onStartToggle()
        }}
        aria-haspopup="true"
        aria-expanded={startMenuOpen}
      >
        <span className="grid grid-cols-2 gap-1 w-4 h-4">
          <span className="block bg-red-500" />
          <span className="block bg-green-600" />
          <span className="block bg-blue-600" />
          <span className="block bg-yellow-500" />
        </span>
        Iniciar
      </button>

      <div className="h-[22px] border-r border-win-dark opacity-80" aria-hidden="true" />

      <div className="flex items-center gap-1 overflow-hidden">
        {navLinks.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="taskbar__btn inline-flex items-center gap-1 px-3 py-1 bg-win-gray shadow-raised text-[11px] truncate"
          >
            {item.label}
          </a>
        ))}
      </div>

      <div className="ml-auto px-3 py-1 bg-win-gray shadow-sunken text-[11px] select-none">
        {clock}
      </div>
    </footer>
  )
}
