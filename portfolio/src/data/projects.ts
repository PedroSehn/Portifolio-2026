import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'saas-dashboard',
    num: '01',
    title: 'SaaS Dashboard',
    desc: 'Analytics em tempo real para e-commerce com relatórios e permissões granulares.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    color: '#000080',
    demo: '#',
    repo: '#',
  },
  {
    id: 'api-gateway',
    num: '02',
    title: 'API Gateway',
    desc: 'Microsserviço com rate limiting, JWT e documentação OpenAPI automática.',
    tags: ['Node.js', 'Docker', 'Redis'],
    color: '#006400',
    demo: '#',
    repo: '#',
  },
  {
    id: 'devcollab',
    num: '03',
    title: 'DevCollab',
    desc: 'Plataforma colaborativa com gestão de sprints e notificações via WebSocket.',
    tags: ['React', 'Python', 'FastAPI'],
    color: '#800000',
    demo: '#',
    repo: '#',
  },
]
