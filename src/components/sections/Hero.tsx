import Button from '../ui/Button'
import Window from '../ui/Window'

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title">
      <Window
        icon="💻"
        title="portfolio.exe"
        statusBar={[
          '5 anos de experiência',
          '30+ projetos entregues',
          '12+ clientes',
        ]}
        className="grid gap-6"
      >
        <div className="grid gap-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-win-dark">
            Disponível para projetos
          </p>
          <h1 id="hero-title" className="text-[48px] font-bold leading-tight">
            Seu Nome
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

        <article className="bg-black p-4 text-[12px] font-mono text-win-gray shadow-sunken">
          <pre>
            <code>
              const dev = {'{'}
              <br />
              {'  '}name: "Seu Nome",
              <br />
              {'  '}role: "Fullstack Dev",
              <br />
              {'  '}years: 5,
              <br />
              {'  '}hire: true,
              <br />
              {'}'}
            </code>
          </pre>
        </article>
      </Window>
    </section>
  )
}
