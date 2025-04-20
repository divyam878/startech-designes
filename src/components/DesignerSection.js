'use client'

import { useEffect, useRef } from 'react'

const DesignerSection = () => {
  const imageRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const scrollPosition = window.scrollY
        imageRef.current.style.transform = `translateY(${200 - scrollPosition * 0.2}px)` // Adjusted to move down
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="flex items-center justify-center h-screen bg-[#e2e2e2]">
      <div className="flex items-center space-x-12">
        {/* Image Section with Parallax Effect */}
        <div className="w-80 h-80 bg-black overflow-hidden">
          <img 
            ref={imageRef}
            src="/myimage.jpg" 
            alt="Designer" 
            className="w-full h-full object-cover"
            style={{ transform: 'translateY(0px)' }} // Initial position set to center
          />
        </div>

        {/* Text Section */}
        <div className="text-left">
          <h1 className="text-8xl font-bold text-[#3730ff]" style={{ fontFamily: 'Tomorrow' }}>
            THE
            <br />
            DESIGNER
          </h1>
          <h2 className="text-6xl font-bold mt-4 bg-white p-4" style={{ fontFamily: 'RetroPix' }}>
            DIVYAM GOYAL
          </h2>
        </div>
      </div>
    </div>
  )
}

export default DesignerSection