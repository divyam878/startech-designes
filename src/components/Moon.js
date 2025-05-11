'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'

const WebsiteDesignSection = ({ onContactClick }) => {
  const [currentWord, setCurrentWord] = useState('DESIGN')
  const [key, setKey] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const words = ['DESIGN', 'DEVELOPMENT', 'DEPLOYMENT']
  
  useEffect(() => {
    let currentIndex = 0
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % words.length
      setCurrentWord(words[currentIndex])
      setKey(prev => prev + 1)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: JSON.stringify({
          access_key: 'fc50b87d-7eee-4609-bdea-b6255b571f81',
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message')
        }),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setIsSubmitted(true)
        setTimeout(() => {
          setIsSubmitted(false)
          setIsModalOpen(false)
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#e2e2e2]">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-4 md:inset-8 w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] h-[calc(85%-2rem)] md:h-[calc(100%-4rem)] object-cover rounded-[1rem] md:rounded-[2rem]"
        style={{
          filter: 'brightness(1)'
        }}
      >
        <source src="/website-design.mp4" type="video/mp4" />
      </video>

      {/* Text Overlay */}
      <div className="relative z-10 h-full flex flex-col items-start justify-end pb-64 sm:justify-center sm:pb-0 px-4 sm:px-6 md:pl-20">
        <h1 className="text-[3.2rem] sm:text-[3.5rem] md:text-[5rem] lg:text-[7rem] xl:text-[10rem] font-bold mb-2 md:-ml-8" 
            style={{ 
              fontFamily: 'Tomorrow-Bold',
              color: '#ffffff',
              lineHeight: '1.1'
            }}>
          WEBSITE
        </h1>
        <div className="flex flex-col space-y-3 sm:space-y-6 md:space-y-8 md:-ml-18 -ml-2">
          {words.map((word, index) => (
            <div 
              key={word}
              className="w-fit bg-[#e2e2e2] px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-[1rem] sm:rounded-[2rem] -ml-2 opacity-0 animate-slideIn"
              style={{
                animationDelay: `${index * 0.3 + 0.5}s`,
                animationFillMode: 'forwards'
              }}
            >
              <h2 
                className="text-[2.2rem] sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] xl:text-[6rem] font-bold whitespace-nowrap ml-2"
                style={{ 
                  fontFamily: 'Tomorrow',
                  color: '#0e1e4d',
                  lineHeight: '1.1'
                }}
              >
                {word}
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Arrow Button - Adjust size for mobile and position */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute bottom-10 left-6 sm:bottom-12 sm:right-12 sm:left-auto z-20 p-5 mb-28 md:mb-0 sm:p-6 rounded-full bg-[#e2e2e2] hover:bg-[#d1d1d1] transition-colors duration-300"
        aria-label="Contact Us"
      >
        <ArrowUpRight size={45} className="text-[#0e1e4d] sm:hidden" />
        <ArrowUpRight size={60} className="text-[#0e1e4d] hidden sm:block" />
      </button>

      {/* Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          ></div>
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-lg animate-modalSlideUp">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-2xl font-bold text-[#0e1e4d] mb-4">Get in Touch</h2>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e1e4d] text-black"
                  required
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e1e4d] text-black"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Mobile Number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e1e4d] text-black"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0e1e4d] text-black"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[#0e1e4d] text-white py-3 rounded-lg hover:bg-[#142a6c] transition-colors duration-300"
                >
                  Send Message
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-checkmark">
                  <svg className="w-16 h-16 text-[#0e1e4d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="mt-4 text-lg font-semibold text-[#0e1e4d]">Form Submitted Successfully!</p>
              </div>
            )}
          </div>
        </div>
      )}

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

        @keyframes slideIn {
          0% {
            opacity: 0;
            transform: translateX(-100%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes modalSlideUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-checkmark {
          animation: checkmark 0.5s ease-out forwards;
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }

        .animate-modalSlideUp {
          animation: modalSlideUp 0.3s ease-out forwards;
        }

        .perspective-[1000px] {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}

export default WebsiteDesignSection