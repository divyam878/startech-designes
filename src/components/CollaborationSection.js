import Image from 'next/image';
import { useState } from 'react';

export default function CollaborationSection() {
  const [isClicked, setIsClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullname: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      setIsModalOpen(true);
    }, 300);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsClicked(false);
    setSuccess(false);
    setFormData({
      fullname: '',
      mobile: '',
      email: '',
      message: ''
    });
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

        {/* Modal with Web3Forms */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-[#e2e2e2] bg-opacity-90 flex items-center justify-center p-4 md:p-0 z-50">
            <div className="bg-white p-6 md:p-12 rounded-2xl shadow-lg border-4 border-[#05204a] relative w-full md:w-4/5 max-w-2xl">
              <button 
                onClick={handleCloseModal} 
                className="absolute top-4 right-4 text-[#05204a] text-xl hover:text-black transition-colors"
              >
                ✕
              </button>
              
              {!success ? (
                <>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#05204a] mb-8" style={{ fontFamily: 'Tomorrow-Bold' }}>
                    Let&apos;s Connect
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile Number"
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
                      />
                    </div>

                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        required
                        rows="4"
                        className="w-full px-4 py-3 rounded-lg border-2 border-[#05204a] bg-white text-black focus:outline-none focus:ring-2 focus:ring-[#05204a]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-8 py-4 bg-[#05204a] text-white rounded-lg font-bold hover:bg-[#0e1e4d] transition-colors duration-300 disabled:opacity-50"
                      style={{ fontFamily: 'Tomorrow-Bold' }}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] py-12 text-center">
                  <div className="checkmark-circle">
                    <div className="checkmark"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#05204a] mt-6 px-4" style={{ fontFamily: 'Tomorrow-Bold' }}>
                    Message Sent Successfully!
                  </h3>
                  <p className="text-[#05204a] mt-2 px-4">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add this style for the checkmark animation */}
        <style jsx>{`
          .checkmark-circle {
            width: 100px;
            height: 100px;
            position: relative;
            background: #e8f0fe;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: circle-appear 0.4s ease-in-out forwards;
          }

          .checkmark {
            width: 50px;
            height: 25px;
            border-left: 4px solid #05204a;
            border-bottom: 4px solid #05204a;
            transform: rotate(-45deg);
            position: absolute;
            left: 45%;
            top: 30%;
            margin-left: -15px;
            animation: checkmark-draw 0.8s ease-out forwards;
            opacity: 0;
          }

          @keyframes circle-appear {
            from {
              transform: scale(0);
            }
            to {
              transform: scale(1);
            }
          }

          @keyframes checkmark-draw {
            0% {
              width: 0;
              height: 0;
              opacity: 0;
            }
            20% {
              opacity: 1;
            }
            100% {
              width: 50px;
              height: 25px;
              opacity: 1;
            }
          }
        `}</style>

      </div>
    </div>
  );
}