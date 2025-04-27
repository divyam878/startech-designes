"use client";
import Image from "next/image";
import { useState } from "react";

const ProjectSection = () => {
  const [showContactCard, setShowContactCard] = useState(false);

  return (
    <div className="flex flex-col items-start justify-center pb-20 md:pb-46 px-4 md:px-36 bg-[#e2e2e2]">
      <div className="max-w-6xl mb-8">
        <h1
          className="text-3xl md:text-4xl font-bold text-black mb-4"
          style={{ fontFamily: "Tomorrow-Bold" }}
        >
          Hey, Divyam here.
        </h1>
        <p className="text-lg md:text-xl text-black" style={{ fontFamily: "Tomorrow" }}>
          I&apos;m a Web Designer & Developer with a passion for building clean,
          functional, and visually striking websites. I help individuals,
          startups, and businesses create a strong digital presence through
          custom design and solid development. Whether it&apos;s crafting a
          brand-new site or refreshing an existing one, I focus on creating
          smooth, user-friendly experiences that align with your goals.
        </p>
      </div>
      <div className="border-t-2 border-[#05204a] w-full mb-0"></div>
      <div className="flex flex-col md:flex-row items-start justify-between w-full md:space-x-8 space-y-6 md:space-y-0 mt-0">
        {/* Start a Project Button */}
        <div
          onClick={() => setShowContactCard(true)}
          className="bg-[#05204a] text-white font-bold py-4 md:py-6 px-6 md:px-8 flex items-center justify-between button-hover transition-all duration-300 w-auto md:w-auto"
          style={{ fontFamily: "Tomorrow-Bold", cursor: "pointer" }}
        >
          <div className="flex flex-col text-left">
            <span className="text-xl md:text-2xl">START A</span>
            <span className="text-xl md:text-2xl">PROJECT</span>
          </div>
          <Image
            src="/rocket-button.png"
            alt="Rocket"
            width={48}
            height={48}
            className="ml-4 rocket-hover transition-all duration-300 md:w-16 md:h-16"
          />
        </div>

        {/* Right Side Text Box with Full-Width Top Border */}
        <div
          className="flex-1 max-w-full md:max-w-xl text-left pt-4"
          style={{ fontFamily: "Tomorrow" }}
        >
          <h2
            className="text-base md:text-lg font-bold text-black mb-2"
            style={{ fontFamily: "Tomorrow-Bold" }}
          >
            Need help launching your next website or brand?
          </h2>
          <p className="text-sm md:text-sm text-black">
            Whether it&apos;s a brand-new build, a redesign, or a digital
            refresh — I&apos;ll work with you to create a polished product that
            reflects your vision and helps you grow online. Reach out, and
            let&apos;s make something great together!
          </p>
        </div>
      </div>

      {/* Contact Card */}
      <div 
        className={`fixed bottom-0 left-0 right-0 bg-[#05204a] text-white p-6 transition-transform duration-500 ease-in-out ${
          showContactCard ? 'translate-y-0' : 'translate-y-full'
        } z-50`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold" style={{ fontFamily: "Tomorrow-Bold" }}>Let&apos;s Connect</h3>
            <button 
              onClick={() => setShowContactCard(false)}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* WhatsApp */}
            <a href="https://wa.me/918233120760" target="_blank" rel="noopener noreferrer" 
              className="flex items-center space-x-3 bg-white rounded-full px-3 py-1 hover:bg-gray-100 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#05204a]" viewBox="0 0 448 512">
                <path fill="currentColor" d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
              </svg>
              <span className="text-lg text-[#05204a] font-medium">+91 8233120760</span>
            </a>

            {/* Phone */}
            <a href="tel:+918233120760" 
              className="flex items-center space-x-3 bg-white rounded-full px-3 py-1 hover:bg-gray-100 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#05204a]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-lg text-[#05204a] font-medium">+91 8233120760</span>
            </a>

            {/* Email */}
            <a href="mailto:divyamgoyal878@gmail.com" 
              className="flex items-center space-x-3 bg-white rounded-full px-3 py-1 hover:bg-gray-100 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#05204a]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-lg text-[#05204a] font-medium">divyamgoyal878@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSection;
