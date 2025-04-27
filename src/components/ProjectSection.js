"use client";
import Image from "next/image";

const ProjectSection = () => {
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
    </div>
  );
};

export default ProjectSection;
