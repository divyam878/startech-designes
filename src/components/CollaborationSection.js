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
      <div className="flex flex-col items-start">
        <h1 className="text-9xl font-bold text-[#3e34f4] mb-8" style={{ fontFamily: 'Tomorrow-Bold', textAlign: 'left' }}>
          WANT TO<br />
          WORK<br />
          TOGETHER?
        </h1>
      </div>
      <div className="ml-8 relative">
        {!isClicked && (
          <div className="absolute top-[-60px] left-[50%] transform translate-x-[-50%] text-center transition-opacity duration-300">
            <p className="text-2xl text-black whitespace-nowrap" style={{ fontFamily: 'Moontime', transform: 'rotate(-10deg)' }}>Click here!</p>
            <Image
              src="/black-arrow.png"
              alt="Arrow"
              width={60}
              height={60}
              className="mx-auto"
            />
          </div>
        )}
        <Image
          src={isClicked ? "/cta-button-clicked.png" : "/cta-button.png"}
          alt="CTA Button"
          width={200}
          height={100}
          className={`cursor-pointer mt-4 transition-transform duration-300 ${isClicked ? 'scale-95' : 'scale-100'}`}
          onClick={handleClick}
        />
        {isClicked && (
          <div className="absolute top-[-60px] left-[50%] transform translate-x-[-50%] text-center transition-opacity duration-300">
            <p className="text-2xl text-black whitespace-nowrap" style={{ fontFamily: 'Moontime', transform: 'rotate(-10deg)' }}>Let&apos;s go!!!</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#e2e2e2] flex items-center justify-center">
          <div className="bg-white p-20 rounded-2xl shadow-lg border-4 border-[#3e34f4] relative w-4/5 max-w-3xl">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-black text-xl">X</button>
            <label className="block text-black mb-4" style={{ fontFamily: 'Tomorrow-Bold' }}>Your Name</label>
            <div className="flex items-center mb-6">
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 border-[#3e34f4] p-3 w-full rounded-lg text-black"
              />
              <button onClick={handleGenerateTemplate} className="bg-[#3e34f4] text-white px-6 py-3 rounded-lg ml-4 whitespace-nowrap cursor-pointer" style={{ fontFamily: 'Tomorrow-Bold' }}>
                Generate Template
              </button>
            </div>
            <textarea
              value={template}
              readOnly
              className="border-2 border-[#3e34f4] p-3 w-full h-48 rounded-lg text-black mb-6"
            />
            <button onClick={handleCopyTemplate} className="bg-[#3e34f4] text-white px-6 py-3 rounded-lg absolute bottom-6 right-18" style={{ fontFamily: 'Tomorrow-Bold' }}>
              Copy Template
            </button>
          </div>
        </div>
      )}
    </div>
  );
}