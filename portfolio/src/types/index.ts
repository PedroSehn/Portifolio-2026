export interface Technology {
  name: string
  icon: string
}

export interface TechCategory {
  id: string
  label: string
  techs: Technology[]
}

export interface Project {
  id: string
  num: string
  title: string
  desc: string
  tags: string[]
  color: string
  demo: string
  repo: string
}
