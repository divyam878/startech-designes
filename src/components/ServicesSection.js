"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Planet component
const Planet = ({ name, color, size, orbitRadius, speed, angle, onClick, children }) => {
  const [currentAngle, setCurrentAngle] = useState(angle);
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate responsive values
  const mobileSize = size * 0.6;
  const mobileOrbitRadius = orbitRadius * 0.9;
  const adjustedCenterX = isMobile ? 15 : 5;
  const adjustedOrbitRadius = isMobile ? mobileOrbitRadius : orbitRadius;
  
  // Calculate position
  const x = adjustedCenterX + Math.cos(currentAngle) * adjustedOrbitRadius;
  const y = 50 + Math.sin(currentAngle) * (adjustedOrbitRadius * 0.3);

  // Orbit animation - drastically reduced speed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAngle(prev => prev + speed);
    }, 50);
    
    return () => clearInterval(interval);
  }, [speed]);
  
  // Custom cursor effect
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor');
    
    if (hover) {
      cursor.style.opacity = '1';
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      
      const handleMouseMove = (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    } else {
      cursor.style.opacity = '0';
      cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    }
  }, [hover]);
  
  return (
    <>
      {/* Planet */}
      <div 
        className="absolute flex items-center justify-center cursor-none transition-transform duration-300"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          width: `${isMobile ? mobileSize : size}px`,
          height: `${isMobile ? mobileSize : size}px`,
          backgroundColor: color,
          borderRadius: '50%',
          transform: `translate(-50%, -50%) ${hover ? 'scale(1.05)' : 'scale(1)'}`,
          zIndex: 10,
          boxShadow: '0 0 20px rgba(0, 0, 255, 0.3)'
        }}
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="text-center text-white font-bold px-2 whitespace-nowrap" 
          style={{ fontSize: isMobile ? '10px' : (size > 100 ? '16px' : '12px') }}>
          {children}
        </div>
      </div>
    </>
  );
};

// Small orbital body (moons, asteroids)
const OrbitalBody = ({ size, orbitRadius, speed, angle, color }) => {
  const [currentAngle, setCurrentAngle] = useState(angle);
  
  // Calculate position based on angle and orbit radius
  // Modified to create true elliptical orbits
  const centerX = 15;
  const x = centerX + Math.cos(currentAngle) * orbitRadius;
  const y = 50 + Math.sin(currentAngle) * (orbitRadius * 0.3); // True elliptical orbit
  
  // Orbit animation - drastically reduced speed
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAngle(prev => prev + speed);
    }, 50);
    
    return () => clearInterval(interval);
  }, [speed]);
  
  return (
    <div 
      className="absolute rounded-full"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        transform: 'translate(-50%, -50%)',
        zIndex: 5
      }}
    />
  );
};

// Service Modal Component
const ServiceModal = ({ service, onClose }) => {
  const containerRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [particles, setParticles] = useState([]);
  
  // Service content based on type
  const serviceContent = {
    'brand': {
      title: 'BRAND & WEB DESIGN',
      color: '#8a9cc0', // Light blue-gray color from image
      description: "I'll take what I've learned about you and craft a unique, awesome website & brand that's tailored to meet your needs & goals. Beautiful, responsive, & fully custom are the defaults.",
      image: '/rover.png', // Replace with your actual image path
      pills: ['Web Design', 'Logos', 'Wireframes', 'Graphic Design', 'Branding & Style']
    },
    'development': {
      title: 'WEB DEVELOPMENT',
      color: '#3730ff', // Blue color from image
      description: "Once the design looks perfect, then we build. I utilize some awesome tools like Webflow to build clean, fast, & responsive websites. My agency Sweven.design is a certified Webflow Expert Enterprise Partner, check us out if you'd like to partner on a project.",
      image: '/satellite.png', // Replace with your actual image path
      pills: ['Web Development', 'Custom CMS', 'Ecommerce', 'Interaction Design', 'Content Creation']
    },
    'support': {
      title: 'ONGOING SUPPORT',
      color: '#f0f0f0', // Light gray color from image
      description: "I will also provide CMS training & support for every client - no more requesting site updates for more of your time and $$$. As a Webflow Expert partner, I don't leave clients high and dry. I'm here to help your business grow, update, create, and thrive in the long run with ongoing support services. Let's keep the party going!",
      image: '/rocket.png', // Replace with your actual image path
      pills: ['SEO', 'Analytics', 'Content Updates', 'Design Updates']
    }
  };
  
  // Move the content variable declaration before useEffect
  const content = serviceContent[service];
  
  // Generate explosion particles on mount
  useEffect(() => {
    // Create random particles for explosion effect
    const particleCount = 40; // Increased particle count
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      // Calculate angle for circular distribution
      const angle = (i / particleCount) * Math.PI * 2;
      const distance = Math.random() * 20 + 10;
      
      newParticles.push({
        id: i,
        size: Math.random() * 15 + 10, // Larger initial size
        x: 50 + Math.cos(angle) * distance * 0.2, // Start near center
        y: 50 + Math.sin(angle) * distance * 0.2,
        targetX: 50 + Math.cos(angle) * distance, // Target position
        targetY: 50 + Math.sin(angle) * distance,
        scale: 1,
        targetScale: Math.random() * 15 + 10, // Target scale much larger
        opacity: 1,
        color: content.color
      });
    }
    
    setParticles(newParticles);
    
    // Set animation complete after longer delay to ensure particles finish first
    const timer = setTimeout(() => {
      setAnimationComplete(true);
      // Clear particles after modal opens
      setTimeout(() => {
        setParticles([]);
      }, 500);
    }, 1000); // Increased delay to 1000ms
    
    return () => clearTimeout(timer);
  }, []);
  
  // Animate particles - updated to grow and expand outward
  useEffect(() => {
    if (particles.length === 0) return;
    
    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles.map(particle => {
          // Move toward target position and grow in size
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          const dScale = particle.targetScale - particle.scale;
          
          return {
            ...particle,
            x: particle.x + dx * 0.05,
            y: particle.y + dy * 0.05,
            size: particle.size + dScale * 0.05,
            opacity: particle.opacity > 0.7 ? particle.opacity - 0.005 : particle.opacity,
          };
        }).filter(particle => particle.opacity > 0)
      );
    };
    
    const interval = setInterval(animateParticles, 16);
    return () => clearInterval(interval);
  }, [particles]);
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInFromRight {
          from { 
            transform: translateX(30px);
            opacity: 0;
          }
          to { 
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes circleExpand {
          from { 
            clip-path: circle(0% at center);
            opacity: 0.9;
          }
          to { 
            clip-path: circle(150% at center);
            opacity: 1;
          }
        }
      `}</style>
      
      {/* Explosion particles - keep as is */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            transform: 'translate(-50%, -50%)',
            zIndex: 60,
            transition: 'width 0.05s, height 0.05s'
          }}
        />
      ))}
      
      {/* Solid Background - changed to circular expansion with longer delay */}
      <div 
        className="absolute inset-0"
        style={{ 
          backgroundColor: content.color,
          animation: 'circleExpand 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          animationDelay: '.5s', // Increased delay to wait for particles
          transformOrigin: 'center',
          opacity: 0 // Start invisible
        }}
      />
      
      {/* Rest of the modal content with increased delayed animations */}
      {/* Diagonal line - hide on mobile */}
      <div className="hidden md:block absolute inset-0 overflow-hidden" style={{ 
        opacity: animationComplete ? 1 : 0, 
        transition: 'opacity 0.5s',
        visibility: animationComplete ? 'visible' : 'hidden'
      }}>
        <div className="absolute h-1 bg-white opacity-50"
             style={{
               width: '36%',
               top: '80%',
               right: '20%',
               transform: 'rotate(42deg)',
               transformOrigin: 'right center',
               animation: 'fadeIn 0.3s ease-out forwards',
               animationDelay: '1.5s', // Increased delay to appear after particles
             }} />
      </div>
      
      {/* Back Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 md:top-8 right-4 md:right-8 z-50 bg-white px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base"
        style={{ 
          color: content.color,
          animation: 'fadeIn 0.3s ease-out forwards',
          animationDelay: '1.3s',
          opacity: 0
        }}
      >
        Back
      </button>
      
      {/* Service Title */}
      <div 
        className="absolute top-20 md:top-1/8 left-4 md:left-24 right-4 md:right-auto z-10"
        style={{ 
          animation: 'fadeIn 0.5s ease-out forwards',
          animationDelay: '1s',
          opacity: 0
        }}
      >
        <h1 className="text-3xl md:text-7xl font-bold break-words" style={{ 
          fontFamily: 'Tomorrow-Bold',
          color: service === 'support' ? '#3730ff' : 'white'
        }}>
          {content.title}
        </h1>

        {/* Mobile Pills - Only instance for mobile */}
        <div className="md:hidden flex flex-col space-y-2 mt-4">
          {content.pills.map((pill, index) => (
            <div 
              key={index}
              className="bg-white text-black px-3 py-1 rounded-full text-left font-bold text-xs w-fit"
              style={{ 
                fontFamily: 'Tomorrow, sans-serif',
                animation: 'slideInFromRight 0.4s ease-out forwards',
                animationDelay: `${1.4 + index * 0.1}s`,
                opacity: 0
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
      
      {/* Service Content Container - adjusted position for mobile */}
      <div 
        className="absolute bottom-20 md:bottom-24 left-4 md:left-24 right-4 md:right-auto z-10 flex flex-col md:flex-row items-center md:items-start"
        style={{ 
          animation: 'fadeIn 0.5s ease-out forwards',
          animationDelay: '1.2s',
          opacity: 0
        }}
      >
        {/* Service Image - larger on mobile */}
        <div className="w-48 h-48 md:w-64 md:h-64 mb-4 md:mb-0">
          <img 
            src={content.image} 
            alt={content.title} 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Service Description */}
        <div className="md:ml-8 max-w-md">
          <p className="text-sm md:text-lg text-center md:text-left" style={{ 
           fontFamily: 'Tomorrow, sans-serif',
           color: service === 'support' ? '#3730ff' : 'white'
          }}>
            {content.description}
          </p>
        </div>
      </div>
      
      {/* Remove this entire block as it's duplicating pills on mobile */}
      {/* Service Pills - Mobile */}
      {/* DELETE THIS BLOCK
      <div className="md:hidden absolute z-10 top-1/2 left-4 right-4 flex flex-wrap gap-2 justify-center">
        {content.pills.map((pill, index) => ( ... ))}
      </div>
      */}
    </div>
  );
};

// Main Services Component
export default function ServicesSection() {
  const [activeService, setActiveService] = useState(null);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Add intersection observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when 20% of the section is visible
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <div 
    id="services" 
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden transition-colors duration-700"
      style={{ 
        backgroundColor: isInView ? '#000000' : '#e2e2e2',
        scrollMarginTop: '64px' // Add this to account for navbar height
      }}
    >
      {/* Custom cursor */}
      <div 
        id="custom-cursor" 
        className="fixed w-16 h-16 pointer-events-none z-50 flex items-center justify-center"
        style={{ 
          opacity: 0,
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          border: '2px solid #ffffff',
          color: '#3730ff',
          fontFamily: 'Tomorrow, sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          transform: 'translate(-50%, -50%) scale(0.8)'
        }}
      >
        OPEN
      </div>
      
      {/* Removed dotted background pattern */}
      
      {/* Orbit paths - modified to be true ellipses */}
      <div className="absolute inset-0 pointer-events-none">
        {/* First orbit */}
        <div className="absolute"
             style={{ 
               top: '50%',
               left: '15%',
               width: '40%', 
               height: '42%', 
               transform: 'translate(-15%, -50%)',
               borderRadius: '50%',
               border: '1px solid rgba(55, 48, 255, 0.5)',
               boxShadow: '0 0 15px rgba(55, 48, 255, 0.2)'
             }} />
        
        {/* Second orbit */}
        <div className="absolute"
             style={{ 
               top: '50%',
               left: '15%',
               width: '60%', 
               height: '54%', 
               transform: 'translate(-15%, -50%)',
               borderRadius: '50%',
               border: '1px solid rgba(55, 48, 255, 0.5)',
               boxShadow: '0 0 15px rgba(55, 48, 255, 0.2)'
             }} />
        
        {/* Third orbit */}
        <div className="absolute"
             style={{ 
               top: '50%',
               left: '15%',
               width: '90%', 
               height: '66%', 
               transform: 'translate(-15%, -50%)',
               borderRadius: '50%',
               border: '1px solid rgba(55, 48, 255, 0.5)',
               boxShadow: '0 0 15px rgba(55, 48, 255, 0.2)'
             }} />
      </div>
      
      {/* Main "SERVICES" sun for mobile */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
        <div className="w-48 h-48 md:w-96 md:h-96 bg-blue-600 rounded-full flex items-center justify-center"
             style={{ 
               boxShadow: '0 0 40px rgba(55, 48, 255, 0.6)',
               background: 'radial-gradient(circle, #4a5af8 0%, #3730ff 100%)'
             }}>
          <h1 className="text-3xl md:text-5xl font-bold text-white ml-8 md:ml-16" 
              style={{ fontFamily: 'Tomorrow-Bold' }}>
            SERVICES
          </h1>
        </div>
      </div>
      
      {/* Solar system - adjusted to ensure all planets are visible */}
      <div className="relative w-full h-full">
        {/* Planets - positioned at different angles to be visible */}
        <Planet 
          name="brand" 
          color="#8a9cc0" 
          size={150} 
          orbitRadius={55} 
          speed={0.000005} // Drastically reduced speed
          angle={Math.PI * 0.25} // Bottom left position
          onClick={() => setActiveService('brand')}
        >
            <span style={{ fontFamily: 'Tomorrow' }}>
          BRAND & <br /> WEB DESIGN
          </span>
        </Planet>
        
        <Planet 
          name="support" 
          color="#f0f0f0" 
          size={130} 
          orbitRadius={95} 
          speed={0.000002} // Drastically reduced speed
          angle={Math.PI * 1.8} // Top position
          onClick={() => setActiveService('support')}
        >
          <span style={{ fontFamily: 'Tomorrow', color: '#3730ff' }}>
            ONGOING <br /> SUPPORT
          </span>
        </Planet>
        
        <Planet 
          name="development" 
          color="#3730ff" 
          size={170} 
          orbitRadius={60} 
          speed={0.000005} // Drastically reduced speed
          angle={Math.PI * 0.001} // Right position - adjusted to be on right side
          onClick={() => setActiveService('development')}
        >
          <span style={{ fontFamily: 'Tomorrow' }}>
          WEB <br /> DEVELOPMENT
          </span>
        </Planet>
        
        {/* Small orbital bodies - added more for a fuller appearance */}
        <OrbitalBody size={15} orbitRadius={60} speed={0.001} angle={Math.PI * 1.5} color="#ffffff" />
        <OrbitalBody size={8} orbitRadius={80} speed={0.0008} angle={Math.PI * 0.7} color="#3730ff" />
        <OrbitalBody size={12} orbitRadius={100} speed={0.0006} angle={Math.PI * 1.2} color="#8a9cc0" />
        <OrbitalBody size={6} orbitRadius={105} speed={0.0009} angle={Math.PI * 0.3} color="#ffffff" />
        <OrbitalBody size={10} orbitRadius={65} speed={0.0007} angle={Math.PI * 1.0} color="#3730ff" />
        
        {/* Additional orbital bodies */}
        <OrbitalBody size={7} orbitRadius={45} speed={0.00095} angle={Math.PI * 0.5} color="#ffffff" />
        <OrbitalBody size={9} orbitRadius={70} speed={0.00075} angle={Math.PI * 1.7} color="#8a9cc0" />
        <OrbitalBody size={5} orbitRadius={85} speed={0.00085} angle={Math.PI * 0.9} color="#3730ff" />
        <OrbitalBody size={11} orbitRadius={50} speed={0.00065} angle={Math.PI * 1.3} color="#ffffff" />
        <OrbitalBody size={8} orbitRadius={90} speed={0.00055} angle={Math.PI * 0.4} color="#8a9cc0" />
        <OrbitalBody size={13} orbitRadius={40} speed={0.00105} angle={Math.PI * 1.9} color="#3730ff" />
        <OrbitalBody size={6} orbitRadius={75} speed={0.00115} angle={Math.PI * 0.6} color="#ffffff" />
        <OrbitalBody size={10} orbitRadius={95} speed={0.00045} angle={Math.PI * 1.1} color="#8a9cc0" />
        <OrbitalBody size={7} orbitRadius={55} speed={0.00125} angle={Math.PI * 0.8} color="#3730ff" />
        <OrbitalBody size={9} orbitRadius={65} speed={0.00135} angle={Math.PI * 1.6} color="#ffffff" />
      </div>
      
      {/* Service Modal */}
      {activeService && (
        <ServiceModal 
          service={activeService} 
          onClose={() => setActiveService(null)} 
        />
      )}
    </div>
  );
}