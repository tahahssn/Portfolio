import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaPatreon,
} from "react-icons/fa6";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navbarRef = useRef(null);

  const logoRef = useRef(null);
  const menuTriggerRef = useRef(null);

  const overlayRef = useRef(null);

  const menuLogoRef = useRef(null);
  const closeTriggerRef = useRef(null);

  const menuLinksRef = useRef([]);
  const menuNumbersRef = useRef([]);

  const rightColumnRef = useRef(null);
  const emailBlockRef = useRef(null);
  const elsewhereBlockRef = useRef(null);
  const resumeRef = useRef(null);
  const socialRefs = useRef([]);

  const timelineRef = useRef(null);

  const socialLinks = [
    {
      label: "GitHub",
      href: "https://github.com/tahahssn",
      icon: FaGithub,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/syed-muhammad-taha-hassan-72aa22383/",
      icon: FaLinkedin,
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/taha.hassan.35/",
      icon: FaInstagram,
    },
    {
      label: "Patreon",
      href: "https://www.patreon.com/cw/SyedTahaHassan",
      icon: FaPatreon,
    },
  ];

  const menuItems = [
    {
      number: "01",
      name: "WORK",
      sectionId: "projects",
    },
    {
      number: "02",
      name: "ABOUT",
      sectionId: "about",
    },
    {
      number: "03",
      name: "CONTACT",
      sectionId: "contact",
    },
  ];

  // ==========================================================
  // INITIAL NAVBAR ENTRANCE
  // ==========================================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [logoRef.current, menuTriggerRef.current],
        {
          y: -24,
          opacity: 0,
        }
      );

      gsap.to(
        [logoRef.current, menuTriggerRef.current],
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.35,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true,
        }
      );
    }, navbarRef);

    return () => ctx.revert();
  }, []);

  // ==========================================================
  // MASTER MENU TIMELINE
  //
  // THIS TIMELINE IS THE IMPORTANT PART.
  //
  // OPEN  = play()
  // CLOSE = reverse()
  //
  // Therefore the close animation is automatically the exact
  // reverse of the open animation.
  // ==========================================================

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          overwrite: "auto",
        },
      });

      timelineRef.current = tl;

      // ------------------------------------------------------
      // INITIAL STATES
      // ------------------------------------------------------

      gsap.set(overlayRef.current, {
        yPercent: -100,
        pointerEvents: "none",
      });

      gsap.set(
        [
          menuLogoRef.current,
          closeTriggerRef.current,
        ],
        {
          opacity: 0,
        }
      );

      gsap.set(menuLinksRef.current, {
        y: 28,
        opacity: 0,
      });

      gsap.set(menuNumbersRef.current, {
        y: 12,
        opacity: 0,
      });

      gsap.set(rightColumnRef.current, {
        y: 24,
        opacity: 0,
      });

      gsap.set(
        [
          emailBlockRef.current,
          elsewhereBlockRef.current,
          resumeRef.current,
        ],
        {
          y: 16,
          opacity: 0,
        }
      );

      gsap.set(socialRefs.current, {
        y: 10,
        opacity: 0,
      });

      // ------------------------------------------------------
      // 01 — CLOSED NAVBAR FADES AWAY
      //
      // It DOES NOT MOVE.
      // ------------------------------------------------------

      tl.to(
        [logoRef.current, menuTriggerRef.current],
        {
          opacity: 0,
          duration: 0.42,
          ease: "power2.inOut",
        },
        0
      );

      // ------------------------------------------------------
      // 02 — BLACK SCREEN COMES DOWN FROM TOP
      // ------------------------------------------------------

      tl.to(
        overlayRef.current,
        {
          yPercent: 0,
          pointerEvents: "auto",
          duration: 0.72,
          ease: [0.76, 0, 0.24, 1],
        },
        0
      );

      // ------------------------------------------------------
      // 03 — MENU HEADER FADES IN
      // ------------------------------------------------------

      tl.to(
        [
          menuLogoRef.current,
          closeTriggerRef.current,
        ],
        {
          opacity: 1,
          duration: 0.46,
          stagger: 0.06,
          ease: "power2.out",
        },
        0.42
      );

      // ------------------------------------------------------
      // 04 — MENU NUMBERS
      // ------------------------------------------------------

      tl.to(
        menuNumbersRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.46
      );

      // ------------------------------------------------------
      // 05 — MENU LINKS
      // ------------------------------------------------------

      tl.to(
        menuLinksRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.62,
          stagger: 0.08,
          ease: [0.22, 1, 0.36, 1],
        },
        0.40
      );

      // ------------------------------------------------------
      // 06 — RIGHT COLUMN
      // ------------------------------------------------------

      tl.to(
        rightColumnRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.52,
          ease: "power3.out",
        },
        0.58
      );

      // ------------------------------------------------------
      // 07 — EMAIL
      // ------------------------------------------------------

      tl.to(
        emailBlockRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0.66
      );

      // ------------------------------------------------------
      // 08 — ELSEWHERE
      // ------------------------------------------------------

      tl.to(
        elsewhereBlockRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0.71
      );

      // ------------------------------------------------------
      // 09 — SOCIALS
      // ------------------------------------------------------

      tl.to(
        socialRefs.current,
        {
          y: 0,
          opacity: 0.72,
          duration: 0.4,
          stagger: 0.04,
          ease: "power3.out",
        },
        0.74
      );

      // ------------------------------------------------------
      // 10 — RESUME
      // ------------------------------------------------------

      tl.to(
        resumeRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.42,
          ease: "power3.out",
        },
        0.78
      );
    }, navbarRef);

    return () => {
      timelineRef.current?.kill();
      ctx.revert();
    };
  }, []);

  // ==========================================================
  // PLAY / REVERSE MASTER TIMELINE
  // ==========================================================

  useEffect(() => {
    const tl = timelineRef.current;

    if (!tl) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";

      /*
       * Play forward.
       */
      tl.play();
    } else {
      /*
       * Reverse the exact same animation.
       */
      tl.reverse();

      tl.eventCallback(
        "onReverseComplete",
        () => {
          document.body.style.overflow = "";
        }
      );
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ==========================================================
  // LINK HOVER
  // ==========================================================

  const handleLinkEnter = (index) => {
    const link = menuLinksRef.current[index];

    if (!link) return;

    gsap.to(link, {
      x: 10,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  const handleLinkLeave = (index) => {
    const link = menuLinksRef.current[index];

    if (!link) return;

    gsap.to(link, {
      x: 0,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  // ==========================================================
  // LOGO
  // ==========================================================

  const handleLogoClick = (event) => {
    event.preventDefault();

    if (isOpen) {
      setIsOpen(false);

      window.setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 750);

      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ==========================================================
  // NAVIGATION
  // ==========================================================

  const handleNavigation = (sectionId) => {
    setIsOpen(false);

    window.setTimeout(() => {
      const element =
        document.getElementById(sectionId);

      if (!element) return;

      const y =
        element.getBoundingClientRect().top +
        window.scrollY;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }, 750);
  };

  // ==========================================================
  // RESUME
  // ==========================================================

  const handleResume = () => {
    const link =
      document.createElement("a");

    link.href = "/taha's_resume.pdf";
    link.download = "taha's_resume.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================================
  // EMAIL HOVER
  // ==========================================================

  const handleEmailEnter = () => {
    const arrow =
      emailBlockRef.current?.querySelector(
        "[data-email-arrow]"
      );

    if (!arrow) return;

    gsap.to(arrow, {
      x: 6,
      y: -6,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  const handleEmailLeave = () => {
    const arrow =
      emailBlockRef.current?.querySelector(
        "[data-email-arrow]"
      );

    if (!arrow) return;

    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  // ==========================================================
  // SOCIAL HOVER
  // ==========================================================

  const handleSocialEnter = (index) => {
    const social =
      socialRefs.current[index];

    if (!social) return;

    gsap.to(social, {
      x: 5,
      opacity: 1,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  const handleSocialLeave = (index) => {
    const social =
      socialRefs.current[index];

    if (!social) return;

    gsap.to(social, {
      x: 0,
      opacity: 0.72,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  return (
    <>
      {/* ======================================================
          NORMAL NAVBAR
      ======================================================= */}

      <nav
        ref={navbarRef}
        className="fixed left-0 top-0 z-[9000] w-full px-5 py-5 sm:px-7 md:px-9"
      >
        <div className="flex items-center justify-between">
          {/* LOGO */}

          <button
            ref={logoRef}
            type="button"
            onClick={handleLogoClick}
            aria-label="Go to top"
            className="group flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14"
          >
            <img
              src="/logo.webp"
              alt="Taha Hassan"
              className="h-full w-full object-contain invert transition-transform duration-500 ease-out group-hover:scale-[0.94]"
            />
          </button>

          {/* MENU */}

          <button
            ref={menuTriggerRef}
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={
              isOpen
                ? "Close navigation"
                : "Open navigation"
            }
            className="group flex items-center gap-3 text-white"
          >
            <span className="font-[doner] text-[11px] uppercase tracking-[0.24em] sm:text-xs">
              Menu
            </span>

            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-[1px] w-5 -translate-y-[3px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />

              <span className="absolute h-[1px] w-5 translate-y-[3px] bg-white transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]" />
            </span>
          </button>
        </div>
      </nav>

      {/* ======================================================
          FULLSCREEN MENU
      ======================================================= */}

      <div
        ref={overlayRef}
        className="fixed inset-0 z-[8999] overflow-hidden bg-black"
      >
        <div className="relative h-full w-full px-6 pb-7 pt-7 sm:px-8 sm:pb-8 md:px-10 md:pt-8">
          {/* ==================================================
              MENU HEADER
          =================================================== */}

          <div className="flex items-center justify-between">
            <div
              ref={menuLogoRef}
              className="flex h-12 w-12 items-center justify-center sm:h-14 sm:w-14"
            >
              <img
                src="/logo.webp"
                alt="Taha Hassan"
                className="h-full w-full object-contain invert"
              />
            </div>

            {/* CLOSE */}

            <button
              ref={closeTriggerRef}
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close navigation"
              className="group flex items-center gap-3 text-white"
            >
              <span className="font-[doner] text-[11px] uppercase tracking-[0.24em] sm:text-xs">
                Close
              </span>

              <span className="relative flex h-5 w-5 items-center justify-center">
                <span className="absolute h-[1px] w-5 rotate-45 bg-white" />
                <span className="absolute h-[1px] w-5 -rotate-45 bg-white" />
              </span>
            </button>
          </div>

          {/* ==================================================
              MAIN CONTENT
          =================================================== */}

          <div className="grid h-[calc(100%-6rem)] grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            {/* =================================================
                LINKS
            ================================================== */}

            <nav
              aria-label="Main navigation"
              className="self-center"
            >
              <ul className="m-0 list-none p-0">
                {menuItems.map((item, index) => (
                  <li
                    key={item.sectionId}
                    className="mb-5 last:mb-0 sm:mb-6 md:mb-7"
                  >
                    <a
                      href={`#${item.sectionId}`}
                      onClick={(event) => {
                        event.preventDefault();

                        handleNavigation(
                          item.sectionId
                        );
                      }}
                      onMouseEnter={() =>
                        handleLinkEnter(index)
                      }
                      onMouseLeave={() =>
                        handleLinkLeave(index)
                      }
                      className="group flex w-fit items-baseline gap-5"
                    >
                      {/* NUMBER */}

                      <span
                        ref={(el) => {
                          menuNumbersRef.current[index] =
                            el;
                        }}
                        className="w-6 font-[doner] text-[10px] tracking-[0.15em] text-white/35 sm:text-xs"
                      >
                        {item.number}
                      </span>

                      {/* LINK */}

                      <span
                        ref={(el) => {
                          menuLinksRef.current[index] =
                            el;
                        }}
                        className="font-[doner] text-[clamp(3rem,6vw,6rem)] font-medium leading-[0.88] tracking-[-0.045em] text-white transition-colors duration-300 group-hover:text-white/75"
                      >
                        {item.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* =================================================
                RIGHT COLUMN
            ================================================== */}

            <div
              ref={rightColumnRef}
              className="self-center lg:justify-self-end lg:w-[min(100%,420px)]"
            >
              {/* EMAIL */}

              <div
                ref={emailBlockRef}
                className="mb-10"
              >
                <p className="mb-3 font-[doner] text-[10px] uppercase tracking-[0.2em] text-white/35 sm:text-xs">
                  Get in touch
                </p>

                <a
                  href="mailto:tahahassan699@gmail.com"
                  onMouseEnter={
                    handleEmailEnter
                  }
                  onMouseLeave={
                    handleEmailLeave
                  }
                  className="group inline-flex items-center gap-3 font-[doner] text-[clamp(1.1rem,1.7vw,1.6rem)] text-white/90 transition-colors duration-300"
                >
                  <span>
                    tahahassan699@gmail.com
                  </span>

                  <span
                    data-email-arrow
                    className="inline-block"
                  >
                    ↗
                  </span>
                </a>
              </div>

              {/* ELSEWHERE */}

              <div
                ref={elsewhereBlockRef}
                className="mb-10"
              >
                <p className="mb-3 font-[doner] text-[10px] uppercase tracking-[0.2em] text-white/35 sm:text-xs">
                  Elsewhere
                </p>

                <div className="flex flex-col items-start">
                  {socialLinks.map(
                    (social, index) => {
                      const Icon = social.icon;

                      return (
                        <a
                          key={social.label}
                          ref={(el) => {
                            socialRefs.current[index] =
                              el;
                          }}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onMouseEnter={() =>
                            handleSocialEnter(index)
                          }
                          onMouseLeave={() =>
                            handleSocialLeave(index)
                          }
                          className="group flex items-center gap-3 py-1.5 font-[doner] text-base text-white/70 transition-colors duration-300 hover:text-white sm:text-lg"
                        >
                          <Icon className="text-[12px] opacity-50" />

                          <span>
                            {social.label}
                          </span>

                          <span className="opacity-0 transition-opacity duration-300 group-hover:opacity-60">
                            ↗
                          </span>
                        </a>
                      );
                    }
                  )}
                </div>
              </div>

              {/* RESUME */}

              <button
                ref={resumeRef}
                type="button"
                onClick={handleResume}
                className="group inline-flex items-center gap-3 font-[doner] text-xs uppercase tracking-[0.2em] text-white/70 transition-colors duration-300 hover:text-white sm:text-sm"
              >
                <span>Resume</span>

                <span className="transition-transform duration-400 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;