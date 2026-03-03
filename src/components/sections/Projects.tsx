import Button from '../ui/Button'
import Tag from '../ui/Tag'
import Window from '../ui/Window'
import { projects } from '../../data/projects'
import type { Project } from '../../types'

interface ProjectsProps {
  isActive?: boolean
  onActivate?: () => void
}

function ProjectCard({ project }: { project: Project }) {
  const gradient = `linear-gradient(90deg, ${project.color}, ${project.color}99)`
  const preview = `linear-gradient(160deg, ${project.color}22, #00000808)`

  return (
    <article className="bg-win-gray shadow-raised p-3 flex flex-col gap-2">
      <div
        className="flex items-center justify-between gap-2 px-2 py-1 text-[10px] font-bold uppercase border border-win-dark shadow-groupbox"
        style={{ background: gradient }}
      >
        <div>{project.title}</div>
        <div className="flex gap-1" aria-hidden="true">
          <span className="w-3 h-3 bg-win-gray shadow-raised" />
          <span className="w-3 h-3 bg-win-gray shadow-raised" />
          <span className="w-3 h-3 bg-win-gray shadow-raised" />
        </div>
      </div>
      <div
        className="h-[90px] shadow-sunken rounded-sm"
        style={{ background: preview }}
        aria-hidden="true"
      />
      <p className="text-[11px] leading-relaxed">{project.desc}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="flex gap-2">
        <Button href={project.demo}>▶ Demo</Button>
        <Button href={project.repo}>🐙 GitHub</Button>
      </div>
    </article>
  )
}

export default function Projects({ isActive, onActivate }: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <Window
        icon="📁"
        title="Projetos — Windows Explorer"
        isActive={isActive}
        onActivate={onActivate}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Window>
    </section>
  )
}
