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
        bottom: '20%',
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
      {isVisible && <div className="backdrop" />} {/* Add backdrop for blur effect */}
      <div className="contact-card" style={style} ref={cardRef}>
        <div className="card-header">
          <img src="/starlab-icon.png" alt="Starlab Logo" className="logo" />
          <span style={{ fontFamily: 'Tomorrow-Bold' }} className="text-6xl font-bold text-black">STAR<span className="text-[#3730FF]">TECH</span> DESIGNS</span>
        </div>
        <div className="card-footer">
          <p>divyamgoyal878@gmail.com<br />+91 8233120760</p>
        </div>
      </div>
    </>
  );
}