import ProgressBar from '../ui/ProgressBar'
import Window from '../ui/Window'
import { techs } from '../../data/techs'
import { useProgressBar } from '../../hooks/useProgressBar'

function TechRow({ name, level }: { name: string; level: number }) {
  const { ref, animated } = useProgressBar()

  return (
    <li
      ref={ref}
      className="bg-win-gray shadow-raised p-3 flex flex-col gap-2 text-[11px]"
    >
      <span className="font-bold">{name}</span>
      <ProgressBar value={level} animated={animated} />
      <span className="text-[10px] text-win-dark text-right">{level}%</span>
    </li>
  )
}

export default function Tech() {
  return (
    <section id="tech" aria-labelledby="tech-title">
      <Window icon="⚙️" title="Tecnologias">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 list-none p-0">
          {techs.map((tech) => (
            <TechRow key={tech.name} name={tech.name} level={tech.level} />
          ))}
        </ul>
      </Window>
    </section>
  )
}
