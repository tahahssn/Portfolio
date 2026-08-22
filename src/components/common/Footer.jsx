import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PAGE_LINKS = [
  { label: "Home", target: "top" },
  { label: "About", target: "about" },
  { label: "Work", target: "work" },
];

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/tahahssn",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/syed-muhammad-taha-hassan-72aa22383/",
  },
  {
    label: "Patreon",
    href: "https://www.patreon.com/cw/SyedTahaHassan",
  },
];

const Footer = () => {
  const footerRef = useRef(null);

  /*
   * ============================================================
   * CLOSING STATEMENT
   * ============================================================
   */

  const statementSectionRef = useRef(null);
  const statementRef = useRef(null);
  const statementWordsRef = useRef([]);
  const statusRef = useRef(null);
  const connectStatementRef = useRef(null);

  /*
   * ============================================================
   * ACTUAL FOOTER
   * ============================================================
   */

  const footerContentRef = useRef(null);
  const pagesRef = useRef(null);
  const connectRef = useRef(null);
  const socialsRef = useRef(null);
  const bottomRef = useRef(null);

  /*
   * ============================================================
   * BACK TO TOP
   * ============================================================
   */

  const backTopRef = useRef(null);

  /*
   * ============================================================
   * SMOOTH SCROLL
   * ============================================================
   */

  const smoothScrollTo = (target) => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (target === "top") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });

      return;
    }

    const element = document.getElementById(target);

    if (!element) return;

    element.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  /*
   * ============================================================
   * SCROLL ANIMATION
   * ============================================================
   */

  useLayoutEffect(() => {
    const footer = footerRef.current;

    if (!footer) return;

    const ctx = gsap.context(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      /*
       * ========================================================
       * REDUCED MOTION
       * ========================================================
       */

      if (reducedMotion) {
        gsap.set(
          [
            ...statementWordsRef.current,
            statusRef.current,
            connectStatementRef.current,
            pagesRef.current,
            connectRef.current,
            socialsRef.current,
            bottomRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }
        );

        return;
      }

      /*
       * ========================================================
       * INITIAL STATES
       *
       * IMPORTANT:
       *
       * We DO NOT hide footerContentRef.
       * Therefore the footer can NEVER disappear because of
       * a missed ScrollTrigger event.
       * ========================================================
       */

      gsap.set(statementWordsRef.current, {
        opacity: 0,
        y: 28,
        filter: "blur(8px)",
      });

      gsap.set(statusRef.current, {
        opacity: 0,
        y: 14,
      });

      gsap.set(connectStatementRef.current, {
        opacity: 0,
        y: 18,
      });

      gsap.set(
        [
          pagesRef.current,
          connectRef.current,
          socialsRef.current,
        ],
        {
          opacity: 0,
          y: 18,
        }
      );

      gsap.set(bottomRef.current, {
        opacity: 0,
        y: 14,
      });

      /*
       * ========================================================
       * STATEMENT TIMELINE
       * ========================================================
       */

      const statementTimeline = gsap.timeline({
        paused: true,
      });

      statementTimeline
        .to(statementWordsRef.current, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.95,
          stagger: 0.1,
          ease: "power4.out",
        })
        .to(
          statusRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.58"
        )
        .to(
          connectStatementRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.36"
        );

      /*
       * ========================================================
       * STATEMENT TRIGGER
       * ========================================================
       */

      ScrollTrigger.create({
        trigger: statementSectionRef.current,
        start: "top 72%",
        end: "bottom top",

        onEnter: () => {
          statementTimeline.restart();
        },

        onEnterBack: () => {
          statementTimeline.restart();
        },

        onLeaveBack: () => {
          statementTimeline.pause(0);

          gsap.set(statementWordsRef.current, {
            opacity: 0,
            y: 28,
            filter: "blur(8px)",
          });

          gsap.set(statusRef.current, {
            opacity: 0,
            y: 14,
          });

          gsap.set(connectStatementRef.current, {
            opacity: 0,
            y: 18,
          });
        },
      });

      /*
       * ========================================================
       * FOOTER CONTENT TIMELINE
       * ========================================================
       */

      const contentTimeline = gsap.timeline({
        paused: true,
      });

      contentTimeline
        .to(
          [
            pagesRef.current,
            connectRef.current,
          ],
          {
            opacity: 1,
            y: 0,
            duration: 0.62,
            stagger: 0.08,
            ease: "power3.out",
          }
        )
        .to(
          socialsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.58,
            ease: "power3.out",
          },
          "-=0.34"
        )
        .to(
          bottomRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.56,
            ease: "power3.out",
          },
          "-=0.3"
        );

      /*
       * ========================================================
       * FOOTER CONTENT TRIGGER
       *
       * The trigger is the footer content section itself,
       * BUT only its children are hidden.
       * ========================================================
       */

      ScrollTrigger.create({
        trigger: footerContentRef.current,
        start: "top 88%",
        end: "bottom top",

        onEnter: () => {
          contentTimeline.restart();
        },

        onEnterBack: () => {
          contentTimeline.restart();
        },

        onLeaveBack: () => {
          contentTimeline.pause(0);

          gsap.set(
            [
              pagesRef.current,
              connectRef.current,
              socialsRef.current,
            ],
            {
              opacity: 0,
              y: 18,
            }
          );

          gsap.set(bottomRef.current, {
            opacity: 0,
            y: 14,
          });
        },
      });

      /*
       * ========================================================
       * STATEMENT PARALLAX
       * ========================================================
       */

      if (window.innerWidth >= 1024) {
        gsap.to(statementRef.current, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: statementSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.8,
          },
        });
      }
    }, footer);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ============================================================
   * LINK HOVER
   * ============================================================
   */

  const handleLinkEnter = (event) => {
    const arrow =
      event.currentTarget.querySelector(
        ".footer-arrow"
      );

    if (!arrow) return;

    gsap.to(arrow, {
      x: 5,
      y: -4,
      opacity: 1,
      duration: 0.28,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleLinkLeave = (event) => {
    const arrow =
      event.currentTarget.querySelector(
        ".footer-arrow"
      );

    if (!arrow) return;

    gsap.to(arrow, {
      x: 0,
      y: 0,
      opacity: 0,
      duration: 0.24,
      ease: "power3.inOut",
      overwrite: true,
    });
  };

  /*
   * ============================================================
   * BACK TO TOP
   * ============================================================
   */

  const handleBackTopEnter = () => {
    const button = backTopRef.current;

    if (!button) return;

    const ring =
      button.querySelector(
        ".back-top-ring"
      );

    const arrow =
      button.querySelector(
        ".back-top-arrow"
      );

    gsap.to(ring, {
      scale: 1.07,
      rotate: 90,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    });

    gsap.to(arrow, {
      y: -4,
      duration: 0.28,
      ease: "power3.out",
      overwrite: true,
    });
  };

  const handleBackTopLeave = () => {
    const button = backTopRef.current;

    if (!button) return;

    const ring =
      button.querySelector(
        ".back-top-ring"
      );

    const arrow =
      button.querySelector(
        ".back-top-arrow"
      );

    gsap.to(ring, {
      scale: 1,
      rotate: 0,
      duration: 0.45,
      ease: "power3.inOut",
      overwrite: true,
    });

    gsap.to(arrow, {
      y: 0,
      duration: 0.28,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <footer
      ref={footerRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#080808]
        text-[#F1F0EC]
      "
    >
      {/* ==========================================================
          SUBTLE ATMOSPHERE
          ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-[18vw]
          top-[4%]
          h-[32vw]
          w-[32vw]
          rounded-full
          bg-red-700/[0.012]
          blur-[150px]
        "
      />

      {/* ==========================================================
          CLOSING STATEMENT
          ========================================================== */}

      <section
        ref={statementSectionRef}
        className="
          relative
          flex
          min-h-[100svh]
          w-full
          items-center
          justify-center
          px-5
          sm:px-8
          md:px-12
          lg:px-16
          xl:px-20
        "
      >
        {/* TOP MARKER */}

        <div
          className="
            absolute
            left-5
            top-[7vh]
            flex
            items-center
            gap-3
            sm:left-8
            md:left-12
            lg:left-16
            xl:left-20
          "
        >
          <span
            className="
              h-px
              w-7
              bg-[#F1F0EC]/15
            "
          />

          <span
            className="
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.23em]
              text-[#F1F0EC]/25
            "
          >
            End
          </span>
        </div>

        {/* STATEMENT */}

        <div
          ref={statementRef}
          className="
            w-full
            max-w-[1100px]
            text-center
          "
        >
          <p
            className="
              mx-auto
              max-w-[980px]
              font-[Arial]
              text-[clamp(2.35rem,4.35vw,4.8rem)]
              font-normal
              leading-[1.03]
              tracking-[-0.045em]
              text-[#F1F0EC]/92
            "
          >
            <span
              ref={(el) => {
                statementWordsRef.current[0] =
                  el;
              }}
            >
              Until
            </span>{" "}

            <span
              ref={(el) => {
                statementWordsRef.current[1] =
                  el;
              }}
            >
              the
            </span>{" "}

            <span
              ref={(el) => {
                statementWordsRef.current[2] =
                  el;
              }}
              className="
                italic
                text-[#F1F0EC]
              "
            >
              next
            </span>{" "}

            <span
              ref={(el) => {
                statementWordsRef.current[3] =
                  el;
              }}
            >
              one.
            </span>
          </p>

          {/* STATUS */}

          <div
            ref={statusRef}
            className="
              mt-7
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-3
              gap-y-2
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.21em]
              text-[#F1F0EC]/30
              sm:text-[9px]
            "
          >
            <span
              className="
                h-[5px]
                w-[5px]
                shrink-0
                rounded-full
                bg-red-500/80
              "
            />

            <span>
              Available worldwide
            </span>

            <span
              className="
                text-[#F1F0EC]/15
              "
            >
              /
            </span>

            <span>
              Selected projects
            </span>
          </div>

          {/* GET IN TOUCH */}

          <div
            ref={connectStatementRef}
            className="
              mt-9
              flex
              justify-center
            "
          >
            <a
              href="mailto:tahahassan699@gmail.com?subject=Project%20Inquiry"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-none
                border
                border-[#F1F0EC]/35
                bg-transparent
                px-7
                py-3.5
                font-[doner]
                text-[10px]
                uppercase
                tracking-[0.16em]
                text-[#F1F0EC]/80
                transition-all
                duration-500
                ease-out
                hover:border-[#F1F0EC]
                hover:bg-[#F1F0EC]
                hover:text-[#080808]
                sm:px-8
                sm:py-4
                sm:text-[11px]
              "
            >
              <span>
                Get in touch
              </span>

              <span
                className="
                  translate-x-0
                  transition-transform
                  duration-500
                  ease-out
                  group-hover:translate-x-1
                "
              >
                ↗
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================================
          ACTUAL FOOTER
          ========================================================== */}

      <div
        ref={footerContentRef}
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[1800px]
          px-5
          pb-5
          sm:px-8
          sm:pb-7
          md:px-12
          lg:px-16
          xl:px-20
        "
      >
        {/* DIVIDER — ALWAYS VISIBLE */}

        <div
          className="
            h-px
            w-full
            bg-[#F1F0EC]/10
          "
        />

        {/* MAIN FOOTER ROW */}

        <div
          className="
            grid
            grid-cols-1
            gap-12
            py-10
            sm:grid-cols-2
            lg:grid-cols-[0.7fr_0.7fr_1fr]
            lg:gap-10
            lg:py-12
          "
        >
          {/* PAGES */}

          <div ref={pagesRef}>
            <span
              className="
                mb-5
                block
                font-[doner]
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[#F1F0EC]/22
              "
            >
              Pages
            </span>

            <div
              className="
                flex
                flex-col
                items-start
              "
            >
              {PAGE_LINKS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() =>
                    smoothScrollTo(
                      item.target
                    )
                  }
                  onMouseEnter={
                    handleLinkEnter
                  }
                  onMouseLeave={
                    handleLinkLeave
                  }
                  className="
                    group
                    relative
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    py-1
                    font-[doner]
                    text-sm
                    tracking-wide
                    text-[#F1F0EC]/58
                    outline-none
                    transition-colors
                    duration-300
                    hover:text-[#F1F0EC]
                    focus-visible:text-[#F1F0EC]
                    sm:text-[15px]
                  "
                >
                  <span>
                    {item.label}
                  </span>

                  <span
                    className="
                      footer-arrow
                      text-[9px]
                      text-red-500
                      opacity-0
                    "
                  >
                    ↗
                  </span>

                  <span
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-px
                      w-full
                      origin-left
                      scale-x-0
                      bg-[#F1F0EC]/50
                      transition-transform
                      duration-500
                      group-hover:scale-x-100
                    "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* CONNECT */}

          <div ref={connectRef}>
            <span
              className="
                mb-5
                block
                font-[doner]
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[#F1F0EC]/22
              "
            >
              Connect
            </span>

            <a
              href="mailto:tahahassan699@gmail.com?subject=Project%20Inquiry"
              onMouseEnter={
                handleLinkEnter
              }
              onMouseLeave={
                handleLinkLeave
              }
              className="
                group
                relative
                inline-flex
                items-center
                gap-2
                font-[doner]
                text-sm
                tracking-wide
                text-[#F1F0EC]/65
                transition-colors
                duration-300
                hover:text-[#F1F0EC]
                sm:text-[15px]
              "
            >
              <span>
                Get in touch
              </span>

              <span
                className="
                  footer-arrow
                  text-[9px]
                  text-red-500
                  opacity-0
                "
              >
                ↗
              </span>

              <span
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-px
                  w-full
                  origin-left
                  scale-x-0
                  bg-red-500/80
                  transition-transform
                  duration-500
                  group-hover:scale-x-100
                "
              />
            </a>
          </div>

          {/* ELSEWHERE */}

          <div ref={socialsRef}>
            <span
              className="
                mb-5
                block
                font-[doner]
                text-[8px]
                uppercase
                tracking-[0.22em]
                text-[#F1F0EC]/22
              "
            >
              Elsewhere
            </span>

            <div
              className="
                flex
                flex-wrap
                gap-x-6
                gap-y-2
              "
            >
              {SOCIAL_LINKS.map(
                (item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={
                      handleLinkEnter
                    }
                    onMouseLeave={
                      handleLinkLeave
                    }
                    className="
                      group
                      relative
                      flex
                      items-center
                      gap-2
                      py-1
                      font-[doner]
                      text-sm
                      tracking-wide
                      text-[#F1F0EC]/55
                      transition-colors
                      duration-300
                      hover:text-[#F1F0EC]
                      sm:text-[15px]
                    "
                  >
                    <span>
                      {item.label}
                    </span>

                    <span
                      className="
                        footer-arrow
                        text-[9px]
                        text-red-500
                        opacity-0
                      "
                    >
                      ↗
                    </span>

                    <span
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-px
                        w-full
                        origin-left
                        scale-x-0
                        bg-[#F1F0EC]/50
                        transition-transform
                        duration-500
                        group-hover:scale-x-100
                      "
                    />
                  </a>
                )
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}

        <div
          ref={bottomRef}
          className="
            flex
            flex-col
            gap-5
            border-t
            border-[#F1F0EC]/10
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            className="
              flex
              items-center
              gap-4
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-[#F1F0EC]/22
              sm:text-[9px]
            "
          >
            <span>
              Taha Hassan
            </span>

            <span
              className="
                h-3
                w-px
                bg-[#F1F0EC]/10
              "
            />

            <span>
              Karachi · Pakistan
            </span>
          </div>

          <span
            className="
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.18em]
              text-[#F1F0EC]/18
              sm:text-[9px]
            "
          >
            © {new Date().getFullYear()}
          </span>

          <button
            ref={backTopRef}
            type="button"
            onClick={() =>
              smoothScrollTo("top")
            }
            onMouseEnter={
              handleBackTopEnter
            }
            onMouseLeave={
              handleBackTopLeave
            }
            aria-label="Back to top"
            className="
              group
              relative
              flex
              h-12
              w-12
              cursor-pointer
              items-center
              justify-center
              self-start
              rounded-full
              outline-none
              focus-visible:ring-1
              focus-visible:ring-[#F1F0EC]/60
              sm:self-auto
            "
          >
            <span
              className="
                back-top-ring
                absolute
                inset-0
                rounded-full
                border
                border-[#F1F0EC]/15
                transition-colors
                duration-500
                group-hover:border-[#F1F0EC]/65
                group-hover:bg-[#F1F0EC]
              "
            />

            <span
              className="
                back-top-arrow
                relative
                z-10
                font-[doner]
                text-base
                leading-none
                text-[#F1F0EC]
                transition-colors
                duration-500
                group-hover:text-[#080808]
              "
            >
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;