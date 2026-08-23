import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroImage = "/images/herobg1.avif";

const AboutVisual = () => {
  const sectionRef = useRef(null);

  const labelRef = useRef(null);
  const statementRef = useRef(null);
  const statementWordsRef = useRef([]);
  const hintRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ==========================================================
       * REDUCED MOTION
       * ==========================================================
       */

      mm.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set(
            [
              labelRef.current,
              ...statementWordsRef.current,
              hintRef.current,
            ],
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          );
        }
      );

      /*
       * ==========================================================
       * NORMAL MOTION
       * ==========================================================
       */

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const resetAbout = () => {
            gsap.set(labelRef.current, {
              opacity: 0,
              y: 14,
            });

            gsap.set(statementWordsRef.current, {
              opacity: 0,
              y: 28,
              filter: "blur(8px)",
            });

            gsap.set(hintRef.current, {
              opacity: 0,
              y: 14,
            });
          };

          /*
           * Initial state.
           * Nothing automatically plays on page load.
           */

          resetAbout();

          /*
           * ======================================================
           * ABOUT REVEAL TIMELINE
           * ======================================================
           */

          const aboutTimeline = gsap.timeline({
            paused: true,
          });

          aboutTimeline
            .to(labelRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              statementWordsRef.current,
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.95,
                stagger: 0.1,
                ease: "power4.out",
              },
              "-=0.32"
            )
            .to(
              hintRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.42"
            );

          /*
           * ======================================================
           * SCROLLTRIGGER
           *
           * Scroll down:
           *   About enters -> animation plays
           *
           * Scroll back above:
           *   animation resets
           *
           * Scroll down again:
           *   animation plays again
           * ======================================================
           */

          ScrollTrigger.create({
            trigger: section,
            start: "top 72%",
            end: "bottom top",

            onEnter: () => {
              aboutTimeline.restart();
            },

            onEnterBack: () => {
              aboutTimeline.restart();
            },

            onLeaveBack: () => {
              aboutTimeline.pause(0);
              resetAbout();
            },
          });
        }
      );

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-black
      "
    >
      {/* ==========================================================
          IMAGE
          ========================================================== */}

      <div
        data-about-visual-image
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >
        <img
          src={heroImage}
          alt=""
          draggable="false"
          className="
            h-full
            w-full
            object-cover
            object-center
            opacity-[0.56]
            grayscale
            contrast-[1.05]
            will-change-transform
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/25
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/15
            via-transparent
            to-black/60
          "
        />
      </div>

      {/* ==========================================================
          RED ATMOSPHERE
          ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[65vw]
          w-[65vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-700/12
          blur-[150px]
        "
      />

      {/* ==========================================================
          LABEL
          ========================================================== */}

      <div
        ref={labelRef}
        data-about-visual-label
        className="
          absolute
          left-[5vw]
          top-[7vh]
          z-20
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              font-[doner]
              text-[9px]
              tracking-[0.18em]
              text-white/35
            "
          >
            01
          </span>

          <span
            className="
              h-px
              w-7
              bg-white/20
            "
          />

          <span
            className="
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/50
            "
          >
            About
          </span>
        </div>
      </div>

      {/* ==========================================================
          STATEMENT
          ========================================================== */}

      <div
        ref={statementRef}
        data-about-visual-statement
        className="
          absolute
          left-1/2
          top-1/2
          z-20
          w-[90vw]
          -translate-x-1/2
          -translate-y-1/2
          text-center
        "
      >
        <p
          className="
            mx-auto
            max-w-[860px]
            font-[doner]
            text-[clamp(1.7rem,3.2vw,3.6rem)]
            leading-[1.08]
            tracking-[-0.025em]
            text-white/90
          "
        >
          <span
            ref={(el) => {
              statementWordsRef.current[0] = el;
            }}
          >
            I make
          </span>{" "}

          <span
            ref={(el) => {
              statementWordsRef.current[1] = el;
            }}
          >
            complex
          </span>{" "}

          <span
            ref={(el) => {
              statementWordsRef.current[2] = el;
            }}
          >
            things
          </span>{" "}

          <span
            ref={(el) => {
              statementWordsRef.current[3] = el;
            }}
            className="italic text-white"
          >
            feel simple.
          </span>
        </p>
      </div>

      {/* ==========================================================
          HINT
          ========================================================== */}

      <div
        ref={hintRef}
        data-about-visual-hint
        className="
          absolute
          bottom-[6vh]
          left-1/2
          z-20
          -translate-x-1/2
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              h-px
              w-7
              bg-white/20
            "
          />

          <span
            className="
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.23em]
              text-white/35
            "
          >
            Keep scrolling
          </span>

          <span
            className="
              h-px
              w-7
              bg-white/20
            "
          />
        </div>
      </div>
    </div>
  );
};

export default AboutVisual;