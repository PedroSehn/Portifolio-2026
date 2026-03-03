const icons = [
  { emoji: '💼', label: 'Portfólio', href: '#hero' },
  { emoji: '📁', label: 'Projetos', href: '#projects' },
  { emoji: '✉️', label: 'Contato', href: '#contact' },
  { emoji: '🐙', label: 'GitHub', href: 'https://github.com' },
]

export default function DesktopIcons() {
  return (
    <nav
      className="desktop-icons hidden md:flex fixed top-5 left-[14px] flex-col gap-[18px] z-10"
      aria-label="Atalhos da área de trabalho"
    >
      {icons.map((icon) => (
        <a
          key={icon.label}
          href={icon.href}
          className="desktop-icon inline-flex flex-col items-center gap-1 w-[68px] text-center text-[11px]"
        >
          <span className="text-[30px] leading-none" aria-hidden="true">
            {icon.emoji}
          </span>
          <span
            className="text-white text-[11px] font-semibold"
            style={{ textShadow: '1px 1px 1px black' }}
          >
            {icon.label}
          </span>
        </a>
      ))}
    </nav>
  )
}
