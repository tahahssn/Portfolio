import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { 
  FaGithub, FaLinkedin, FaInstagram, 
  FaDiscord
} from "react-icons/fa";
import { FaPatreon } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuBgRef = useRef(null);
  const itemsRef = useRef([]);
  const logoRef = useRef(null);
  const hoverBgRefs = useRef([]);
  const emailRef = useRef(null);
  const emailRollTextRef = useRef(null);
  const socialRefs = useRef([]);
  const tl = useRef(null);

  // Social media data
  const socialLinks = [
    { icon: FaGithub, link: "https://github.com/tahahssn", color: "#fff" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/syed-muhammad-taha-hassan-72aa22383/", color: "#0077b5" },
    { icon: FaPatreon, link: "https://www.patreon.com/cw/SyedTahaHassan", color: "#FF424D" },
    { icon: FaInstagram, link: "https://www.instagram.com/taha.hassan.35/", color: "#e4405f" },
  ];

  useEffect(() => {
    tl.current = gsap.timeline({ paused: true });

    // 1. Background slides down from top
    tl.current.fromTo(
      menuBgRef.current,
      { y: "-100%" },
      {
        y: "0%",
        duration: 0.6,
        ease: "power2.inOut",
      }
    );

    // 2. Menu content appears
    tl.current.to(
      menuRef.current,
      {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // 3. Menu items animate in
    tl.current.fromTo(
      itemsRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // 4. Email appears (bottom right)
    tl.current.fromTo(
      emailRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3"
    );

    // 5. Social icons appear (bottom left)
    tl.current.fromTo(
      socialRefs.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.2"
    );

    // 6. Logo fades out
    tl.current.to(
      logoRef.current,
      {
        opacity: 0,
        pointerEvents: "none",
        duration: 0.3,
      },
      0
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.set(menuRef.current, { display: "flex" });
      gsap.set(menuBgRef.current, { display: "block" });
      tl.current.play();
    } else {
      tl.current.reverse();
      tl.current.eventCallback("onReverseComplete", () => {
        gsap.set(menuRef.current, { display: "none" });
        gsap.set(menuBgRef.current, { display: "none" });
      });
    }
  }, [isOpen]);

  // Handle hover effects for menu links
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

  // Handle email roll text effect
  const handleEmailMouseEnter = () => {
    if (emailRollTextRef.current) {
      gsap.to(emailRollTextRef.current.querySelector('.svg-icon'), {
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  const handleEmailMouseLeave = () => {
    if (emailRollTextRef.current) {
      gsap.to(emailRollTextRef.current.querySelector('.svg-icon'), {
        rotation: -45,
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  // Handle social icon hover
  const handleSocialMouseEnter = (index) => {
    const icon = socialRefs.current[index];
    if (icon) {
      gsap.to(icon, {
        scale: 1.3,
        y: -5,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  };

  const handleSocialMouseLeave = (index) => {
    const icon = socialRefs.current[index];
    if (icon) {
      gsap.to(icon, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  // Handle smooth scroll to sections
  const handleLinkClick = (sectionId) => {
    setIsOpen(false);
    
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        // Smooth scroll with offset for navbar
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    }, 500);
  };

  // Scroll to top when clicking logo
  const handleLogoClick = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const menuItems = [
    { name: "Home", sectionId: "home" },
    { name: "About", sectionId: "about" },
    { name: "Projects", sectionId: "projects" },
    { name: "Contact", sectionId: "contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-2 flex items-center justify-between bg-transparent">
        {/* Logo - scrolls to top */}
        <button
          onClick={handleLogoClick}
          ref={logoRef}
          className="text-xl font-[honer-those] font-[100] tracking-wide text-white cursor-pointer"
        >
          <img className="w-16 h-16 filter invert cursor-pointer" src="/logo.png" alt="Taha Hassan Logo" />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 z-50 px-3"
        >
          <span 
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
              isOpen ? "-rotate-45 -translate-y-1/2" : ""
            }`}
          />
        </button>
      </nav>

      {/* Background that slides from top */}
      <div ref={menuBgRef} className="fixed inset-0 bg-black z-40 hidden" />

      {/* Menu content */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 hidden items-center justify-center"
      >
        {/* Main Navigation Links */}
        <ul className="text-center font-[doner] text-6xl font-bold tracking-wide text-[#b4c3d9] w-full">
          {menuItems.map((item, index) => (
            <li
              key={item.sectionId}
              ref={(el) => (itemsRef.current[index] = el)}
              className="relative border-b border-zinc-600 overflow-hidden w-full bottom-8"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              {/* Hover background */}
              <div
                ref={(el) => (hoverBgRefs.current[index] = el)}
                className="absolute bottom-0 left-0 w-full h-full bg-[#94bcf7] transform translate-y-full opacity-0 pointer-events-none"
                style={{ zIndex: -1 }}
              />

              {/* Anchor link for single page */}
              <a
                href={`#${item.sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(item.sectionId);
                }}
                className="block w-full py-1.5 top-1 hover:text-black duration-300 cursor-pointer relative z-10"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Social Links - Bottom Left */}
        <div className="absolute bottom-8 left-8">
          <div className="flex items-center space-x-4">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  ref={(el) => (socialRefs.current[index] = el)}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-white hover:opacity-100 opacity-80 transition-all duration-300"
                  style={{ color: social.color }}
                  onMouseEnter={() => handleSocialMouseEnter(index)}
                  onMouseLeave={() => handleSocialMouseLeave(index)}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>

        {/* Email - Bottom Right */}
        <div 
          ref={emailRef}
          className="absolute bottom-8 right-8 text-right"
        >
          <div className="mb-2 text-sm text-gray-400">GET IN TOUCH</div>
          <div
            ref={emailRollTextRef}
            onMouseEnter={handleEmailMouseEnter}
            onMouseLeave={handleEmailMouseLeave}
            className="inline-flex items-center cursor-pointer group"
          >
            <a 
              href="mailto:tahahassan699@gmail.com" 
              className="relative text-xl font-medium text-gray-400 group-hover:text-white transition-colors duration-400 mr-3"
            >
              tahahassan699@gmail.com
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"></span>
            </a>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 448 512" 
              className="svg-icon w-5 h-5 fill-gray-400 group-hover:fill-white transition-all duration-500"
              style={{ transform: 'rotate(-45deg)' }}
            >
              <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;