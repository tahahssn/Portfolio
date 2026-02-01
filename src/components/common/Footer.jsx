import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const itemsRef = useRef([]);
  const hoverBgRefs = useRef([]);
  const footerRef = useRef(null);
  const copyrightRef = useRef(null);

  // Contact links in menu style
  const contactLinks = [
    { 
      name: "WhatsApp", 
      link: "https://wa.me/+923222338629",
      color: "#25D366"
    },
    { 
      name: "LinkedIn", 
      link: "https://www.linkedin.com/in/syed-muhammad-taha-hassan-72aa22383/",
      color: "#0077b5"
    },
    { 
      name: "GitHub", 
      link: "https://github.com/tahahssn",
      color: "#b4c3d9"
    },
    { 
      name: "Patreon", 
      link: "https://www.patreon.com/cw/SyedTahaHassan",
      color: "#FF424D"
    },
    { 
      name: "tahahassan699@gmail.com", 
      link: "mailto:tahahassan699@gmail.com",
      color: "#94bcf7"
    },
  ];

  // Handle hover effects for contact links
  const handleMouseEnter = (index) => {
    const hoverBg = hoverBgRefs.current[index];
    if (hoverBg) {
      gsap.to(hoverBg, {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = (index) => {
    const hoverBg = hoverBgRefs.current[index];
    if (hoverBg) {
      gsap.to(hoverBg, {
        y: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  useEffect(() => {
    // GSAP ScrollTrigger animation for footer reveal
    const ctx = gsap.context(() => {
      // Animate menu items with scroll trigger
      gsap.fromTo(
        itemsRef.current,
        { 
          y: 80, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power1.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 50%",
            end: "top 20%",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate copyright
      gsap.fromTo(
        copyrightRef.current,
        { 
          y: 40, 
          opacity: 0 
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: "0.20",
          delay: 0.6,          
          ease: "power1.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top top",
            end: "top 30%",
            toggleActions: "play none none reverse",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="w-full bg-black text-white h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-black opacity-50" />
      
      <div className="relative z-10 w-full mx-auto">
        {/* Contact Links - Main section */}
        <div className="mb-9">
          <ul className="text-center font-[doner] text-4xl md:text-5xl font-bold tracking-wide text-[#b4c3d9]">
            {contactLinks.map((item, index) => (
              <li
                key={index}
                ref={(el) => (itemsRef.current[index] = el)}
                className="relative border-b border-zinc-700 overflow-hidden w-full"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {/* Hover background */}
                <div
                  ref={(el) => (hoverBgRefs.current[index] = el)}
                  className="absolute bottom-0 left-0 w-full h-full transform translate-y-full opacity-0 pointer-events-none"
                  style={{ 
                    backgroundColor: item.color,
                    zIndex: -1 
                  }}
                />

                {/* Contact link */}
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-1 hover:text-black duration-300 cursor-pointer relative z-10"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright Section */}
        <div 
          ref={copyrightRef}
          className="text-center"
        >
          <p className="text-gray-400 text-sm font-light tracking-wider mb-2 font-[doner]">
            © {new Date().getFullYear()} Taha Hassan. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs font-light font-[doner]">
            Crafted with passion and precision
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;