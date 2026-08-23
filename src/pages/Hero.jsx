import React, { lazy, Suspense } from "react";

import HeroContent from "../components/home/HeroContent";

const Backdrop = lazy(() => import("../components/home/Backdrop"));

const Hero = () => {
  return (
    <section className="relative h-screen w-screen overflow-hidden bg-black">
      {/* Living WebGL visual */}
      <Suspense
        fallback={
          <div className="absolute inset-0 h-full w-full bg-black">
            <img
              src="/images/herobg1.avif"
              alt=""
              className="absolute inset-0 h-full w-full object-cover pointer-events-none"
              decoding="async"
            />
          </div>
        }
      >
        <Backdrop />
      </Suspense>

      {/* Typography / interaction layer */}
      <HeroContent />
    </section>
  );
};

export default Hero;