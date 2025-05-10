'use client'

import React, { useState, useCallback } from 'react';
import ContactCard from './ContactCard';

const Navbar = () => {
  const [showContactCard, setShowContactCard] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = () => {
    setShowContactCard(!showContactCard);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = useCallback((id) => {
    const section = document.getElementById(id);
    if (section) {
      const navbarHeight = 64;
      const sectionPosition = section.offsetTop - navbarHeight;
      window.scrollTo({
        top: sectionPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-[#e2e2e2] z-50 border-b border-black">
      <div className="w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2 px-6 border-r border-black h-full">
            <div className="w-12 h-12">
              <img 
                src="/starlab-icon.png"
                alt="Starlab Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span style={{ fontFamily: 'Tomorrow-Bold' }} className="text-xl font-bold text-black">STAR<span style={{ fontFamily: 'Tomorrow-Bold' }} className="text-[#142a6c]">TECH</span> SOLUTIONS</span>
          </div>

          {/* Hamburger Menu Button */}
          <button 
            className="md:hidden px-6 h-full border-l border-black"
            onClick={toggleMenu}
          >
            <div className="space-y-2">
              <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-opacity ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-black transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex h-full ml-auto text-black">
            <NavButton onClick={() => scrollToSection('services')} className="border-l border-black">SERVICES</NavButton>
            <NavButton onClick={() => scrollToSection('skills')}>SKILLS</NavButton>
            <NavButton onClick={() => scrollToSection('work')}>WORK</NavButton>
            <NavButton onClick={() => scrollToSection('about')}>ABOUT</NavButton>
            <NavButton onClick={handleContactClick} className="bg-[#05204a] text-white">
              CONTACT
            </NavButton>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} border-t border-black`}>
          <MobileNavButton onClick={() => { scrollToSection('services'); toggleMenu(); }}>SERVICES</MobileNavButton>
          <MobileNavButton onClick={() => { scrollToSection('skills'); toggleMenu(); }}>SKILLS</MobileNavButton>
          <MobileNavButton onClick={() => { scrollToSection('work'); toggleMenu(); }}>WORK</MobileNavButton>
          <MobileNavButton onClick={() => { scrollToSection('about'); toggleMenu(); }}>ABOUT</MobileNavButton>
          <MobileNavButton onClick={handleContactClick} className="bg-[#05204a] text-white">
            CONTACT
          </MobileNavButton>
        </div>
      </div>
      {showContactCard && <ContactCard isVisible={showContactCard} onClose={() => setShowContactCard(false)} />}
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

const MobileNavButton = ({ onClick, children, className = '' }) => (
  <button 
    className={`w-full px-8 py-4 text-left border-b text-black border-black hover:bg-black/5 transition-colors ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
)

export default Navbar