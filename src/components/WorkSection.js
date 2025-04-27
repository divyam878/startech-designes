"use client";
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WorkSection() {
  const [activeVideo, setActiveVideo] = useState(null);
  const videoRefs = useRef({});
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);
  
  // Project data
  const projects = [
   
    
      {
        id: 'axio-electronics',
        title: 'AXIO ELECTRONICS',
        date: 'Jan 2025',
        description: 'A modern website built for an electronics company to showcase their products, services, and brand identity. Developed with a clean design aesthetic and smooth user experience in mind, the site features a video background, responsive layout, and clear sections for products, services, and contact. Built using Next.js and Tailwind CSS for performance and maintainability.',
        image: '/axio-electronics.png',
        video: '/axio-electronics.mp4',
        tags: ['Electronics', 'Next.js', 'Company Website'],
        position: 'right' // Will be on the left side
      },
      {
        id: 'nessco',
        title: 'NESSCO INDUSTRIES',
        date: 'Oct 2024',
        description: 'A professional website designed for a leading paper cup manufacturing company. Built with Next.js and Tailwind CSS, the site highlights Nessco’s product range, manufacturing capabilities, and company values. It features a responsive layout, smooth animations, and a clean UI that effectively communicates the brand’s focus on quality and sustainability.',
        image: '/nessco.jpeg',
        video: '/nessco.mp4',
        tags: ['Manufacturing', 'Next.js', 'Paper Cups', 'Company Website'],
        position: 'left' // Will be on the right side
      },
      {
        id: 'what-the-fashion',
        title: 'WHAT THE FASHION',
        date: 'Dec 2024',
        description: 'An ecommerce clothing website built using React and Tailwind CSS. It features a sleek user interface for browsing fashion products, along with a fully functional admin dashboard where sellers can list, update, and manage their products. The platform was designed with scalability and usability in mind.',
        image: '/what-the-fashion.jpeg',
        video: '/what-the-fashion.mp4',
        tags: ['Clothing', 'React', 'Ecommerce'],
        position: 'right' // Will be on the right side
      },
      {
        id: 'formicia',
        title: 'FORMICIA - FORM BUILDER',
        date: 'Aug 2023',
        description: 'Formicia is a dynamic form builder application that allows users to create custom forms through a drag-and-drop interface. Each form generates a unique sharable link, and all responses are captured and displayed in a clean dashboard UI. Built with Next.js and TypeScript, the app also uses shadcn/ui for styling, Prisma for database management, and Clerk for secure user authentication.',
        image: '/formicia.png',
        video: '/formicia.mp4',
        tags: ['Next.js', 'TypeScript', 'Form Builder', 'Prisma', 'Clerk', 'shadcn/ui'],
        position: 'left' // Will be on the left side
      },
      {
        id: 'guess-number',
        title: 'GUESS THE NUMBER',
        date: 'Oct 2022',
        description: 'Built a number guessing game using React and Redux where users try to guess the correct number in the fewest attempts. React handles the UI while Redux manages game state for a smooth, competitive experience.',
        image: '/guess-number.png',
        video: '/guess-number.mp4',
        tags: ['Game', 'Visual'],
        position: 'right' // Will be on the right side
      },
      {
        id: 'roll-the-dice',
        title: 'ROLL THE DICE',
        date: 'Jun 2022',
        description: "'Roll the Dice' is an exciting game where players strive to achieve the highest score without rolling a one. The game involves a strategic decision-making process; players can either continue rolling the dice to accumulate points or choose to hold, securing their current score. However, rolling a one results in losing all accumulated points.",
        image: '/roll-the-dice.jpeg',
        video: '/roll-the-dice.mp4',
        tags: ['Game', 'Visual'],
        position: 'left' // Will be on the left side
      }
  ];
  
  // Add intersection observer to detect when section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2 }
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
  
  // Handle video play/pause when hovering
  const handleMouseEnter = (id) => {
    setActiveVideo(id);
    if (videoRefs.current[id]) {
      videoRefs.current[id].play();
    }
  };
  
  const handleMouseLeave = (id) => {
    setActiveVideo(null);
    if (videoRefs.current[id]) {
      videoRefs.current[id].pause();
      videoRefs.current[id].currentTime = 0;
    }
  };
  
  return (
    <div 
      id="work"
      ref={sectionRef}
      className="relative w-full bg-blue-600 py-24 overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, #05204a 0%, #1f01b9 100%)'
      }}
    >
      {/* Pixelated effect using colored blocks */}
      <div className="absolute top-0 left-0 w-full h-8 flex justify-between">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="w-8 h-full bg-[#e2e2e2]"></div> // Fixed size blocks
        ))}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-8 flex justify-between">
        {[...Array(20)].map((_, index) => (
          <div key={index} className="w-8 h-full bg-[#e2e2e2]"></div> // Fixed size blocks
        ))}
      </div>

      {/* Random appearing and disappearing small square pixels */}
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="absolute bg-[#e2e2e2] animate-pixelMove"
          style={{
            width: `${Math.random() * 5 + 3}px`, // Random width between 3px and 8px
            height: `${Math.random() * 5 + 3}px`, // Random height between 3px and 8px
            top: `${Math.random() * 100}%`, // Initial random position within the section
            left: `${Math.random() * 100}%`, // Initial random position within the section
          }}
        ></div>
      ))}

      <style jsx>{`
        @keyframes pixelMove {
          0%, 100% {
            opacity: 0;
            transform: translate(0, 0);
          }
          50% {
            opacity: 1;
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
          }
        }
        .animate-pixelMove {
          animation: pixelMove 3s infinite alternate;
        }
      `}</style>
      
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h1 className="text-6xl md:text-6xl lg:text-8xl font-bold text-white mb-8 md:mb-16" style={{ fontFamily: 'RetroPix' }}>
          WORK
        </h1>
        
        {/* Projects */}
        <div className="space-y-16 md:space-y-32">
          {projects.map((project, index) => (
            <div 
              key={project.id}
              className={`flex flex-col md:flex-row items-center ${
                project.position === 'left' ? 'md:flex-row-reverse' : ''
              } gap-4 md:gap-8`}
            >
              {/* Project Image/Video Container */}
              <div className="w-full md:w-1/2 relative overflow-hidden rounded-lg shadow-xl"
                   onMouseEnter={() => handleMouseEnter(project.id)}
                   onMouseLeave={() => handleMouseLeave(project.id)}
              >
                {/* Image (shown when video is not playing) */}
                <div className={`transition-opacity duration-300 ${activeVideo === project.id ? 'opacity-0' : 'opacity-100'}`}>
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={800}
                    height={450}
                    className="w-full h-auto filter grayscale contrast-100" // Apply filter
                  />
                </div>
                
                {/* Video (hidden until hovered) */}
                <div 
                  className={`absolute inset-0 transition-opacity duration-300 ${activeVideo === project.id ? 'opacity-100' : 'opacity-0'}`}
                >
                  <video
                    ref={el => videoRefs.current[project.id] = el}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Hover instruction */}
                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 bg-white bg-opacity-10 backdrop-blur-lg px-2 md:px-3 py-1 rounded-full text-xs md:text-sm text-black font-medium">
                  Hover to play
                </div>
              </div>
              
              {/* Project Info */}
              <div className={`w-full md:w-1/2 text-white ${project.position === 'left' ? 'md:text-right text-left' : 'text-left'}`}>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4" style={{ fontFamily: 'Tomorrow-Bold' }}>
                  {project.title}
                </h2>
                
                {/* White line below title */}
                <div className={`h-0.5 md:h-1 bg-white w-full mb-3 md:mb-6`}></div>
                
                {/* Tags */}
                <div className={`flex flex-wrap gap-1.5 md:gap-2 mb-3 md:mb-4 ${project.position === 'left' ? 'md:justify-end justify-start' : 'justify-start'}`}>
                  {project.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-white text-blue-600 px-2 md:px-4 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium"
                      style={{ fontFamily: 'Tomorrow, sans-serif' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <p className="text-base md:text-lg mb-1 md:mb-2 opacity-80" style={{ fontFamily: 'Tomorrow, sans-serif' }}>{project.date}</p>
                <p className="text-base md:text-lg mb-4 md:mb-6" style={{ fontFamily: 'Moontime, sans-serif' }}>{project.description}</p>
                
                {/* Arrow image */}
                <div className={`w-8 h-8 md:w-12 md:h-12 ${project.position === 'left' ? 'md:ml-auto' : ''}`}>
                  <Image 
                    src={project.position === 'right' ? '/arrow-left.png' : '/arrow-right.png'}
                    alt="Arrow"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}