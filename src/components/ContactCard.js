import React, { useState, useEffect, useRef } from 'react';
import './ContactCard.css';

export default function ContactCard({ isVisible, onClose }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const [style, setStyle] = useState({
    bottom: '-100%',
    transition: 'bottom 1s ease-in-out',
  });

  useEffect(() => {
    if (isVisible) {
      setStyle({
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        transition: 'all 1s ease-in-out',
      });
    } else {
      setStyle({
        bottom: '-100%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        transition: 'all 1s ease-in-out',
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <>
      {isVisible && <div className="backdrop" />}
      <div 
        className="contact-card p-4 md:p-8 w-[90%] md:w-[80%] max-w-4xl relative overflow-hidden fixed"
        style={{
          ...style,
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
          borderRadius: '20px',
          transform: `${style.transform} perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'all 0.1s ease-out',
        }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Base metallic layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(145deg, #d4d4d4, #f5f5f5)',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />

        {/* Rainbow hologram layer */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                ${45 + (tilt.x + tilt.y) * 2}deg,
                rgba(255, 0, 255, 0.1),
                rgba(0, 255, 255, 0.1),
                rgba(255, 255, 0, 0.1)
              )
            `,
            opacity: Math.abs(tilt.x / 10) + Math.abs(tilt.y / 10),
            mixBlendMode: 'color-dodge',
            pointerEvents: 'none',
          }}
        />

        {/* Dynamic shimmer effect */}
        <div 
          className="absolute inset-0 shimmer"
          style={{
            background: `
              linear-gradient(
                ${90 + (tilt.y * 5)}deg,
                transparent 0%,
                rgba(255, 255, 255, 0.6) 45%,
                rgba(255, 255, 255, 0.8) 50%,
                rgba(255, 255, 255, 0.6) 55%,
                transparent 100%
              )
            `,
            backgroundSize: '200% 200%',
            animation: 'shimmer 1.5s infinite',
            opacity: 0.5 + Math.abs(tilt.x / 20) + Math.abs(tilt.y / 20),
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />

        {/* Micro texture pattern */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                ${45 + (tilt.x + tilt.y) * 2}deg,
                transparent 0px,
                rgba(255, 255, 255, 0.1) 1px,
                transparent 2px
              )
            `,
            backgroundSize: '4px 4px',
            opacity: 0.3,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />

        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 shimmer"
          style={{
            background: `linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.2) 15%,
              rgba(255, 255, 255, 0.4) 30%,
              rgba(255, 255, 255, 0.2) 45%,
              transparent 100%
            )`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 3s infinite',
            opacity: Math.abs(tilt.x / 20) + Math.abs(tilt.y / 20), // Opacity based on tilt
            pointerEvents: 'none',
          }}
        />

        {/* Star background */}
        <div className="stars-container absolute inset-0 overflow-hidden opacity-5">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star absolute bg-white rounded-full"
              style={{
                width: '2px',
                height: '2px',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 3 + 2}s infinite`
              }}
            />
          ))}
        </div>

        <div className="card-header flex flex-col md:flex-row items-center md:ml-72 justify-center gap-2 md:gap-4 relative z-10">
          <img 
            src="/starlab-icon.png" 
            alt="Starlab Logo" 
            className="w-20 h-20 md:w-24 md:h-24 object-contain"
          />
          <span 
            style={{ fontFamily: 'Tomorrow-Bold' }} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center md:text-left"
          >
            STAR<span className="text-[#3730FF]">TECH</span> INDUSTRIES
          </span>
        </div>
        <div className="card-footer mt-4 md:mt-8 relative z-10">
          <p className="text-sm md:text-base text-center">
            divyamgoyal878@gmail.com<br />+91 8233120760
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </>
  );
}