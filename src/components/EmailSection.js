import React from 'react';
import './EmailSection.css'; // Ensure this import is present

export default function EmailSection() {
  return (
    <div className="email-section bg-[#e2e2e2] h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="headline-text absolute text-white text-[35rem] font-bold opacity-40 whitespace-nowrap" style={{ fontFamily: 'Tomorrow-Bold' }}>
        LET’S TALK ABOUT MARVEL, LET’S TALK ABOUT LIFE. FEEL FREE TO REACHOUT TO ME
      </div>
      <div className="z-10 text-center">
        <p className="text-sm text-black mb-2" style={{ fontFamily: 'RetroPix' }}>
          HAVE A PROJECT IN MIND?<br />EMAIL ME AT
        </p>
        <h1 className="text-5xl font-bold text-[#3e34f4] mt-12" style={{ fontFamily: 'Tomorrow-Bold' }}>
          DIVYAMGOYAL878@GMAIL.COM
        </h1>
      </div>
    </div>
  );
}