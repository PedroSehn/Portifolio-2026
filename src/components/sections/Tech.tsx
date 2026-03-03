import { useEffect, useMemo, useState } from 'react'
import Window from '../ui/Window'
import { techCategories } from '../../data/techs'
import type { TechCategory } from '../../types'

const menuItems = ['Arquivo', 'Editar', 'Exibir', 'Ajuda']

interface TechProps {
  isActive?: boolean
  onActivate?: () => void
}

export default function Tech({ isActive, onActivate }: TechProps) {
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

  const statusBar = useMemo(
    () => [
      `${activeCategory.techs.length} objetos`,
      selectedTech ? `${selectedTech} selecionado` : 'Selecione um item',
    ],
    [activeCategory.techs.length, selectedTech],
  )

  return (
    <section id="tech" aria-labelledby="tech-title" className="flex justify-center">
      <div className="w-full max-w-[600px]">
        <Window
          icon="⚙️"
          title="Explorador — Tecnologias"
          className="w-full"
          statusBar={statusBar}
          menuItems={menuItems}
          isActive={isActive}
          onActivate={onActivate}
        >
          <div className="flex flex-col md:flex-row min-h-[280px]">
            <aside
              className="w-full md:w-[150px] border-r border-win-dark bg-win-gray shadow-inner overflow-hidden"
              aria-label="Categorias de tecnologia"
            >
              <div className="px-3 py-2 text-[11px] font-bold text-win-darker uppercase tracking-[0.2em]">
                Todas as Pastas
              </div>
              <ul className="flex flex-col" role="listbox">
                {techCategories.map((category) => {
                  const isActiveCategory = category.id === activeCategoryId
                  return (
                    <li
                      key={category.id}
                      role="option"
                      aria-selected={isActiveCategory}
                      tabIndex={0}
                      className={`flex items-center gap-2 px-3 py-2 text-[11px] cursor-pointer ${
                        isActiveCategory
                          ? 'bg-win-navy text-white'
                          : 'text-win-darker hover:bg-[#00008015]'
                      }`}
                      onClick={() => setActiveCategoryId(category.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          setActiveCategoryId(category.id)
                        }
                      }}
                    >
                      <span aria-hidden="true">📂</span>
                      {category.label}
                    </li>
                  )
                })}
              </ul>
            </aside>

            <main
              className="flex-1 bg-white shadow-sunken p-3 overflow-hidden"
              aria-label="Tecnologias da categoria selecionada"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" role="list">
                {activeCategory.techs.map((tech) => {
                  const isSelected = tech.name === selectedTech
                  return (
                    <button
                      key={tech.name}
                      type="button"
                      className={`flex flex-col items-center gap-1 border rounded-sm p-3 text-center text-[10px] focus:outline-none focus-visible:ring-1 focus-visible:ring-win-blue transition ${
                        isSelected
                          ? 'border-win-navy bg-[#00008015]'
                          : 'border-transparent hover:border-[#00008040]'
                      }`}
                      aria-pressed={isSelected}
                      aria-label={tech.name}
                      onClick={(event) => {
                        event.stopPropagation()
                        setSelectedTech(tech.name)
                      }}
                    >
                      <span className="text-[28px]" aria-hidden="true">
                        {tech.icon}
                      </span>
                      <span className="overflow-hidden text-ellipsis">{tech.name}</span>
                    </button>
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
