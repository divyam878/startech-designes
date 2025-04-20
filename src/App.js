'use client'

import DesignerSection from './components/DesignerSection'
import Navbar from './components/Navbar'
import Scene from './components/Scene'

const App = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc] overflow-y-auto">
      <Navbar />
      <Scene />
      <DesignerSection />
    </div>
  )
}

export default App