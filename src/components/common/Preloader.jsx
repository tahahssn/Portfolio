import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const preloaderRef = useRef(null);
  const gradient1Ref = useRef(null);
  const gradient2Ref = useRef(null);
  const percentageRef = useRef(null);
  const nameRef = useRef(null);
  const titleRef = useRef(null);

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
    
    // RESET: Text elements
    gsap.set(nameRef.current, {
      opacity: 0,
      y: 20
    });
    
    gsap.set(titleRef.current, {
      opacity: 0,
      y: 20
    });
    
    // 1. Gradients expand from corners
    tl.to(gradient1Ref.current, {
      width: "100%",
      height: "100%",
      duration: 3,
      ease: "power2.out"
    }, 0);
    
    tl.to(gradient2Ref.current, {
      width: "100%",
      height: "100%",
      duration: 3,
      ease: "power2.out"
    }, 0);
    
    // 2. Gradients blend together
    tl.to([gradient1Ref.current, gradient2Ref.current], {
      opacity: 0.7,
      duration: 2,
      ease: "power2.inOut"
    }, 0.5);

    // 3. Animate text in center
    tl.to(nameRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 1);

    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out"
    }, 1.2);

    // 4. Percentage counter
    const duration = 2500;
    let percent = 0;
    const interval = setInterval(() => {
      percent += 100 / (duration / 50);
      if (percent > 100) percent = 100;
      setPercentage(Math.floor(percent));
      
      // Pulse effect on percentage
      if (percentageRef.current) {
        gsap.to(percentageRef.current, {
          scale: 1.05,
          duration: 0.5,
          ease: "power1.out",
          yoyo: true,
          repeat: 1
        });
      }
      
      // Text glow effects
      if (percent >= 50 && percent < 51) {
        gsap.to(nameRef.current, {
          duration: 0.5,
          yoyo: true,
          repeat: 1
        });
      }
      
      if (percent >= 80 && percent < 81) {
        gsap.to(titleRef.current, {
          duration: 0.5,
          yoyo: true,
          repeat: 1
        });
      }
      
      if (percent >= 100) {
        clearInterval(interval);
        
        // Final text animation
        gsap.to([nameRef.current, titleRef.current], {
          opacity: 0.8,
          scale: 0.98,
          duration: 0.3,
          ease: "power2.out"
        });
        
        // Fade out preloader
        setTimeout(() => {
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsVisible(false);
              document.body.style.overflow = 'auto';
            }
          });
        }, 800);
      }
    }, 50);

    // Disable scroll
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
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top-left gradient */}
        <div 
          ref={gradient1Ref}
          className="absolute top-0 left-0 rounded-br-full blur-[60px]"
          style={{
            background: 'radial-gradient(circle at top left, #94bcf7 0%, transparent 70%)'
          }}
        />
        
        {/* Bottom-right gradient */}
        <div 
          ref={gradient2Ref}
          className="absolute bottom-0 right-0 rounded-tl-full blur-[60px]"
          style={{
            background: 'radial-gradient(circle at bottom right, #b4c3d9 0%, transparent 70%)'
          }}
        />
        
        {/* Blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[30px] bg-black/20" />
      </div>

      {/* Center text */}
      <div className="relative z-10 text-center px-4">
        <div 
          ref={nameRef}
          className="text-3xl md:text-6xl text-white font-[GCGudlakDemo-SemiBold] mb-1 tracking-wider opacity-0"
        >
          Taha Hassan
        </div>
        
        <div 
          ref={titleRef}
          className="text-1xl text-gray-300 font-[doner] tracking-wider opacity-0"
        >
          AI/ML Enthusiast | Frontend Developer
        </div>
      </div>

      {/* Percentage counter */}
      <div 
        ref={percentageRef}
        className="absolute bottom-0 right-8 z-10 text-[5.5rem] font-thin text-white/70 font-[honer-those]"
      >
        {percentage}%
      </div>
    </div>
  );
};

export default Preloader;