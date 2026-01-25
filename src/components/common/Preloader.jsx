import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const preloaderRef = useRef(null);
  const gradient1Ref = useRef(null);
  const gradient2Ref = useRef(null);
  const percentageRef = useRef(null);
  
  // Two minimalist gradient colors
  const colors = {
    primary: "#94bcf7", // Your theme blue
    secondary: "#b4c3d9", // Your theme light blue-gray
    dark: "#0a0a0d" // Dark background
  };

  useEffect(() => {
    // Animate two gradients blending diagonally
    const tl = gsap.timeline();
    
    // First gradient animation (coming from top-left)
    tl.fromTo(gradient1Ref.current,
      { 
        x: "-100%", 
        y: "-100%",
        opacity: 0.8 
      },
      { 
        x: "100%", 
        y: "100%",
        opacity: 0.6,
        duration: 8,
        repeat: -1,
        ease: "none"
      }
    );
    
    // Second gradient animation (coming from bottom-right)
    tl.fromTo(gradient2Ref.current,
      { 
        x: "100%", 
        y: "100%",
        opacity: 0.8 
      },
      { 
        x: "-100%", 
        y: "-100%",
        opacity: 0.6,
        duration: 10,
        repeat: -1,
        ease: "none"
      },
      0 // Start at same time
    );

    // Percentage counter - smooth increase
    const duration = 3000; // 3 seconds total
    const increment = 100 / (duration / 16); // 60fps
    
    let startTime = null;
    let animationFrame;
    
    const animatePercentage = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const newPercentage = Math.min((elapsed / duration) * 100, 100);
      
      setPercentage(Math.floor(newPercentage));
      
      // Smooth number animation
      if (percentageRef.current) {
        gsap.to(percentageRef.current, {
          scale: 1.05,
          duration: 0.1,
          ease: "power1.out",
          yoyo: true,
          repeat: 1
        });
      }
      
      if (newPercentage < 100) {
        animationFrame = requestAnimationFrame(animatePercentage);
      } else {
        // When 100% reached, fade out smoothly
        setTimeout(() => {
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 1.2,
            ease: "power2.inOut",
            onComplete: () => setIsVisible(false)
          });
        }, 500); // Small pause at 100%
      }
    };
    
    animationFrame = requestAnimationFrame(animatePercentage);
    
    // Disable scroll during preloader
    document.body.style.overflow = 'hidden';
    
    return () => {
      tl.kill();
      if (animationFrame) cancelAnimationFrame(animationFrame);
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background with two blending gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First gradient - diagonal movement */}
        <div 
          ref={gradient1Ref}
          className="absolute w-[150%] h-[150%] blur-[80px]"
          style={{
            background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`,
            opacity: 0.6
          }}
        />
        
        {/* Second gradient - opposite diagonal movement */}
        <div 
          ref={gradient2Ref}
          className="absolute w-[150%] h-[150%] blur-[100px]"
          style={{
            background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)`,
            opacity: 0.6
          }}
        />
        
        {/* Overlay blur for smooth blending */}
        <div className="absolute inset-0 backdrop-blur-[20px] bg-black/10" />
      </div>

      {/* Percentage Counter - Bottom Right Corner */}
      <div 
        ref={percentageRef}
        className="absolute bottom-8 right-8 z-10"
        style={{
          fontSize: '6rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.05em',
          lineHeight: 1
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default Preloader;