"use client";
import { useState, useEffect, useRef } from 'react';

// Node component for each skill bubble
const SkillNode = ({ x, y, radius, label, type, onClick }) => {
  const [position, setPosition] = useState({ x, y });
  const [hover, setHover] = useState(false);
  
  // Subtle animation effect
  useEffect(() => {
    if (type === 'main') {
      const interval = setInterval(() => {
        const offsetX = Math.sin(Date.now() / 3000) * 5;
        const offsetY = Math.cos(Date.now() / 2500) * 5;
        
        setPosition({
          x: x + offsetX,
          y: y + offsetY
        });
      }, 50);
      
      return () => clearInterval(interval);
    }
  }, [x, y, type]);
  
  // Styles based on node type
  const getNodeStyles = () => {
    const baseStyles = {
      position: 'absolute',
      transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'transform 0.3s ease-out',
      cursor: type === 'main' ? 'pointer' : 'default'
    };
    
    if (type === 'main') {
      return {
        ...baseStyles,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        backgroundColor: '#05204a',
        color: 'white',
        fontFamily: 'Tomorrow-Bold',
        fontWeight: 'bold',
        fontSize: radius < 100 ? '16px' : '34px',
        transform: hover 
          ? `translate(-50%, -50%) translate(${position.x}px, ${position.y}px) scale(1.05)` 
          : `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`
      };
    } else if (type === 'small') {
      return {
        ...baseStyles,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        backgroundColor: '#4a5c8f'
      };
    } else {
      return {
        ...baseStyles,
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        backgroundColor: '#000020'
      };
    }
  };
  
  return (
    <div 
      style={getNodeStyles()}
      onClick={type === 'main' ? onClick : undefined}
      onMouseEnter={() => type === 'main' && setHover(true)}
      onMouseLeave={() => type === 'main' && setHover(false)}
    >
      {label}
    </div>
  );
};

// Connection line between nodes
const Connection = ({ startNode, endNode }) => {
  const [start, setStart] = useState({ x: startNode.x, y: startNode.y });
  const [end, setEnd] = useState({ x: endNode.x, y: endNode.y });
  
  // Update line position with node movement
  useEffect(() => {
    const interval = setInterval(() => {
      if (startNode.type === 'main') {
        const startOffsetX = Math.sin(Date.now() / 3000) * 5;
        const startOffsetY = Math.cos(Date.now() / 2500) * 5;
        setStart({
          x: startNode.x + startOffsetX,
          y: startNode.y + startOffsetY
        });
      }
      
      if (endNode.type === 'main') {
        const endOffsetX = Math.sin((Date.now() + 1000) / 3000) * 5;
        const endOffsetY = Math.cos((Date.now() + 1000) / 2500) * 5;
        setEnd({
          x: endNode.x + endOffsetX,
          y: endNode.y + endOffsetY
        });
      }
    }, 50);
    
    return () => clearInterval(interval);
  }, [startNode, endNode]);
  
  // Calculate line length and angle
  const length = Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * 180 / Math.PI;
  
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: start.y,
          left: start.x,
          width: `${length}px`,
          height: '2px',
          backgroundColor: '#05204a',
          opacity: 0.7,
          transformOrigin: '0 0',
          transform: `rotate(${angle}deg)`
        }}
      />
    </div>
  );
};

// Tech Icon Component
const TechIcon = ({ icon, name, x, y }) => {
  return (
    <div className="absolute" style={{ top: y, left: x, transform: 'translate(-50%, -50%)' }}>
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
        <img src={icon} alt={name} className="w-10 h-10 object-contain" />
      </div>
    </div>
  );
};

// Expanded Skill View
const ExpandedSkillView = ({ skill, onClose, isMobile = window.innerWidth < 768 }) => {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 600 });
  const [animationComplete, setAnimationComplete] = useState(false);
  
  // Tech stacks for each skill
  // Update the techStacks positions for mobile
  const techStacks = {
    frontend: [
      { name: 'React', icon: '/images/react.png', x: isMobile ? '20%' : '50%', y: isMobile ? '38%' : '10%' },
      { name: 'Next.js', icon: '/images/nextjs.png', x: isMobile ? '45%' : '60%', y: isMobile ? '33%' : '20%' },
      { name: 'JavaScript', icon: '/images/javascript.png', x: isMobile ? '80%' : '75%', y: isMobile ? '35%' : '80%' },
      { name: 'TypeScript', icon: '/images/typescript.png', x: isMobile ? '70%' : '50%', y: isMobile ? '49%' : '70%' },
      { name: 'HTML', icon: '/images/html5.png', x: isMobile ? '30%' : '75%', y: isMobile ? '73%' : '40%' },
      { name: 'CSS', icon: '/images/css3.png', x: isMobile ? '75%' : '85%', y: isMobile ? '65%' : '60%' },
      { name: 'Bootstrap', icon: '/images/bootstrap.png', x: isMobile ? '20%' : '25%', y: isMobile ? '90%' : '80%' },
      { name: 'Redux', icon: '/images/redux.png', x: isMobile ? '60%' : '85%', y: isMobile ? '80%' : '30%' },
    ],
    backend: [
      { name: 'Node.js', icon: '/images/nodejs.png', x: isMobile ? '30%' : '50%', y: isMobile ? '35%' : '10%' },
      { name: 'Express', icon: '/images/express.png', x: isMobile ? '70%' : '60%', y: isMobile ? '35%' : '20%' },
      { name: 'MongoDB', icon: '/images/mongodb.png', x: isMobile ? '40%' : '75%', y: isMobile ? '70%' : '40%' },
      { name: 'SQL', icon: '/images/sql.png', x: isMobile ? '80%' : '85%', y: isMobile ? '50%' : '60%' },
      { name: 'Firebase', icon: '/images/firebase.png', x: isMobile ? '30%' : '50%', y: isMobile ? '85%' : '70%' },
      { name: 'Python', icon: '/images/python.png', x: isMobile ? '70%' : '75%', y: isMobile ? '65%' : '80%' },
    ],
    bonus: [
      { name: 'Figma', icon: '/images/figma.png', x: isMobile ? '30%' : '40%', y: isMobile ? '35%' : '10%' },
      { name: 'SEO', icon: '/images/seo.png', x: isMobile ? '60%' : '70%', y: isMobile ? '33%' : '60%' },
      { name: 'Git', icon: '/images/git.png', x: isMobile ? '50%' : '70%', y: isMobile ? '45%' : '25%' },
      { name: 'Github', icon: '/images/github.png', x: isMobile ? '75%' : '75%', y: isMobile ? '50%' : '90%' },
      { name: 'Prisma', icon: '/images/prisma.png', x: isMobile ? '80%' : '40%', y: isMobile ? '70%' : '80%' },
      { name: 'VScode', icon: '/images/vscode.png', x: isMobile ? '70%' : '50%', y: isMobile ? '60%' : '10%' },
      { name: 'POSTMAN', icon: '/images/postman.png', x: isMobile ? '30%' : '60%', y: isMobile ? '80%' : '15%' },
      { name: 'Clerk', icon: '/images/clerk.png', x: isMobile ? '70%' : '75%', y: isMobile ? '80%' : '40%' },
      { name: 'Appscript', icon: '/images/appscript.png', x: isMobile ? '20%' : '85%', y: isMobile ? '90%' : '60%' },
      { name: 'Sheets', icon: '/images/sheets.png', x: isMobile ? '65%' : '50%', y: isMobile ? '90%' : '70%' },
    ]
  };

  // Rest of the component code remains the same...
  // Tech pills for each skill
  const techPills = {
    frontend: ['REACT JS', 'NEXT JS', 'JAVASCRIPT', 'TYPESCRIPT', 'REDUX', 'HTML', 'CSS', 'BOOTSTRAP'],
    backend: ['NODE JS', 'EXPRESS', 'MONGODB', 'SQL', 'FIREBASE', 'PYTHON'],
    bonus: ['FIGMA', 'SEO', 'GIT', 'GITHUB', 'PRISMA', 'VSCODE', 'POSTMAN', 'CLERK', 'APPSCRIPT', 'SHEETS']
  };
  
  // Update container size on window resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    // Set animation complete after the initial expansion
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    
    return () => {
      window.removeEventListener('resize', updateSize);
      clearTimeout(timer);
    };
  }, []);
  
  // Generate grid background
  const generateGrid = () => {
    const gridSize = 40;
    const horizontalLines = [];
    const verticalLines = [];
    
    for (let i = 0; i <= containerSize.height; i += gridSize) {
      horizontalLines.push(
        <div 
          key={`h-${i}`} 
          style={{
            position: 'absolute',
            left: 0,
            top: `${i}px`,
            width: '100%',
            height: '1px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
        />
      );
    }
    
    for (let i = 0; i <= containerSize.width; i += gridSize) {
      verticalLines.push(
        <div 
          key={`v-${i}`} 
          style={{
            position: 'absolute',
            left: `${i}px`,
            top: 0,
            width: '1px',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
          }}
        />
      );
    }
    
    return [...horizontalLines, ...verticalLines];
  };
  
  return (
    <div 
      id="skills"
      ref={containerRef}
      className="fixed inset-0 z-50 overflow-hidden"
    >
      <style jsx>{`
        @keyframes circleExpand {
          0% { 
            clip-path: circle(0% at 50% 50%);
            background-color: #05204a;
          }
          100% { 
            clip-path: circle(150% at 50% 50%);
            background-color: #05204a;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes drawLine {
          from { 
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          to { 
            stroke-dashoffset: 0;
            opacity: 0.7;
          }
        }
        
        @keyframes popIn {
          0% { 
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
          }
          70% { 
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 1;
          }
          100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
      `}</style>
      
      {/* Expanding Background */}
      <div 
        className="absolute inset-0 bg-[#05204a]"
        style={{ 
          animation: 'circleExpand 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards'
        }}
      >
        {/* Grid Background */}
        <div className="absolute inset-0" style={{ opacity: 0.2 }}>
          {generateGrid()}
        </div>
      </div>
      
      {/* Back Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 md:top-8 right-4 md:right-8 z-50 bg-white text-[#05204a] px-3 py-1 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base"
      >
        Back
      </button>
      
      {/* Skill Title */}
      <div 
        className="absolute top-20 md:top-1/4 left-4 md:left-24 z-10"
        style={{ 
          animation: 'fadeIn 0.5s ease-out forwards',
          animationDelay: '0.4s',
          opacity: 0,
          width: isMobile ? '90%' : '500px',
          maxWidth: '100%'
        }}
      >
        <h1 className="text-4xl md:text-7xl font-bold text-white" style={{ fontFamily: 'Tomorrow-Bold' }}>
          {skill.toUpperCase()}
        </h1>
        
        {/* Tech Pills */}
        <div className="flex flex-wrap gap-2 mt-4 md:mt-8 max-w-full">
          {techPills[skill].map((pill, index) => (
            <div 
              key={index}
              className="bg-black text-white px-2 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold whitespace-nowrap"
              style={{ 
                fontFamily: 'Tomorrow',
                animation: 'fadeIn 0.3s ease-out forwards',
                animationDelay: `${0.6 + index * 0.1}s`,
                opacity: 0
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
      
      {/* Connection Lines and Tech Icons */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Origin point circle */}
        <circle 
          cx={isMobile ? "10%" : "37%"}
          cy={isMobile ? "50%" : "30%"}
          r={isMobile ? "3" : "5"}
          fill="white" 
          style={{ 
            opacity: animationComplete ? 0.9 : 0,
            transition: 'opacity 0.3s ease-out',
            transitionDelay: '0.7s'
          }}
        />
        
        {techStacks[skill].map((tech, index) => (
          <line 
            key={`line-${index}`}
            x1={isMobile ? "10%" : "37%"}
            y1={isMobile ? "50%" : "30%"}
            x2={tech.x} 
            y2={tech.y} 
            stroke="white" 
            strokeWidth={isMobile ? "1" : "2"}
            style={{ 
              strokeDasharray: "1000",
              strokeDashoffset: animationComplete ? "0" : "1000",
              opacity: animationComplete ? 0.7 : 0,
              transition: "stroke-dashoffset 1s ease-out, opacity 1s ease-out",
              transitionDelay: `${0.8 + index * 0.1}s`
            }}
          />
        ))}
      </svg>
      
      {/* Tech Icons */}
      {techStacks[skill].map((tech, index) => (
        <div 
          key={`icon-${index}`}
          className="absolute" 
          style={{ 
            top: tech.y, 
            left: tech.x, 
            transform: animationComplete ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)',
            opacity: animationComplete ? 1 : 0,
            transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
            transitionDelay: `${1.2 + index * 0.1}s`
          }}
        >
          <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center">
            <img src={tech.icon} alt={tech.name} className="w-8 h-8 md:w-10 md:h-10 object-contain" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Main Skills Component
export default function SkillsSection() {
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 1000, height: 600 });
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Add mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update container size on window resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };
    
    window.addEventListener('resize', updateSize);
    updateSize();
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Define nodes with responsive positions
  const nodes = [
    { 
      id: 'frontend', 
      x: containerSize.width * (isMobile ? 0.5 : 0.5),
      y: containerSize.height * (isMobile ? 0.3 : 0.3),
      radius: isMobile ? 70 : 150,
      label: 'FRONTEND',
      type: 'main'
    },
    { 
      id: 'backend',
      x: containerSize.width * (isMobile ? 0.3 : 0.25),
      y: containerSize.height * (isMobile ? 0.8 : 0.65),
      radius: isMobile ? 80 : 150,
      label: 'BACKEND',
      type: 'main'
    },
    { 
      id: 'bonus',
      x: containerSize.width * (isMobile ? 0.7 : 0.85),
      y: containerSize.height * (isMobile ? 0.6 : 0.65),
      radius: isMobile ? 90 : 150,
      label: 'BONUS',
      type: 'main'
    },
    // Adjust small nodes for mobile
    { 
      id: 'node1',
      x: containerSize.width * (isMobile ? 0.2 : 0.31),
      y: containerSize.height * (isMobile ? 0.45 : 0.55),
      radius: isMobile ? 8 : 30,
      label: '',
      type: 'small'
    },
    { 
      id: 'node2', 
      x: containerSize.width * (isMobile ? 0.1 : 0.15), 
      y: containerSize.height * (isMobile ? 0.4 : 0.48), 
      radius: isMobile ? 5 : 10, 
      label: '', 
      type: 'tiny' 
    },
    { 
      id: 'node3', 
      x: containerSize.width * (isMobile ? 0.85 : 1.30), 
      y: containerSize.height * (isMobile ? 0.45 : 0.5), 
      radius: isMobile ? 8 : 20, 
      label: '', 
      type: 'tiny' 
    },
    { 
      id: 'node4', 
      x: containerSize.width * (isMobile ? 0.5 : 0.65), 
      y: containerSize.height * (isMobile ? 0.75 : 0.87), 
      radius: isMobile ? 10 : 30, 
      label: '', 
      type: 'small' 
    },
    { 
      id: 'node5', 
      x: containerSize.width * (isMobile ? 0.8 : 1.10), 
      y: containerSize.height * (isMobile ? 0.25 : 0.22), 
      radius: isMobile ? 6 : 12, 
      label: '', 
      type: 'tiny' 
    }
  ];

  // Define connections with mobile-friendly paths
  const connections = isMobile ? [
    { start: 'frontend', end: 'backend' },
    { start: 'backend', end: 'bonus' },
    { start: 'bonus', end: 'frontend' },
  ] : [
    { start: 'frontend', end: 'backend' },
    { start: 'frontend', end: 'bonus' },
    { start: 'frontend', end: 'node4' },
    { start: 'backend', end: 'node1' },
    { start: 'node1', end: 'node2' },
    { start: 'frontend', end: 'node5' },
    { start: 'bonus', end: 'node3' }
  ];
  
  // Handle node click
  const handleNodeClick = (nodeId) => {
    if (nodeId === 'frontend' || nodeId === 'backend' || nodeId === 'bonus') {
      setExpandedSkill(nodeId);
    } else {
      setSelectedSkill(nodeId === selectedSkill ? null : nodeId);
    }
  };
  
  // Find node by id
  const findNodeById = (id) => nodes.find(node => node.id === id);
  
  // Generate grid background
  const generateGrid = () => {
    const gridSize = 20;
    const horizontalLines = [];
    const verticalLines = [];
    
    for (let i = 0; i <= containerSize.height; i += gridSize) {
      horizontalLines.push(
        <div 
          key={`h-${i}`} 
          style={{
            position: 'absolute',
            left: 0,
            top: `${i}px`,
            width: '100%',
            height: '1px',
            backgroundColor: '#d8d8e8'
          }}
        />
      );
    }
    
    for (let i = 0; i <= containerSize.width; i += gridSize) {
      verticalLines.push(
        <div 
          key={`v-${i}`} 
          style={{
            position: 'absolute',
            left: `${i}px`,
            top: 0,
            width: '1px',
            height: '100%',
            backgroundColor: '#d8d8e8'
          }}
        />
      );
    }
    
    return [...horizontalLines, ...verticalLines];
  };
  
  return (
    <div 
      id="skills"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#e2e2e2]"
      style={{ scrollMarginTop: '64px' }}
    >
      {/* Grid Background */}
      <div className="absolute inset-0">
        {generateGrid()}
      </div>

      {/* SKILLS title */}
      <div className="absolute  top-10 left-4 md:top-10 md:left-24 z-10">
        <h1 className="text-5xl font-bold text-[#05204a]" style={{ fontFamily: 'Tomorrow-Bold' }}>
          SKILLS
        </h1>
      </div>
      
      {/* Connection Lines */}
      {connections.map((connection, index) => (
        <Connection 
          key={`connection-${index}`}
          startNode={findNodeById(connection.start)}
          endNode={findNodeById(connection.end)}
        />
      ))}
      
      {/* Nodes */}
      {nodes.map((node) => (
        <SkillNode 
          key={node.id}
          {...node}
          onClick={() => handleNodeClick(node.id)}
        />
      ))}
      
      {/* Selected Skill Details */}
      {selectedSkill && !expandedSkill && (
        <div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg z-20"
          style={{ 
            width: '80%', 
            maxWidth: '500px',
            border: '2px solid #05204a'
          }}
        >
          <h3 className="text-xl font-bold text-blue-600 mb-2">{findNodeById(selectedSkill).label}</h3>
          <p>{findNodeById(selectedSkill).content}</p>
        </div>
      )}
      
      {/* Expanded Skill View */}
      {expandedSkill && (
        <ExpandedSkillView 
          skill={expandedSkill} 
          onClose={() => setExpandedSkill(null)} 
        />
      )}
    </div>
  );
}