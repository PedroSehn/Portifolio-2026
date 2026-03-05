import Button from '../ui/Button'
import Window from '../ui/Window'
import { defaultWindowMenu } from '../../constants/windowMenu'

interface AboutProps {
  isActive?: boolean
  onActivate?: () => void
}

export default function About({ isActive, onActivate }: AboutProps) {
  return (
    <section id="about" aria-labelledby="about-title">
      <Window
        icon="👤"
        title="Sobre Mim"
        className="grid"
        menuItems={defaultWindowMenu}
        statusBar={['Fullstack', '5 anos exp']}
        isActive={isActive}
        onActivate={onActivate}
      >
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

          <div className="flex flex-col gap-2" >
            <h2 id="about-title" className="text-[22px] font-bold leading-none">
              Oi, eu sou o Pedro!
            </h2>
            <p className="text-[13px] font-bold text-win-navy">
              Fullstack Developer — 5 anos de tecnologia aplicada
            </p>
            <hr className="border-t border-win-dark" />
            <p className="text-[12px] leading-relaxed text-win-darker bg-white p-4 font-bold max-w-[1700px]" style={{ boxShadow: 'var(--sunken)' }}>
              Sou o tipo de dev que gosta de entender o sistema inteiro, do banco até a interface.

              Trabalho principalmente com React, Node.js e TypeScript, construindo e mantendo aplicações usadas em produção. Já participei de projetos que somam 200k+ acessos mensais, com foco em manter o código simples, testável e estável ao longo do tempo.

              No dia a dia tento equilibrar três coisas: arquitetura que não vira dívida técnica, interfaces que realmente funcionam para quem usa, e código que outro dev consiga abrir daqui a um ano sem querer me xingar.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button href="#">🐙 GitHub</Button>
            <Button href="#">💼 LinkedIn</Button>
            <Button href="#">📧 E-mail</Button>
          </div>
        </div>
      </Window>
    </section>
  )
}
