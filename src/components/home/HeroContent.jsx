import React, {
  useLayoutEffect,
  useRef,
} from "react";
import gsap from "gsap";

import HeroStatement from "./HeroStatement";
import HeroSignature from "./HeroSignature";
import HeroCTA from "./HeroCTA";

const HeroContent = () => {
  const rootRef = useRef(null);
  const statementRef = useRef(null);
  const signatureRef = useRef(null);
  const ctaRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const ctx = gsap.context(() => {
      const statementLines =
        statementRef.current?.querySelectorAll(
          "[data-hero-line]"
        );

      if (!statementLines?.length) return;

      /*
       * Initial state
       */
      gsap.set(statementLines, {
        yPercent: 105,
        opacity: 1,
      });

      gsap.set(signatureRef.current, {
        y: 18,
        opacity: 0,
      });

      gsap.set(ctaRef.current, {
        y: 18,
        opacity: 0,
      });

      let hasStarted = false;

      const animateIn = () => {
        if (hasStarted) return;

        hasStarted = true;

        gsap.timeline({
          defaults: {
            overwrite: "auto",
          },
        })
          .to(statementLines, {
            yPercent: 0,
            duration: 0.92,
            stagger: 0.075,
            ease: [0.76, 0, 0.24, 1],
          })
          .to(
            signatureRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.62,
              ease: "power3.out",
            },
            "-=0.48"
          )
          .to(
            ctaRef.current,
            {
              y: 0,
              opacity: 1,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.38"
          );
      };

      const handleReveal = () => {
        animateIn();
      };

      window.addEventListener(
        "hero-reveal-complete",
        handleReveal
      );

      /*
       * Fallback
       */
      const fallback = window.setTimeout(() => {
        animateIn();
      }, 4500);

      /*
       * IMPORTANT:
       * Once revealed, Hero stays in its final state.
       * Nothing here reverts it after 2 seconds.
       */

      return () => {
        window.removeEventListener(
          "hero-reveal-complete",
          handleReveal
        );

        window.clearTimeout(fallback);
      };
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="
        pointer-events-none
        absolute
        inset-0
        z-20
      "
    >
      {/* MAIN STATEMENT */}
      <div
        ref={statementRef}
        className="
          absolute
          bottom-[15vh]
          left-[6vw]
          z-20
          w-[70vw]
          max-w-[1050px]
          max-xl:w-[72vw]
          max-lg:w-[78vw]
          max-md:bottom-[19vh]
          max-md:left-[5vw]
          max-md:w-[90vw]
          max-sm:bottom-[21vh]
          max-sm:left-[5vw]
          max-sm:w-[91vw]
        "
      >
        <HeroStatement />
      </div>

      {/* SIGNATURE */}
      <div
        ref={signatureRef}
        className="
          absolute
          bottom-[6.5vh]
          left-[6vw]
          z-20
          max-md:bottom-[8vh]
          max-md:left-[5vw]
          max-sm:bottom-[9vh]
        "
      >
        <HeroSignature />
      </div>

      {/* CTA */}
      <div
        ref={ctaRef}
        className="
          absolute
          bottom-[6.5vh]
          right-[6vw]
          z-20
          max-md:bottom-[8vh]
          max-md:right-[5vw]
          max-sm:bottom-[9vh]
          max-sm:right-[5vw]
        "
      >
        <HeroCTA />
      </div>
    </div>
  );
};

export default HeroContent;