import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const preloaderRef = useRef(null);
  const gradient1Ref = useRef(null); // Top-left gradient
  const gradient2Ref = useRef(null); // Bottom-right gradient
  const percentageRef = useRef(null);
  
  // Colors
  const colors = {
    gradient1: "#94bcf7", // Blue
    gradient2: "#b4c3d9", // Light blue-gray
    dark: "#0a0a0a"
  };

  useEffect(() => {
    const tl = gsap.timeline();
    
    // RESET: Both gradients start small at their corners
    gsap.set(gradient1Ref.current, {
      width: "0%",
      height: "0%",
      top: "0%",
      left: "0%",
      opacity: 1
    });
    
    gsap.set(gradient2Ref.current, {
      width: "0%",
      height: "0%",
      bottom: "0%",
      right: "0%",
      opacity: 1
    });
    
    // 1. FIRST: Both gradients expand from their corners
    tl.to(gradient1Ref.current, {
      width: "100%",
      height: "100%",
      duration: 1.5,
      ease: "power2.out"
    }, 0);
    
    tl.to(gradient2Ref.current, {
      width: "100%",
      height: "100%",
      duration: 1.5,
      ease: "power2.out"
    }, 0);
    
    // 2. THEN: They blend together in the middle
    tl.to([gradient1Ref.current, gradient2Ref.current], {
      opacity: 0.7,
      duration: 1,
      ease: "power2.inOut"
    }, 0.5);

    // 3. Percentage counter - smooth increase
    const duration = 2500; // 2.5 seconds total
    let percent = 0;
    const interval = setInterval(() => {
      percent += 100 / (duration / 50); // Smooth increment
      if (percent > 100) percent = 100;
      setPercentage(Math.floor(percent));
      
      // Subtle pulse on percentage change
      if (percentageRef.current) {
        gsap.to(percentageRef.current, {
          scale: 1.05,
          duration: 0.1,
          ease: "power1.out",
          yoyo: true,
          repeat: 1
        });
      }
      
      if (percent >= 100) {
        clearInterval(interval);
        
        // Wait 300ms at 100%, then fade out
        setTimeout(() => {
          // Fade out the entire preloader smoothly
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsVisible(false);
              // Show home page smoothly by enabling scroll
              document.body.style.overflow = 'auto';
              
              // Optional: Add a subtle fade-in for homepage content
              gsap.fromTo("body > *:not(#root)",
                { opacity: 0 },
                { opacity: 1, duration: 0.5, delay: 0.2 }
              );
            }
          });
        }, 300);
      }
    }, 50); // Update every 50ms for smoothness

    // Disable scroll during preloader
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    
    return () => {
      tl.kill();
      clearInterval(interval);
      document.body.style.overflow = 'auto';
      document.body.style.height = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Background with two expanding gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* First gradient - expands from TOP-LEFT corner */}
        <div 
          ref={gradient1Ref}
          className="absolute top-0 left-0 rounded-br-full"
          style={{
            background: `radial-gradient(circle at top left, ${colors.gradient1} 0%, transparent 70%)`,
            opacity: 1,
            filter: 'blur(60px)',
            transformOrigin: 'top left'
          }}
        />
        
        {/* Second gradient - expands from BOTTOM-RIGHT corner */}
        <div 
          ref={gradient2Ref}
          className="absolute bottom-0 right-0 rounded-tl-full"
          style={{
            background: `radial-gradient(circle at bottom right, ${colors.gradient2} 0%, transparent 70%)`,
            opacity: 1,
            filter: 'blur(60px)',
            transformOrigin: 'bottom right'
          }}
        />
        
        {/* Overlay blur for smooth blending */}
        <div className="absolute inset-0 backdrop-blur-[30px] bg-black/20" />
      </div>

      {/* Percentage Counter - Bottom Right Corner */}
      <div 
        ref={percentageRef}
        className="absolute bottom-8 right-8 z-10"
        style={{
          fontSize: '5rem',
          fontWeight: 300,
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: "'Inter', sans-serif",
          letterSpacing: '-0.05em',
          textShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
      >
        {percentage}%
      </div>
    </div>
  );
};

export default Preloader;