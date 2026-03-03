import type { MouseEventHandler, ReactNode } from 'react'

type Variant = 'default' | 'primary'

interface ButtonProps {
  variant?: Variant
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  className?: string
}

const variantStyles: Record<Variant, string> = {
  default: 'bg-win-gray shadow-raised',
  primary: 'bg-win-gray shadow-raised font-bold ring-1 ring-black',
}

export default function Button({
  href,
  variant = 'default',
  onClick,
  className = '',
  children,
  type,
}: ButtonProps) {
  const content = (
    <span className={`inline-flex items-center gap-2 px-4 py-1 text-[11px] ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('mailto:')
    return (
      <a
        className="inline-flex"
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      type={type ?? 'button'}
      className={`inline-flex ${variantStyles[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
