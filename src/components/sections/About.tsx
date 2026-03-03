import Button from '../ui/Button'
import Window from '../ui/Window'

interface AboutProps {
  isActive?: boolean
  onActivate?: () => void
}

export default function About({ isActive, onActivate }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-title">
      <Window icon="👤" title="Sobre Mim" className="grid" isActive={isActive} onActivate={onActivate}>
        <div className="grid md:grid-cols-[auto,1fr] gap-6">
          <div
            className="w-[180px] h-[220px] bg-gradient-to-br from-[#a0a0a0] to-[#d0d0d0] shadow-sunken flex flex-col items-center justify-center gap-2"
            aria-hidden="true"
          >
            <span className="text-[52px] font-bold text-[#404040]">SN</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-[#606060]">
              Foto
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <h2 id="about-title" className="text-[22px] font-bold leading-none">
              Seu Nome
            </h2>
            <p className="text-[13px] font-bold text-win-navy">
              Fullstack Developer — 5 anos de experiência
            </p>
            <hr className="border-t border-win-dark" />
            <p className="text-[12px] leading-relaxed text-win-darker">
              Construo produtos digitais do banco de dados ao pixel — com foco em
              código limpo, arquitetura sólida e interfaces que funcionam de
              verdade.
            </p>
            <div className="flex flex-wrap gap-2">
              <Button href="#">🐙 GitHub</Button>
              <Button href="#">💼 LinkedIn</Button>
              <Button href="#">📧 E-mail</Button>
            </div>
          </div>
        </div>
      </Window>
    </section>
  )
}
