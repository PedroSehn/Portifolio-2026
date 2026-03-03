import { useState } from 'react'
import Desktop from './components/layout/Desktop'
import DesktopIcons from './components/layout/DesktopIcons'
import Taskbar from './components/layout/Taskbar'
import StartMenu from './components/layout/StartMenu'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Tech from './components/sections/Tech'
import Projects from './components/sections/Projects'
import Contact from './components/sections/Contact'

function App() {
  const [startMenuOpen, setStartMenuOpen] = useState(false)

  return (
    <>
      <DesktopIcons />
      <Desktop>
        <Hero />
        <About />
        <Tech />
        <Projects />
        <Contact />
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
