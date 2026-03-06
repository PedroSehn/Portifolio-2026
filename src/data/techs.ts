import type { TechCategory } from '../types'

export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    techs: [
      { name: 'TypeScript', icon: '🔷' },
      { name: 'JavaScript', icon: '📜' },
      { name: 'React', icon: '⚛️' },
      { name: 'Angular', icon: '🅰️' },
      { name: 'HTML5', icon: '🌐' },
      { name: 'CSS3', icon: '🎨' },
      { name: 'Tailwind CSS', icon: '💨' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    techs: [
      { name: 'Node.js', icon: '💚' },
      { name: 'PHP', icon: '🐘' },
      { name: 'REST API', icon: '🔗' },
      { name: 'WebSockets', icon: '🔌' },
      { name: 'MongoDB', icon: '🍃' },
      { name: 'SQL', icon: '🗄️' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    techs: [
      { name: 'Docker', icon: '🐳' },
      { name: 'Git', icon: '🔧' },
      { name: 'Linux', icon: '🐧' },
      { name: 'CI/CD', icon: '🔄' },
      { name: 'Automated Testing', icon: '🧪' },
      { name: 'LLM Integration', icon: '🤖' },
      { name: 'Cursor', icon: '🖱️' },
      { name: 'Claude', icon: '🤖' },
    ],
  },
]
