import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { defaultWindowMenu } from '../../constants/windowMenu'
import { techCategories } from '../../data/techs'
import type { TechCategory } from '../../types'
import Window from '../ui/Window'

interface TechProps {
  isActive?: boolean
  onActivate?: () => void
}

export default function Tech({ isActive = true, onActivate }: TechProps) {
  const [activeCategoryId, setActiveCategoryId] = useState(techCategories[0].id)
  const [selectedTech, setSelectedTech] = useState<string | null>(null)

  const activeCategory: TechCategory = useMemo(
    () =>
      techCategories.find((category) => category.id === activeCategoryId) ??
      techCategories[0],
    [activeCategoryId],
  )

  useEffect(() => {
    setSelectedTech(null)
  }, [activeCategoryId])

  const handleCategorySelect = (categoryId: string) => {
    setActiveCategoryId(categoryId)
    onActivate?.()
  }

  const handleTechSelect = (techName: string) => {
    setSelectedTech(techName)
    onActivate?.()
  }

  const handleOptionKeyDown = (
    event: KeyboardEvent<HTMLElement>,
    action: () => void,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      action()
    }
  }

  return (
    <section id="tech" aria-labelledby="tech-title" className="flex justify-center px-2">
      <div className="w-full max-w-[600px]">
        <Window
          icon="📁"
          title="Explorador — Tecnologias"
          isActive={isActive}
          onActivate={onActivate}
          menuItems={defaultWindowMenu}
          statusBar={[`${activeCategory.techs.length} objetos`]}
          className="w-full"
        >
          <div className="explorer">
            <aside className="explorer__sidebar" aria-label="Categorias">
              <div className="explorer__sidebar-header">Todas as Pastas</div>
              <ul role="listbox" aria-label="Categorias de tecnologia">
                {techCategories.map((category) => {
                  const isActiveCategory = category.id === activeCategoryId
                  return (
                    <li
                      key={category.id}
                      role="option"
                      aria-selected={isActiveCategory}
                      data-cat={category.label}
                      tabIndex={0}
                      className={`sidebar-item ${isActiveCategory ? 'sidebar-item--active' : ''}`}
                      onClick={() => handleCategorySelect(category.id)}
                      onKeyDown={(event) =>
                        handleOptionKeyDown(event, () => handleCategorySelect(category.id))
                      }
                    >
                      <span aria-hidden="true">📂</span>
                      {category.label}
                    </li>
                  )
                })}
              </ul>
            </aside>

            <main className="explorer__content" aria-label="Tecnologias da categoria selecionada">
              <div className="file-grid" role="list">
                {activeCategory.techs.map((tech) => {
                  const isSelected = tech.name === selectedTech
                  return (
                    <div
                      key={tech.name}
                      role="option"
                      aria-selected={isSelected}
                      tabIndex={0}
                      className={`file-icon ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleTechSelect(tech.name)}
                      onKeyDown={(event) =>
                        handleOptionKeyDown(event, () => handleTechSelect(tech.name))
                      }
                    >
                      <span className="file-icon__img" aria-hidden="true">
                        {tech.icon}
                      </span>
                      <span className="file-icon__name">{tech.name}</span>
                    </div>
                  )
                })}
              </div>
            </main>
          </div>
        </Window>
      </div>
    </section>
  )
}
