'use client'

import { useState, useEffect } from 'react'

const WebsiteDesignSection = () => {
  const [currentWord, setCurrentWord] = useState('DESIGN')
  const [key, setKey] = useState(0)
  const words = ['DESIGN', 'DEVELOPMENT', 'DEPLOYMENT', 'OPTIMIZATION', 'REDESIGN']
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length
      setCurrentWord(words[currentIndex])
      setKey(prev => prev + 1)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#e2e2e2]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover rounded-[1rem] md:rounded-[2rem]"
        style={{
          filter: 'brightness(1)'
        }}
      >
        <source src="/website-design.mp4" type="video/mp4" />
      </video>

      {/* Text Overlay */}
      <div className="relative z-10 h-full flex flex-col items-start justify-center px-6 md:pl-20">
        <h1 className="text-[2.7rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-bold" 
            style={{ 
              fontFamily: 'Tomorrow-Bold',
              color: '#0e1e4d',
              lineHeight: '1.1'
            }}>
          WEBSITE
        </h1>
        <div className="h-[60px] sm:h-[80px] md:h-[120px] lg:h-[140px] xl:h-[180px] overflow-hidden perspective-[1000px]">
          <h1 
            key={key}
            className="text-[2.7rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-bold"
            style={{ 
              fontFamily: 'Tomorrow-Bold',
              color: '#0e1e4d',
              animation: 'slotMachine 0.5s ease-out',
              lineHeight: '1.1'
            }}
          >
            {currentWord}
          </h1>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes slotMachine {
          0% {
            opacity: 1;
            transform: translateY(100%) rotateX(-90deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotateX(0);
          }
        }

        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default WebsiteDesignSection