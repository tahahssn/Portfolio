import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MarqueeText = () => {
  const marqueeRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const element = marqueeRef.current;
    
    // Kill any existing animations
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Create new animation with force3D for better performance
    animationRef.current = gsap.to(element, {
      x: '-20%',
      duration: 20,
      ease: 'none',
      repeat: -1,
      force3D: true, // Forces hardware acceleration
      overwrite: true,
    });

    // Ensure animation continues no matter what
    const maintainAnimation = () => {
      if (animationRef.current && animationRef.current.isActive() === false) {
        animationRef.current.restart();
      }
    };

    // Check animation status periodically
    const interval = setInterval(maintainAnimation, 100);

    // Cleanup
    return () => {
      clearInterval(interval);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div 
      className="marquee-container border-y border-zinc-800 bg-black relative z-[70] py-10 overflow-hidden"
      style={{ 
        pointerEvents: 'none', // This is key - prevents ALL hover interactions
      }}
    >
      <div 
        ref={marqueeRef} 
        className="flex whitespace-nowrap w-fit will-change-transform" // will-change optimizes animation
        style={{ 
          pointerEvents: 'none',
          transform: 'translateZ(0)', // Additional hardware acceleration
        }}
      >
        {/* First set - Your Core Identity */}
        <div className="flex gap-6 mx-4 text-white/90 font-[Bremer] text-7xl uppercase tracking-tight">
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#60A5FA]">FRONTEND</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#34D399]">AI/ML</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#C084FC]">INNOVATION</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#FBBF24]">CREATIVITY</span>
          <span className="text-transparent font-black [-webkit-text-stroke:1px_#FFFFFF]">✦</span>
        </div>

        {/* Second set - What You Build */}
        <div className="flex gap-6 mx-4 text-white/90 font-[doner] text-7xl uppercase tracking-[0.2em]">
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#60A5FA]">MODERN WEB</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#34D399]">SMART SYSTEMS</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#C084FC]">EXPERIENCES</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
        </div>

        {/* DUPLICATE - for seamless loop */}
        <div className="flex gap-6 mx-4 text-white/90 font-[doner] text-7xl uppercase tracking-[0.2em]">
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#60A5FA]">FRONTEND</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#34D399]">AI/ML</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#C084FC]">INNOVATION</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FBBF24]">CREATIVITY</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
        </div>

        {/* DUPLICATE second set */}
        <div className="flex gap-6 mx-4 text-white/90 font-[doner] text-7xl uppercase tracking-[0.2em]">
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#60A5FA]">MODERN WEB</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#34D399]">SMART SYSTEMS</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#C084FC]">EXPERIENCES</span>
          <span className="text-transparent font-black [-webkit-text-stroke:0.1px_#FFFFFF]">✦</span>
        </div>
      </div>
    </div>
  );
};

export default MarqueeText;