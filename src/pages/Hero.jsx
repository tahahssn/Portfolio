import React from "react";

import Backdrop from "../components/home/Backdrop";
import HeroContent from "../components/home/HeroContent";

const Hero = () => {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Living WebGL visual */}
      <Backdrop />

      {/* Typography / interaction layer */}
      <HeroContent />
    </section>
  );
};

export default Hero;