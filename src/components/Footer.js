import React from 'react';
import './Footer.css'; // Ensure this import is present

export default function Footer() {
  return (
    <div className="footer bg-[#3e34f4] text-white flex items-center justify-between p-4 w-full transition-transform duration-300 ease-in-out">
      <div className="contact-info">
        <h2 className="text-lg font-bold" style={{ fontFamily: 'RetroPix' }}>Contact</h2>
        <p className="text-sm">divyamgoyal878@gmail.com<br />+91 8233120760</p>
      </div>
      <div className="copyright-info text-right">
        <p className="text-sm">© STARLAB DESIGNS<br />2025</p>
      </div>
    </div>
  );
}