import React, { useEffect, useRef } from 'react';
import './StarWarsCrawlSection.css'; // Import the CSS file

export default function StarWarsCrawlSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const crawlText = document.querySelector('.crawl-text');
    const section = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.style.backgroundColor = 'black';
          crawlText.style.animationPlayState = 'running'; // Start animation
        } else {
          section.style.backgroundColor = '#e2e2e2';
          crawlText.style.animationPlayState = 'paused'; // Pause animation
        }
      },
      { threshold: 0.3 }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <div 
      id="about"
      ref={sectionRef} 
      className="star-wars-crawl h-screen flex items-center justify-center"
    >
      <div className="crawl-text text-yellow-500 text-center px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4 text-white" style={{ fontFamily: 'Tomorrow-Bold' }}>
          A little about me.
        </h2>
        <p className="text-base md:text-lg lg:text-xl mb-2 md:mb-4" style={{ color: '#e2e2e2', fontFamily: 'Tomorrow' }}>
          I&apos;ve been designing and building websites professionally since 2017, and recently launched my own creative studio — Starlab Designs. Most of my recent work comes through this venture, where I blend clean development with bold, purpose-driven design to help individuals and businesses grow online. At the heart of everything I do is a simple goal: to use design, code, and a splash of cosmic energy to turn ideas into beautiful, functional digital experiences.
        </p>
        <p className="text-2xl md:text-3xl lg:text-5xl" style={{ color: '#3e34f4', fontFamily: 'Tomorrow-Bold' }}>
          I&apos;m a curious creator, cosmic dreamer, MCU nerd, pattern-seeker, and a kid at heart — always chasing the joy of building something meaningful. Whether I&apos;m crafting clean code, designing sleek interfaces, or stargazing late into the night, I&apos;m just grateful to do what I love every day and maybe, in my own way, make the web (and the world) a little more magical.
        </p>
      </div>
    </div>
  );
}