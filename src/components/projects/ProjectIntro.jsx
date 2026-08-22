import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ProjectIntro = () => {
  const sectionRef = useRef(null);

  const labelRef = useRef(null);
  const statementRef = useRef(null);
  const statementWordsRef = useRef([]);
  const descriptionRef = useRef(null);
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
              descriptionRef.current,
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
          /*
           * ------------------------------------------------------
           * RESET STATE
           * ------------------------------------------------------
           */

          const resetProjectIntro = () => {
            gsap.set(labelRef.current, {
              opacity: 0,
              y: 14,
            });

            gsap.set(statementWordsRef.current, {
              opacity: 0,
              y: 28,
              filter: "blur(8px)",
            });

            gsap.set(descriptionRef.current, {
              opacity: 0,
              y: 18,
            });

            gsap.set(hintRef.current, {
              opacity: 0,
              y: 14,
            });
          };

          resetProjectIntro();

          /*
           * ------------------------------------------------------
           * REVEAL TIMELINE
           * ------------------------------------------------------
           */

          const projectTimeline = gsap.timeline({
            paused: true,
          });

          projectTimeline
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
              descriptionRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.42"
            )
            .to(
              hintRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.4"
            );

          /*
           * ------------------------------------------------------
           * SCROLLTRIGGER
           *
           * DOWN:
           *   enter -> play
           *
           * UP:
           *   leave back -> reset
           *
           * DOWN AGAIN:
           *   enter -> play again
           * ------------------------------------------------------
           */

          ScrollTrigger.create({
            trigger: section,
            start: "top 72%",
            end: "bottom top",

            onEnter: () => {
              projectTimeline.restart();
            },

            onEnterBack: () => {
              projectTimeline.restart();
            },

            onLeaveBack: () => {
              projectTimeline.pause(0);
              resetProjectIntro();
            },
          });
        }
      );

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        h-screen
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#080808]
        px-5
        text-white
        sm:px-8
        md:px-12
        lg:px-16
        xl:px-20
      "
    >
      {/* ==========================================================
          TOP LABEL
          ========================================================== */}

      <div
        ref={labelRef}
        className="
          absolute
          left-5
          top-[7vh]
          z-20
          sm:left-8
          md:left-12
          lg:left-16
          xl:left-20
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
            02
          </span>

          <span
            className="
              h-px
              w-7
              bg-red-500/50
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
            Work
          </span>
        </div>
      </div>

      {/* ==========================================================
          MAIN COMPOSITION
          ========================================================== */}

      <div
        className="
          w-full
          max-w-[1180px]
          text-center
        "
      >
        {/* --------------------------------------------------------
            STATEMENT
            -------------------------------------------------------- */}

        <div
          ref={statementRef}
          className="
            w-full
          "
        >
          <p
            className="
              mx-auto
              max-w-[1000px]
              font-[doner]
              text-[clamp(2.2rem,5vw,5rem)]
              font-normal
              leading-[1.03]
              tracking-[-0.045em]
              text-white/90
            "
          >
            <span
              ref={(el) => {
                statementWordsRef.current[0] = el;
              }}
            >
              A few
            </span>{" "}

            <span
              ref={(el) => {
                statementWordsRef.current[1] = el;
              }}
            >
              things
            </span>{" "}

            <span
              ref={(el) => {
                statementWordsRef.current[2] = el;
              }}
            >
              I've
            </span>{" "}

            <span
              ref={(el) => {
                statementWordsRef.current[3] = el;
              }}
              className="italic text-white"
            >
              built.
            </span>
          </p>
        </div>

        {/* --------------------------------------------------------
            DESCRIPTION
            -------------------------------------------------------- */}

        <div
          ref={descriptionRef}
          className="
            mx-auto
            mt-8
            max-w-[470px]
          "
        >
          <p
            className="
              font-[doner]
              text-[clamp(0.72rem,0.9vw,0.9rem)]
              leading-[1.65]
              tracking-[0.02em]
              text-white/42
            "
          >
            A selection of work across intelligent systems,
            thoughtful interfaces, and interactive experiments.
          </p>
        </div>
      </div>

      {/* ==========================================================
          BOTTOM HINT
          ========================================================== */}

      <div
        ref={hintRef}
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
              bg-white/15
            "
          />

          <span
            className="
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.23em]
              text-white/22
            "
          >
            Selected work
          </span>

          <span
            className="
              h-px
              w-7
              bg-white/15
            "
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;