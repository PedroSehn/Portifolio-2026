import { useState } from 'react'
import directoryIcon from '../../assets/directory_admin_tools-5.png'
import globeIcon from '../../assets/globe_map-0.png'
// import helpBookIcon from '../../assets/help_book_cool-4.png'
// import msnPreview from '../../assets/msn3-5.png'
import outlookIcon from '../../assets/outlook_express-5.png'
import githubIcon from '../../assets/github-5.png'
import whatsappIcon from '../../assets/wpp.png'
type DesktopIcon = {
  label: string
  href: string
  blank?: boolean
  emoji?: string
  imageSrc?: string
}

const icons: DesktopIcon[] = [
  {
    imageSrc: globeIcon,
    label: 'Portfólio',
    href: '#hero',
  },
  {
    imageSrc: directoryIcon,
    label: 'Projetos',
    href: '#projects',
  },
  {
    imageSrc: outlookIcon,
    label: 'Contato',
    href: '#contact',
  },
  {
    imageSrc: githubIcon,
    label: 'GitHub',
    href: 'https://github.com/PedroSehn',
    blank: true,
  },
  {
    imageSrc: whatsappIcon,
    label: 'Whatsapp',
    href: 'https://wa.me/5551984574823',
    blank: true,
  },
]

export default function DesktopIcons() {
  const [activeHref, setActiveHref] = useState('')

  return (
    <nav
      className="desktop-icons hidden md:flex"
      aria-label="Atalhos da área de trabalho"
    >
      {icons.map((icon) => {
        const isActive = activeHref === icon.href
        return (
          <a
            key={icon.label}
            href={icon.href}
            target={icon.blank ? '_blank' : '_self'}
            className={`desktop-icon inline-flex flex-col items-center gap-1 w-[68px] text-center text-[11px] ${
              isActive ? 'desktop-icon--active' : ''
            }`}
            onFocus={() => setActiveHref(icon.href)}
          >
            {icon.imageSrc ? (
              <img
                src={icon.imageSrc}
                alt=""
                className="desktop-icon__img h-[40px] w-[40px] object-contain"
                aria-hidden="true"
              />
            ) : (
              <span className="text-[30px] leading-none desktop-icon__img" aria-hidden="true">
                {icon.emoji}
              </span>
            )}
            <span className="text-white text-[11px] font-semibold desktop-icon__label">
              {icon.label}
            </span>
          </a>
        )
      })}
    </nav>
  )
}
