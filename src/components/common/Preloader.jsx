import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [percentage, setPercentage] = useState(0);
  const preloaderRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2500;
    const step = 50;
    let percent = 0;

    const interval = setInterval(() => {
      percent = Math.min(percent + 100 / (duration / step), 100);
      const floored = Math.floor(percent);
      setPercentage(floored);

      // Sync bar width
      if (barRef.current) {
        gsap.to(barRef.current, {
          width: `${floored}%`,
          duration: step / 1000,
          ease: "none",
        });
      }

      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          gsap.to(preloaderRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
              setIsVisible(false);
              document.body.style.overflow = "auto";
            },
          });
        }, 600);
      }
    }, step);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "auto";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Counter — bottom right */}
      <div className="absolute bottom-4 right-8 text-[5.5rem] font-thin leading-none text-white/70 font-[honer-those] max-md:text-[4rem] max-md:right-6 max-sm:text-[3rem] max-sm:right-4">
        {percentage}%
      </div>

      {/* Progress bar — full width, flush to bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10">
        <div
          ref={barRef}
          className="h-full bg-white/60"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
};

export default Preloader;