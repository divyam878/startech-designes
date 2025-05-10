import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './ContactCard.css';

export default function ContactCard({ isVisible, onClose }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [style, setStyle] = useState({
    bottom: '-100%',
    transition: 'bottom 1s ease-in-out',
  });

  useEffect(() => {
    if (isVisible) {
      setStyle({
        bottom: '50%',
        left: '50%',
        transform: 'translate(-50%, 50%)',
        transition: 'all 1s ease-in-out',
      });
    } else {
      setStyle({
        bottom: '-100%',
        left: '50%',
        transform: 'translate(-50%, 0)',
        transition: 'all 1s ease-in-out',
      });
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = (y - centerY) / 20;
    const tiltY = (centerX - x) / 20;
    
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'fc50b87d-7eee-4609-bdea-b6255b571f81',
          ...formData
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSuccess(true);
        setFormData({
          fullname: '',
          mobile: '',
          email: '',
          message: ''
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      {isVisible && <div className="backdrop" />}
      <form 
        onSubmit={handleSubmit}
        className="contact-card p-4 md:p-8 w-[90%] md:w-[100%] max-w-3xl min-h-[600px] md:min-h-[700px] relative overflow-hidden fixed"
        style={{
          ...style,
          background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
          boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
          borderRadius: '20px',
          transform: `${style.transform} perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: 'all 0.1s ease-out',
        }}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-black/10 transition-colors duration-200"
          aria-label="Close form"
        >
          <X size={24} className="text-[#05204a]" />
        </button>

        {/* Base metallic layer */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(145deg, #d4d4d4, #f5f5f5)',
          opacity: 0.8,
          pointerEvents: 'none',
        }} />

        {/* Rainbow hologram layer */}
        <div className="absolute inset-0" style={{
          background: `linear-gradient(
            ${45 + (tilt.x + tilt.y) * 2}deg,
            rgba(255, 0, 255, 0.1),
            rgba(0, 255, 255, 0.1),
            rgba(255, 255, 0, 0.1)
          )`,
          opacity: Math.abs(tilt.x / 10) + Math.abs(tilt.y / 10),
          mixBlendMode: 'color-dodge',
          pointerEvents: 'none',
        }} />

        {/* Dynamic shimmer effect */}
        <div className="absolute inset-0 shimmer" style={{
          background: `linear-gradient(
            ${90 + (tilt.y * 5)}deg,
            transparent 0%,
            rgba(255, 255, 255, 0.6) 45%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0.6) 55%,
            transparent 100%
          )`,
          backgroundSize: '200% 200%',
          animation: 'shimmer 1.5s infinite',
          opacity: 0.5 + Math.abs(tilt.x / 20) + Math.abs(tilt.y / 20),
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div className="relative z-10 space-y-8 md:space-y-10">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#142a6c]" style={{ fontFamily: 'Tomorrow-Bold' }}>
              Let&apos;s Connect
            </h2>
          </div>

          <div className="space-y-4 md:space-y-4">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              placeholder="Full Name"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white/50 backdrop-blur-sm text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
            />

            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white/50 backdrop-blur-sm text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white/50 backdrop-blur-sm text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
            />

            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message..."
              required
              rows="4"
              className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white/50 backdrop-blur-sm text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-4 bg-[#05204a] text-white rounded-lg font-bold hover:bg-[#0e1e4d] transition-colors duration-300 disabled:opacity-50"
              style={{ fontFamily: 'Tomorrow-Bold' }}
            >
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </div>

          {success && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl">
              <div className="checkmark-circle">
                <div className="checkmark"></div>
              </div>
              <h3 className="text-2xl font-bold text-[#05204a] mt-6 px-4" 
                  style={{ fontFamily: 'Tomorrow-Bold' }}>
                Message Sent Successfully!
              </h3>
              <p className="text-[#05204a] mt-2 px-4">
                Thank you for reaching out. I&apos;ll get back to you soon.
              </p>
            </div>
          )}
        </div>
      </form>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .checkmark-circle {
          width: 80px;
          height: 80px;
          position: relative;
          background: #05204a;
          border-radius: 50%;
          animation: scale-in 0.3s ease-out;
        }

        .checkmark {
          width: 40px;
          height: 24px;
          position: absolute;
          border-left: 4px solid white;
          border-bottom: 4px solid white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -60%) rotate(-45deg);
          animation: checkmark 0.4s ease-in-out 0.2s forwards;
          opacity: 0;
        }

        @keyframes scale-in {
          0% {
            transform: scale(0);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes checkmark {
          0% {
            width: 0;
            height: 0;
            opacity: 0;
          }
          50% {
            width: 0;
            height: 24px;
            opacity: 1;
          }
          100% {
            width: 40px;
            height: 24px;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
