import React, { useState, useEffect, useRef } from 'react';
import './ContactCard.css'; // Ensure this import is present

export default function ContactCard({ isVisible, onClose }) {
  const cardRef = useRef(null);

  const [style, setStyle] = useState({
    bottom: '-100%',
    transition: 'bottom 1s ease-in-out',
  });

  useEffect(() => {
    if (isVisible) {
      setStyle({
        bottom: isVisible ? (window.innerWidth < 768 ? '10%' : '20%') : '-100%',
        transition: 'bottom 1s ease-in-out',
      });
    } else {
      setStyle({
        bottom: '-100%',
        transition: 'bottom 1s ease-in-out',
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose(); // Call the onClose function to hide the card
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <>
      {isVisible && <div className="backdrop" />}
      <div className="contact-card p-4 md:p-8 w-[90%] md:w-[80%] max-w-4xl" style={style} ref={cardRef}>
        <div className="card-header flex flex-col md:flex-row items-center gap-4 md:gap-8">
          <img 
            src="/starlab-icon.png" 
            alt="Starlab Logo" 
            className="w-22 h-22 md:w-24 md:h-24 object-contain"
          />
          <span 
            style={{ fontFamily: 'Tomorrow-Bold' }} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-black text-center md:text-left"
          >
            STAR<span className="text-[#3730FF]">TECH</span> INDUSTRIES
          </span>
        </div>
        <div className="card-footer mt-4 md:mt-8">
          <p className="text-sm md:text-base text-center md:text-right">
            divyamgoyal878@gmail.com<br />+91 8233120760
          </p>
        </div>
      </div>
    </>
  );
}