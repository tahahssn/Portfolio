import React, {
  useLayoutEffect,
  useRef,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FooterStatement = () => {
  const sectionRef = useRef(null);

  const labelRef = useRef(null);
  const statementRef = useRef(null);
  const statementWordsRef = useRef([]);
  const statusRef = useRef(null);
  const connectRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      /*
       * ==========================================================
       * RESET
       * ==========================================================
       */

      const reset = () => {
        gsap.set(labelRef.current, {
          opacity: 0,
          y: 14,
        });

        gsap.set(statementWordsRef.current, {
          opacity: 0,
          y: 28,
          filter: "blur(8px)",
        });

        gsap.set(statusRef.current, {
          opacity: 0,
          y: 14,
        });

        gsap.set(connectRef.current, {
          opacity: 0,
          y: 18,
        });
      };

      reset();

      /*
       * ==========================================================
       * TIMELINE
       * ==========================================================
       */

      const timeline = gsap.timeline({
        paused: true,
      });

      timeline
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
          connectRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          "-=0.36"
        );

      /*
       * ==========================================================
       * SAME SCROLLTRIGGER AS PROJECT INTRO
       * ==========================================================
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
       * ==========================================================
       * REFRESH / RESTORED SCROLL POSITION
       * ==========================================================
       *
       * If the browser restores this page with the footer already
       * inside the trigger zone, ScrollTrigger may not get a new
       * "enter" transition. Start the same timeline manually.
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

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-[#080808]
        px-5
        sm:px-8
        md:px-12
        lg:px-16
        xl:px-20
      "
    >
      {/* TOP MARKER */}

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
          <span className="h-px w-7 bg-[#F1F0EC]/15" />

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
              statementWordsRef.current[0] = el;
            }}
          >
            Until
          </span>{" "}

          <span
            ref={(el) => {
              statementWordsRef.current[1] = el;
            }}
          >
            the
          </span>{" "}

          <span
            ref={(el) => {
              statementWordsRef.current[2] = el;
            }}
            className="italic text-[#F1F0EC]"
          >
            next
          </span>{" "}

          <span
            ref={(el) => {
              statementWordsRef.current[3] = el;
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
              rounded-full
              bg-red-500/80
            "
          />

          <span>
            Available worldwide
          </span>

          <span className="text-[#F1F0EC]/15">
            /
          </span>

          <span>
            Selected projects
          </span>
        </div>

        {/* GET IN TOUCH */}

        <div
          ref={connectRef}
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
  );
};

export default FooterStatement;