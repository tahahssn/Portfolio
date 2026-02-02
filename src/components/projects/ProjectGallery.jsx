import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Double from './MouseScaleProectGallery';
import { projects } from './Projectdata';


gsap.registerPlugin(ScrollTrigger);

function ProjectGallery() {
  const headingRef = useRef(null);
  const charsRef = useRef([]); // Store references to each character

  useEffect(() => {
    // Animation for the heading
    const chars = charsRef.current.filter(Boolean);
    
    // Set initial state (hidden)
    gsap.set(chars, {
      opacity: 0,
      y: 50,
    });

    // Create a timeline for staggered animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 50%",
        end: "top 30%",
        scrub: false,
        toggleActions: "play none reverse none" // This adds reverse on scroll up
      }
    });

    // Stagger animation for characters (same as before)
    tl.fromTo(chars,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out"
      },
      0 // Start at position 0 in timeline
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      charsRef.current = [];
    };
  }, []);

  // Split heading text into individual characters with spans
  const headingText = "Projects";
  
  const splitText = (text) => {
    return text.split('').map((char, index) => (
      char === ' ' ? 
      <span key={index} className="char">&nbsp;</span> : 
      <span 
        key={index} 
        ref={el => charsRef.current[index] = el}
        className="char inline-block"
      >
        {char}
      </span>
    ));
  };

  return (
    <main className="mt-[5vh] text-white pb-[10vh] bg-black min-h-screen">
      <h1 
        ref={headingRef} 
        className="pt-16 flex items-center justify-center font-[doner] text-7xl tracking-wide font-bold text-[#dbe1ec] overflow-hidden"
      >
        {splitText(headingText)}
      </h1>
      
      <div className="gallery">
        <Double projects={[projects[0], projects[1]]} />
        <Double projects={[projects[2], projects[3]]} reversed={true} />
        {/* <Double projects={[projects[4], projects[5]]} /> */}
        {/* <Double projects={[projects[6], projects[7]]} reversed={true} /> */}
      </div>
    </main>
  );
}

export default ProjectGallery;