"use client";
import Image from "next/image";

const ProjectSection = () => {
  return (
    <div className="flex flex-col items-start justify-center pb-46 px-36 bg-[#e2e2e2]">
      <div className="max-w-6xl mb-8">
        <h1
          className="text-4xl font-bold text-black mb-4"
          style={{ fontFamily: "Tomorrow-Bold" }}
        >
          Hey, Divyam here.
        </h1>
        <p className="text-xl text-black" style={{ fontFamily: "Tomorrow" }}>
          I&apos;m a Web Designer & Developer with a passion for building clean,
          functional, and visually striking websites. I help individuals,
          startups, and businesses create a strong digital presence through
          custom design and solid development. Whether it&apos;s crafting a
          brand-new site or refreshing an existing one, I focus on creating
          smooth, user-friendly experiences that align with your goals.
        </p>
      </div>
      <div className="border-t-2 border-[#3730ff] w-full mb-0"></div>
      <div className="flex items-start justify-between w-full space-x-8">
        {/* Start a Project Button */}
        <div
          className="bg-[#3730ff] text-white font-bold py-6 px-8 flex items-center justify-between button-hover transition-all duration-300"
          style={{ fontFamily: "Tomorrow-Bold", cursor: "pointer" }}
        >
          <div className="flex flex-col text-left">
            <span className="text-2xl">START A</span>
            <span className="text-2xl">PROJECT</span>
          </div>
          <Image
            src="/rocket-button.png"
            alt="Rocket"
            width={64}
            height={64}
            className="ml-4 rocket-hover transition-all duration-300"
          />
        </div>

        {/* Right Side Text Box with Full-Width Top Border */}
        <div
          className="flex-1 max-w-xl text-left pt-4"
          style={{ fontFamily: "Tomorrow" }}
        >
          <h2
            className="text-lg font-bold text-black mb-2"
            style={{ fontFamily: "Tomorrow-Bold" }}
          >
            Need help launching your next website or brand?
          </h2>
          <p className="text-sm text-black">
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
