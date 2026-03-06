import Button from '../ui/Button'
import Tag from '../ui/Tag'
import Window from '../ui/Window'
import { defaultWindowMenu } from '../../constants/windowMenu'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import githubIcon from '../../assets/github-5.png'

interface ProjectsProps {
  isActive?: boolean
  onActivate?: () => void
}

interface ProjectCardProps {
  project: Project
  isActive?: boolean
}

function ProjectCard({ project, isActive }: ProjectCardProps) {
  const preview = `linear-gradient(160deg, ${project.color}22, #00000808)`

  return (
    <Window
      icon=""
      title={project.title}
      className="h-full"
      contentClassName="flex h-fit flex-col gap-3 px-4 py-4"
      isActive={isActive ?? true}
      showTitleButtons={false}
    >
      <div
        className="h-[130px] rounded-sm shadow-sunken"
        style={{ background: preview }}
        aria-hidden="true"
      />
      <p className="text-[11px] leading-relaxed">{project.desc}</p>
      <div className="flex flex-wrap gap-1">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <div className="mt-auto flex gap-2">
        <Button href={project.demo}>▶ Demo</Button>
        <Button href={project.repo}>
          <img
            src={githubIcon}
            alt=""
            aria-hidden="true"
            className="h-3 w-3 object-contain"
          />
          GitHub
        </Button>
      </div>
    </Window>
  )
}

export default function Projects({ isActive, onActivate }: ProjectsProps) {
  return (
    <section id="projects" aria-labelledby="projects-title">
      <Window
        icon="📁"
        title="Projetos — Windows Explorer"
        menuItems={defaultWindowMenu}
        statusBar={[`${projects.length} projetos`]}
        isActive={isActive}
        onActivate={onActivate}
      className="w-full min-h-[480px] lg-h-[480px]"
      contentClassName="flex flex-col flex-1 min-h-0 gap-3 px-6 py-5"
      >
        <div className="grid flex-1 min-h-0 grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isActive={isActive ?? true}
            />
          ))}
        </div>
      </Window>
    </section>
  )
}
