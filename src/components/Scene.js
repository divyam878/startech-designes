"use client";

import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import Moon from "./Moon";
import Navbar from "./Navbar";
import DesignerSection from "./DesignerSection";
import ProjectSection from "./ProjectSection";
import SkillsSection from './SkillsSection';
import ServicesSection from './ServicesSection';
import WorkSection from './WorkSection';
import CollaborationSection from './CollaborationSection';
import StarWarsCrawlSection from './StarWarsCrawlSection';
import EmailSection from './EmailSection';
import Footer from './Footer';
const Scene = () => {
  return (
    <>
      <Navbar />
      <div className="h-screen w-full bg-[#e2e2e2]">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <color attach="background" args={["#e2e2e2"]} />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />
          <pointLight position={[10, 5, 5]} intensity={0.8} />
          <Sparkles count={50} scale={12} size={1} speed={0.3} opacity={0.2} />
          <Moon />
        </Canvas>
        <div className="absolute top-1/6 md:top-1/4 left-10 md:left-20 z-10 text-black">
          <h1 className="text-5xl md:text-7xl font-bold tracking-wider">
            <span style={{ fontFamily: "Tomorrow" }}>WEBSITE</span>
            <br />
            <span style={{ fontFamily: "Tomorrow" }}>DESIGN</span>
          </h1>
        </div>
        <div className="absolute bottom-20 right-10 md:bottom-20 md:right-20 z-10">
          <h2
            className="text-3xl md:text-6xl font-bold bg-[#3730ff] text-white px-6 py-3"
            style={{ fontFamily: "RetroPix" }}
          >
            DEVELOPMENT
          </h2>
        </div>
      </div>
      <DesignerSection />
      <ProjectSection />
      <ServicesSection />
      <SkillsSection />
      <WorkSection />
      <CollaborationSection />
      <StarWarsCrawlSection />
      <EmailSection />
      <Footer /> {/* Add the new footer here */}
    </>
  );
};

export default Scene;
