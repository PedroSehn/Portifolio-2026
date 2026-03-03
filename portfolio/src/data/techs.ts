import type { TechCategory } from '../types'

export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    techs: [
      { name: 'JavaScript', icon: '📜' },
      { name: 'TypeScript', icon: '🔷' },
      { name: 'React', icon: '⚛️' },
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '🎨' },
      { name: 'Next.js', icon: '▲' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    techs: [
      { name: 'Node.js', icon: '💚' },
      { name: 'Python', icon: '🐍' },
      { name: 'PostgreSQL', icon: '🐘' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'REST API', icon: '🔗' },
      { name: 'GraphQL', icon: '◈' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps',
    techs: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Git', icon: '🔧' },
      { name: 'Linux', icon: '🐧' },
      { name: 'AWS', icon: '☁️' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'Nginx', icon: '⚡' },
    ],
  },
]
