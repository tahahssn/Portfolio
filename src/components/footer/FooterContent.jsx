import React, {
  useLayoutEffect,
  useRef,
} from "react";

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

const FooterContent = () => {
  const sectionRef = useRef(null);

  const contentRef = useRef(null);
  const pagesRef = useRef(null);
  const connectRef = useRef(null);
  const socialsRef = useRef(null);
  const bottomRef = useRef(null);

  const backTopRef = useRef(null);

  /*
   * ==============================================================
   * SMOOTH SCROLL
   * ============================================================== 
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
   * ==============================================================
   * ANIMATION
   * ============================================================== 
   */

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
       * RESET
       */

      const reset = () => {
        gsap.set(contentRef.current, {
          opacity: 0,
          y: 24,
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
      };

      reset();

      /*
       * TIMELINE
       */

      const timeline = gsap.timeline({
        paused: true,
      });

      timeline
        .to(contentRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
        })
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
          },
          "-=0.42"
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
       * SAME PROJECTINTRO SCROLLTRIGGER
       */

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 72%",
        end: "bottom top",

        onEnter: () => {
          timeline.restart();
        },

        onEnterBack: () => {
          timeline.restart();
        },

        onLeaveBack: () => {
          timeline.pause(0);
          reset();
        },
      });

      /*
       * REFRESH HANDLING
       */

      const syncInitialState = () => {
        trigger.refresh();

        if (trigger.isActive) {
          timeline.restart();
        } else if (trigger.progress === 0) {
          timeline.pause(0);
          reset();
        }
      };

      requestAnimationFrame(syncInitialState);
      window.setTimeout(syncInitialState, 100);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ==============================================================
   * LINK HOVER
   * ============================================================== 
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
   * ==============================================================
   * BACK TO TOP
   * ============================================================== 
   */

  const handleBackTopEnter = () => {
    const button = backTopRef.current;

    if (!button) return;

    const ring =
      button.querySelector(".back-top-ring");

    const arrow =
      button.querySelector(".back-top-arrow");

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
      button.querySelector(".back-top-ring");

    const arrow =
      button.querySelector(".back-top-arrow");

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
    <section
      ref={sectionRef}
      className="
        relative
        w-full
        overflow-hidden
        bg-[#080808]
      "
    >
      <div
        ref={contentRef}
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
        {/* DIVIDER */}

        <div className="h-px w-full bg-[#F1F0EC]/10" />

        {/* MAIN ROW */}

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

            <div className="flex flex-col items-start">
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

            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SOCIAL_LINKS.map((item) => (
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
              ))}
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

            <span className="h-3 w-px bg-[#F1F0EC]/10" />

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
    </section>
  );
};

export default FooterContent;