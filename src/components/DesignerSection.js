'use client'

import { useRef } from 'react'

const DesignerSection = () => {
  const imageRef = useRef(null)

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e2e2e2] py-20 px-4">
      <div className="flex flex-col md:flex-row items-center md:space-x-12 space-y-8 md:space-y-0">
        {/* Image Section without Parallax Effect */}
        <div className="w-64 h-64 md:w-80 md:h-80 bg-black overflow-hidden">
          <img 
            ref={imageRef}
            src="/myimage.jpg" 
            alt="Designer" 
            className="w-[100%] h-[100%] object-cover -translate-x-[0%] -translate-y-[0%] filter grayscale-[80%] transition-all duration-300 hover:filter-none"
            style={{ transform: 'translateY(0px)' }}
          />
        </div>

        {/* Text Section */}
        <div className="text-left md:text-left">
          <h1 className="text-5xl md:text-8xl font-bold text-[#05204a]" style={{ fontFamily: 'Tomorrow' }}>
            THE
            <br />
            DESIGNER
          </h1>
          <h2 className="text-3xl md:text-6xl font-bold mt-4 bg-white p-4" style={{ fontFamily: 'RetroPix' }}>
            DIVYAM GOYAL
          </h2>
        </div>
      </div>
    </div>
  )
}

export default DesignerSection