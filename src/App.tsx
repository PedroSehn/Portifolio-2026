import { useState } from 'react'
import Desktop from './components/layout/Desktop'
import DesktopIcons from './components/layout/DesktopIcons'
import Taskbar from './components/layout/Taskbar'
import StartMenu from './components/layout/StartMenu'
import Hero from './components/sections/Hero'
// import About from './components/sections/About'
import Tech from './components/sections/Tech'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'
import GifPreviewWindow from './components/sections/GifPreviewWindow'

function App() {
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [activeWindow, setActiveWindow] = useState<string | null>('hero')

  return (
    <>
      <DesktopIcons />
      <Desktop>
        <Hero
          isActive={activeWindow === 'hero'}
          onActivate={() => setActiveWindow('hero')}
        />
        {/* <About
          isActive={activeWindow === 'about'}
          onActivate={() => setActiveWindow('about')}
        /> */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
          <Tech
            isActive={activeWindow === 'tech'}
            onActivate={() => setActiveWindow('tech')}
          />
          <div className="hidden lg:block">
            <GifPreviewWindow
              isActive={activeWindow === 'gif'}
              onActivate={() => setActiveWindow('gif')}
            />
          </div>
        </div>
        <Projects
          isActive={activeWindow === 'projects'}
          onActivate={() => setActiveWindow('projects')}
        />
        <Contact
          isActive={activeWindow === 'contact'}
          onActivate={() => setActiveWindow('contact')}
        />
      </Desktop>
      <Taskbar
        onStartToggle={() => setStartMenuOpen((state) => !state)}
        startMenuOpen={startMenuOpen}
      />
      <StartMenu isOpen={startMenuOpen} onClose={() => setStartMenuOpen(false)} />
    </>
  )
}

export default App
