import React from 'react';
import './EmailSection.css'; // Ensure this import is present

export default function EmailSection() {
  return (
    <div className="email-section bg-[#e2e2e2] h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
      <div 
        className="headline-text absolute text-white text-[8rem] md:text-[15rem] lg:text-[35rem] font-bold opacity-40 whitespace-nowrap" 
        style={{ fontFamily: 'Tomorrow-Bold' }}
      >
        LET&apos;S TALK ABOUT MARVEL, LET&apos;S TALK ABOUT LIFE. FEEL FREE TO REACHOUT TO ME
      </div>
      <div className="z-10 text-center">
        <p className="text-sm md:text-sm text-black mb-1 md:mb-2" style={{ fontFamily: 'RetroPix' }}>
          HAVE A PROJECT IN MIND?<br />EMAIL ME AT
        </p>
        <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-[#05204a] mt-6 md:mt-12" style={{ fontFamily: 'Tomorrow-Bold' }}>
          DIVYAMGOYAL878@GMAIL.COM
        </h1>
      </div>
    </div>
  );
}