import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const nameRef = useRef(null);
  const percentageRef = useRef(null);
  const preloaderRef = useRef(null);
  const gradient1Ref = useRef(null);
  const gradient2Ref = useRef(null);
  const blurLayerRef = useRef(null);

  useEffect(() => {
    // 1. Create diagonal gradient movement
    const gradientAnimation = gsap.timeline({ repeat: -1 });
    
    // First gradient moves diagonally
    gradientAnimation.to(gradient1Ref.current, {
      x: "100%",
      y: "100%",
      duration: 8,
      ease: "none"
    });
    
    // Second gradient moves opposite diagonal
    gradientAnimation.to(gradient2Ref.current, {
      x: "-100%",
      y: "-100%",
      duration: 8,
      ease: "none"
    }, 0);

    // 2. Smooth percentage counter - 0 to 100%
    let percent = 0;
    const targetPercent = 100;
    const totalDuration = 2500; // 2.5 seconds total
    
    const updatePercentage = () => {
      if (percent < targetPercent) {
        // Easing function for smooth acceleration/deceleration
        const easeInOutCubic = (t) => t < 0.5 
          ? 4 * t * t * t 
          : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        const progress = percent / targetPercent;
        const easedProgress = easeInOutCubic(progress);
        
        // Calculate next percentage
        const increment = 0.5 + (easedProgress * 2); // Faster in middle
        percent = Math.min(percent + increment, targetPercent);
        
        // Update state
        setPercentage(Math.floor(percent));
        
        // Add subtle bounce effect when reaching milestones
        if (Math.floor(percent) % 20 === 0 && percent % 1 < 0.5) {
          gsap.to(percentageRef.current, {
            scale: 1.1,
            duration: 0.2,
            yoyo: true,
            repeat: 1
          });
        }
        
        // Schedule next update
        const nextDelay = 10 + (20 * (1 - easedProgress)); // Faster in middle
        setTimeout(updatePercentage, nextDelay);
      } else {
        // When complete, hide preloader
        setTimeout(() => {
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => setIsVisible(false)
          });
        }, 500);
      }
    };

    // Start percentage counter
    setTimeout(updatePercentage, 300);

    // 3. Disable scroll during preloader
    document.body.style.overflow = 'hidden';

    return () => {
      gradientAnimation.kill();
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] overflow-hidden"
    >
      {/* Base background - dark */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* First gradient layer */}
      <div
        ref={gradient1Ref}
        className="absolute top-0 left-0 w-[200%] h-[200%]"
        style={{
          background: "linear-gradient(135deg, rgba(148, 188, 247, 0.1) 0%, rgba(180, 195, 217, 0.05) 100%)",
          transform: "translateX(-50%) translateY(-50%)"
        }}
      />
      
      {/* Second gradient layer */}
      <div
        ref={gradient2Ref}
        className="absolute bottom-0 right-0 w-[200%] h-[200%]"
        style={{
          background: "linear-gradient(135deg, rgba(180, 195, 217, 0.05) 0%, rgba(148, 188, 247, 0.1) 100%)",
          transform: "translateX(50%) translateY(50%)"
        }}
      />
      
      {/* Blur overlay layer */}
      <div
        ref={blurLayerRef}
        className="absolute inset-0 backdrop-blur-[2px]"
        style={{
          background: "radial-gradient(circle at center, transparent 30%, rgba(10, 10, 10, 0.7) 100%)"
        }}
      />

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center">
        {/* Your Name in Middle */}
        <div className="text-center mb-16">
          <h1 
            ref={nameRef}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              opacity: 0.9
            }}
          >
            Taha Hassan
          </h1>
          <p className="mt-4 text-gray-500 text-sm tracking-widest uppercase">
            Portfolio Loading
          </p>
        </div>

        {/* Percentage Counter - Bottom Right Corner */}
        <div 
          ref={percentageRef}
          className="absolute bottom-8 right-8"
          style={{
            fontSize: '6rem',
            fontWeight: 300,
            color: 'rgba(255, 255, 255, 0.5)', // White with 50% opacity
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "-0.05em"
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;