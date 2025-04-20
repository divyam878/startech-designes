'use client'

import React, { useState } from 'react';
import ContactCard from './ContactCard'; // Import the ContactCard component

const Navbar = () => {
  const [showContactCard, setShowContactCard] = useState(false);

  const handleContactClick = () => {
    setShowContactCard(!showContactCard); // Toggle the card visibility
  };

  return (
    <nav className="fixed top-0 w-full bg-[#e2e2e2] z-50 border-b border-black">
      <div className="w-full">
        <div className="flex items-center justify-between h-16">
          {/* Logo with divider */}
          <div className="flex items-center space-x-2 px-6 border-r border-black h-full">
            <div className="w-12 h-12">
              <img 
                src="/starlab-icon.png"
                alt="Starlab Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span style={{ fontFamily: 'Tomorrow-Bold' }} className="text-xl font-bold text-black">STAR<span className="text-[#3730FF]">TECH</span> DESIGNS</span>
          </div>

          {/* Navigation Buttons with dividers */}
          <div className="flex h-full ml-auto text-black">
            <NavButton onClick={() => scrollToSection('skills')} className="border-l border-black">SERVICES</NavButton>
            <NavButton onClick={() => scrollToSection('services')}>SKILLS</NavButton>
            <NavButton onClick={() => scrollToSection('work')}>WORK</NavButton>
            <NavButton onClick={() => scrollToSection('about')}>ABOUT</NavButton>
            <NavButton onClick={handleContactClick} className="bg-[#3730ff] text-white">
              CONTACT
            </NavButton>
          </div>
        </div>
      </div>
      {showContactCard && <ContactCard isVisible={showContactCard} onClose={() => setShowContactCard(false)} />} {/* Pass the state as a prop */}
    </nav>
  )
}

const NavButton = ({ onClick, children, className = '' }) => (
  <button 
    className={`px-8 flex items-center h-full border-r border-black hover:bg-black/5 transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

export default Navbar