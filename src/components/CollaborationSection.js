import Image from 'next/image';
import { useState } from 'react';

export default function CollaborationSection() {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [template, setTemplate] = useState('');

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300); // Delay for modal opening after animation
  };

  const handleGenerateTemplate = () => {
    setTemplate(`Hey Divyam,\n\nI came across your project and was genuinely impressed by the work. I’m ${name}, and I’d love to hear more about how you built it, the ideas behind it, and the tech you used. If you’re open to it, I’d also be interested in discussing a potential collaboration or getting your input on something I’m working on. Looking forward to connecting!`);
  };

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(template).then(() => {
      alert('Template copied! Please open Gmail and compose an email to divyamgoyal878@gmail.com with the template as the body.');
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsClicked(false); // Reset CTA button and text state
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e2e2e2]">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-center h-screen bg-[#e2e2e2] px-4 md:px-0">
        <div className="flex flex-col items-start">
          <h1 className="text-5xl md:text-9xl font-bold text-[#05204a] mb-8" style={{ fontFamily: 'Tomorrow-Bold', textAlign: 'left' }}>
            WANT TO<br />
            WORK<br />
            TOGETHER?
          </h1>
        </div>
        <div className="md:ml-8 relative mt-4 md:mt-0">
          {!isClicked && (
            <div className="absolute top-[-40px] md:top-[-60px] left-[50%] transform translate-x-[-50%] text-center transition-opacity duration-300">
              <p className="text-xl md:text-2xl text-black whitespace-nowrap" style={{ fontFamily: 'Moontime', transform: 'rotate(-10deg)' }}>Click here!</p>
              <Image
                src="/black-arrow.png"
                alt="Arrow"
                width={40}
                height={40}
                className="mx-auto md:w-[60px] md:h-[60px]"
              />
            </div>
          )}
          <Image
            src={isClicked ? "/cta-button-clicked.png" : "/cta-button.png"}
            alt="CTA Button"
            width={150}
            height={75}
            className={`cursor-pointer mt-4 transition-transform duration-300 md:w-[200px] md:h-[200px] ${isClicked ? 'scale-95' : 'scale-100'}`}
            onClick={handleClick}
          />
          {isClicked && (
            <div className="absolute top-[-40px] md:top-[-60px] left-[50%] transform translate-x-[-50%] text-center transition-opacity duration-300">
              <p className="text-xl md:text-2xl text-black whitespace-nowrap" style={{ fontFamily: 'Moontime', transform: 'rotate(-10deg)' }}>Let&apos;s go!!!</p>
            </div>
          )}
        </div>
      
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#e2e2e2] flex items-center justify-center p-4 md:p-0">
            <div className="bg-white p-6 md:p-20 rounded-2xl shadow-lg border-4 border-[#05204a] relative w-full md:w-4/5 max-w-3xl">
              <button onClick={handleCloseModal} className="absolute top-2 md:top-4 right-2 md:right-4 text-black text-xl">X</button>
              <label className="block text-black mb-4" style={{ fontFamily: 'Tomorrow-Bold' }}>Your Name</label>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 mb-6">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border-2 border-[#05204a] p-3 w-full rounded-lg text-black"
                />
                <button onClick={handleGenerateTemplate} className="bg-[#05204a] text-white px-6 py-3 rounded-lg md:ml-4 whitespace-nowrap cursor-pointer w-full md:w-auto" style={{ fontFamily: 'Tomorrow-Bold' }}>
                  Generate Template
                </button>
              </div>
              <textarea
                value={template}
                readOnly
                className="border-2 border-[#05204a] p-3 w-full h-48 rounded-lg text-black mb-20 md:mb-6"
              />
              <button onClick={handleCopyTemplate} className="bg-[#05204a] text-white px-6 py-3 rounded-lg absolute bottom-6 right-6 md:right-18 w-[calc(100%-48px)] md:w-auto" style={{ fontFamily: 'Tomorrow-Bold' }}>
                Copy Template
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}