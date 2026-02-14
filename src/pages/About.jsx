// components/AboutSection.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useMousePosition from "../hooks/useMousePosition";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;
  
  // Refs for letter animation
  const sectionRef = useRef(null);
  const backgroundTextRef = useRef(null);
  const maskTextRef = useRef(null);

  // Don't render until we have mouse position
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Letter animation effect
  useEffect(() => {
    if (!mounted) return;

    // Get all letters after they're rendered
    const backgroundLetters = document.querySelectorAll('.background-letter');
    const maskLetters = document.querySelectorAll('.mask-letter');
    
    if (backgroundLetters.length === 0 || maskLetters.length === 0) return;

    // Kill any existing scroll triggers
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // Create timeline for background text
    gsap.fromTo(backgroundLetters, 
      {
        opacity: 0.2,
      },
      {
        opacity: 1,
        stagger: {
          each: 0.01,
          from: "start",
          grid: "auto",
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center 30%",
          scrub: 0.5,
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      }
    );

    // Create timeline for mask text
    gsap.fromTo(maskLetters,
      {
        opacity: 0.2,
      },
      {
        opacity: 1,
        stagger: {
          each: 0.01,
          from: "start",
          grid: "auto",
          ease: "power1.inOut",
        },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center 30%",
          scrub: 0.5,
          toggleActions: "play reverse play reverse",
          invalidateOnRefresh: true,
        },
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [mounted]);

  // Function to split text into word spans
  const splitIntoWords = (text, className) => {
    return text.split(' ').map((word, wordIndex) => {
      return (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <span key={`${wordIndex}-${charIndex}`} className={`${className} inline-block`} style={{ opacity: 0.2 }}>
              {char}
            </span>
          ))}
        </span>
      );
    }).reduce((prev, curr, i) => {
      return i === 0 ? [curr] : [...prev, ' ', curr];
    }, []);
  };

  // If not mounted yet, just show background
  if (!mounted) {
    return (
      <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="w-[1000px] p-10 text-5xl leading-[50px] cursor-default text-[#dbe1ec] font-[Dangerous]">
            I'm <span className="text-[#2316da]">Taha Hassan</span> Frontend Developer & AI/ML Enthusiast with strong focus on producing high quality & impactful digital experience.
          </p>
        </div>
      </section>
    );
  }

  // Calculate mask position
  const maskPosition = x && y ? `${x - size/2}px ${y - size/2}px` : "center";

  // Split text into letters
  const backgroundText = "I'm Taha Hassan Frontend Developer & AI/ML Enthusiast with strong focus on producing high quality & impactful digital experience.";
  const maskText = "A Frontend Developer & AI/ML Enthusiast - with skills that haven't been replaced by A.I (yet because he's working with AI) - making good shit only if the paycheck is equally good.";

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden">
      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <p ref={backgroundTextRef} className="w-[1000px] p-10 text-5xl leading-[50px] cursor-default text-[#dbe1ec] font-[Dangerous]">
          {splitIntoWords(backgroundText, 'background-letter')}
        </p>
      </div>

      {/* MASK LAYER */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center z-10 bg-[#2316da] text-white"
        style={{
          maskImage: "url('/mask.svg')",
          maskRepeat: "no-repeat",
          maskSize: `${size}px`,
          maskPosition: maskPosition,
          WebkitMaskImage: "url('/mask.svg')",
          WebkitMaskRepeat: "no-repeat",
          WebkitMaskSize: `${size}px`,
          WebkitMaskPosition: maskPosition,
        }}
        animate={{
          WebkitMaskSize: `${size}px`,
          maskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <p 
          ref={maskTextRef}
          className="w-[1000px] p-10 text-5xl leading-[50px] cursor-default font-[Dangerous]"
        >
          {splitIntoWords(maskText, 'mask-letter')}
        </p>
      </motion.div>
    </section>
  );
};

export default About;