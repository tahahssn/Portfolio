import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
const FaGithub = ({ className }) => (
  <svg viewBox="0 0 496 512" fill="currentColor" className={className} style={{ width: '1em', height: '1em', display: 'inline-block' }}>
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </svg>
);

const FaLinkedin = ({ className }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className} style={{ width: '1em', height: '1em', display: 'inline-block' }}>
    <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
  </svg>
);

const FaInstagram = ({ className }) => (
  <svg viewBox="0 0 448 512" fill="currentColor" className={className} style={{ width: '1em', height: '1em', display: 'inline-block' }}>
    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
  </svg>
);

const FaPatreon = ({ className }) => (
  <svg viewBox="0 0 512 512" fill="currentColor" className={className} style={{ width: '1em', height: '1em', display: 'inline-block' }}>
    <path d="M512 194.8c0 101.3-82.4 183.8-183.8 183.8-101.7 0-184.4-82.4-184.4-183.8 0-101.6 82.7-184.3 184.4-184.3C429.6 10.5 512 93.2 512 194.8zM0 501.5h90v-491H0v491z" />
  </svg>
);

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
      name: "ABOUT",
      sectionId: "about",
    },
    {
      number: "02",
      name: "WORK",
      sectionId: "projects",
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;