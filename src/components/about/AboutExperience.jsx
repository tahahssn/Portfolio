import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AboutVisual from "./AboutVisual";
import AboutInfo from "./AboutInfo";

gsap.registerPlugin(ScrollTrigger);

const AboutExperience = () => {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const infoRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const visual = visualRef.current;
    const info = infoRef.current;

    if (!section || !visual || !info) return;

    const ctx = gsap.context(() => {
      const visualLabel = visual.querySelector(
        "[data-about-visual-label]"
      );

      const visualStatement = visual.querySelector(
        "[data-about-visual-statement]"
      );

      const visualHint = visual.querySelector(
        "[data-about-visual-hint]"
      );

      const visualImage = visual.querySelector(
        "[data-about-visual-image]"
      );

      const infoLabel = info.querySelector(
        "[data-about-info-label]"
      );

      const infoTitle = info.querySelector(
        "[data-about-info-title]"
      );

      const infoParagraph = info.querySelector(
        "[data-about-info-paragraph]"
      );

      const infoMeta = info.querySelector(
        "[data-about-info-meta]"
      );

      const infoPortrait = info.querySelector(
        "[data-about-info-portrait]"
      );

      const infoSideLabel = info.querySelector(
        "[data-about-info-side]"
      );

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        /*
         * ------------------------------------------------------
         * INITIAL STATES
         * ------------------------------------------------------
         */

        gsap.set(visualLabel, {
          y: 18,
          opacity: 0,
        });

        gsap.set(visualStatement, {
          y: 30,
          opacity: 0,
        });

        gsap.set(visualHint, {
          y: 12,
          opacity: 0,
        });

        gsap.set(visualImage, {
          scale: 1.04,
        });

        gsap.set(
          [
            infoLabel,
            infoTitle,
            infoParagraph,
            infoMeta,
            infoSideLabel,
          ],
          {
            y: 28,
            opacity: 0,
          }
        );

        gsap.set(infoPortrait, {
          x: 70,
          opacity: 0,
          scale: 1.03,
        });

        /*
         * ------------------------------------------------------
         * SCENE 1
         *
         * Runs only while ABOUT VISUAL is entering.
         * No pinning.
         * No sticky viewport.
         * ------------------------------------------------------
         */

        gsap
          .timeline({
            scrollTrigger: {
              trigger: visual,
              start: "top 88%",
              end: "top 18%",
              scrub: 0.8,
            },
          })
          .to(
            visualLabel,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0
          )
          .to(
            visualStatement,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.08
          )
          .to(
            visualHint,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.15
          )
          .to(
            visualImage,
            {
              scale: 1,
              ease: "none",
            },
            0
          );

        /*
         * ------------------------------------------------------
         * SCENE 1 EXIT
         *
         * Very small movement while leaving.
         * The browser still controls the actual page scroll.
         * ------------------------------------------------------
         */

        gsap
          .timeline({
            scrollTrigger: {
              trigger: visual,
              start: "top 22%",
              end: "bottom 35%",
              scrub: 0.9,
            },
          })
          .to(
            visualStatement,
            {
              y: -45,
              opacity: 0.45,
              ease: "none",
            },
            0
          )
          .to(
            visualLabel,
            {
              y: -20,
              opacity: 0,
              ease: "none",
            },
            0
          )
          .to(
            visualHint,
            {
              y: -15,
              opacity: 0,
              ease: "none",
            },
            0
          )
          .to(
            visualImage,
            {
              scale: 1.025,
              ease: "none",
            },
            0
          );

        /*
         * ------------------------------------------------------
         * SCENE 2 ENTER
         * ------------------------------------------------------
         */

        gsap
          .timeline({
            scrollTrigger: {
              trigger: info,
              start: "top 85%",
              end: "top 15%",
              scrub: 0.9,
            },
          })
          .to(
            infoPortrait,
            {
              x: 0,
              opacity: 1,
              scale: 1,
              ease: "power3.out",
            },
            0
          )
          .to(
            infoLabel,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.05
          )
          .to(
            infoTitle,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.12
          )
          .to(
            infoParagraph,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.22
          )
          .to(
            infoMeta,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.3
          )
          .to(
            infoSideLabel,
            {
              y: 0,
              opacity: 1,
              ease: "power3.out",
            },
            0.2
          );

        /*
         * ------------------------------------------------------
         * SCENE 2 PARALLAX
         * ------------------------------------------------------
         */

        gsap.to(infoPortrait, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: info,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });

        return () => {
          ScrollTrigger.getAll().forEach((trigger) => {
            if (
              trigger.trigger === visual ||
              trigger.trigger === info
            ) {
              trigger.kill();
            }
          });
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            visualLabel,
            visualStatement,
            visualHint,
            infoLabel,
            infoTitle,
            infoParagraph,
            infoMeta,
            infoSideLabel,
          ],
          {
            clearProps: "all",
          }
        );

        gsap.set(
          [visualImage, infoPortrait],
          {
            clearProps: "all",
          }
        );
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });

      return () => {
        mm.revert();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
    >
      {/* SCENE 1 */}

      <div
        ref={visualRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <AboutVisual />
      </div>

      {/* SCENE 2 */}

      <div
        ref={infoRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <AboutInfo />
      </div>
    </section>
  );
};

export default AboutExperience;