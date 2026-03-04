import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import Window from '../ui/Window'
import { defaultWindowMenu } from '../../constants/windowMenu'

const TOKENS: { text: string; type: 'keyword' | 'variable' | 'property' | 'string' | 'number' | 'boolean' | 'punctuation' }[] = [
  { text: 'const ', type: 'keyword' },
  { text: 'dev', type: 'variable' },
  { text: ' = {\n', type: 'punctuation' },
  { text: '  ', type: 'punctuation' },
  { text: 'nome', type: 'property' },
  { text: ': "', type: 'punctuation' },
  { text: 'Pedro Sehn', type: 'string' },
  { text: '",\n', type: 'punctuation' },
  { text: '  ', type: 'punctuation' },
  { text: 'cargo', type: 'property' },
  { text: ': "', type: 'punctuation' },
  { text: 'Desenvolvedor Fullstack', type: 'string' },
  { text: '",\n', type: 'punctuation' },
  { text: '  ', type: 'punctuation' },
  { text: 'anosDeExperiencia', type: 'property' },
  { text: ': ', type: 'punctuation' },
  { text: '3', type: 'number' },
  { text: ',\n', type: 'punctuation' },
  { text: '  ', type: 'punctuation' },
  { text: 'contratar', type: 'property' },
  { text: ': ', type: 'punctuation' },
  { text: 'true', type: 'boolean' },
  { text: ',\n', type: 'punctuation' },
  { text: '}; 👻', type: 'punctuation' },
]

const PROMPT_TEXT = TOKENS.map((t) => t.text).join('')

const TYPING_INTERVAL_MS = 40
const CURSOR_BLINK_MS = 530

interface HeroProps {
  isActive?: boolean
  onActivate?: () => void
}

export default function Hero({ isActive, onActivate }: HeroProps) {
  const [visibleLength, setVisibleLength] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)

  useEffect(() => {
    if (visibleLength < PROMPT_TEXT.length) {
      const t = setTimeout(
        () => setVisibleLength((n) => n + 1),
        TYPING_INTERVAL_MS
      )
      return () => clearTimeout(t)
    }
  }, [visibleLength])

  useEffect(() => {
    const t = setInterval(
      () => setCursorVisible((v) => !v),
      CURSOR_BLINK_MS
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section id="hero" aria-labelledby="hero-title">
      <Window
        icon="💻"
        title="portfolio.exe"
        contentClassName="px-6 py-5"
        menuItems={defaultWindowMenu}
        statusBar={[
          '3 anos de experiência',
          '30+ projetos entregues',
          '12+ clientes',
        ]}
        isActive={isActive}
        onActivate={onActivate}
      >
        <div className="flex flex-col gap-4 md:flex-row md:gap-x-4 md:gap-y-6 md:items-center lg:px-8">
          <div className="flex flex-1 min-w-0 flex-col gap-4">
            <p className="text-[10px] uppercase tracking-[0.2em] text-win-dark">
              Disponível para projetos
            </p>
            <h1 id="hero-title" className="text-[48px] font-bold leading-tight">
              Pedro Sehn
            </h1>
            <p className="text-[16px] font-bold text-win-navy">
              Fullstack Developer
            </p>
            <div className="flex gap-2">
              <Button variant="primary" href="#projects">
                📁 Ver Projetos
              </Button>
              <Button href="#contact">✉️ Contato</Button>
            </div>
          </div>

          <article className="shrink-0 bg-[#282c34] p-6 text-[16px] font-mono leading-relaxed shadow-sunken md:min-w-[440px] lg:min-h-[195px]">
            <pre className="overflow-hidden">
              <code>
                {(() => {
                  let pos = 0
                  return TOKENS.map((token, i) => {
                    const end = pos + token.text.length
                    let visible: string
                    if (visibleLength >= end) {
                      visible = token.text
                    } else if (visibleLength > pos) {
                      visible = token.text.slice(0, visibleLength - pos)
                    } else {
                      return null
                    }
                    pos = end
                    return (
                      <span key={i} className={`code-${token.type}`}>
                        {visible}
                      </span>
                    )
                  })
                })()}
                <span
                  className={`inline-block w-[0.55ch] min-h-[1em] -mb-[0.1em] align-baseline bg-[#abb2bf] transition-opacity duration-75 ${
                    cursorVisible ? 'opacity-100' : 'opacity-0'
                  }`}
                  aria-hidden
                />
              </code>
            </pre>
          </article>
        </div>
      </Window>
    </section>
  )
}
