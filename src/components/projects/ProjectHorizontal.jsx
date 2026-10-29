import React, {
  useCallback,
  useEffect,
  useRef,
} from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import projects from "./projectData";

gsap.registerPlugin(ScrollTrigger);

const EXPLORE_WIDTH = 74;
const EXPLORE_HEIGHT = 34;

const MOUSE_LERP = 0.14;

const ProjectHorizontal = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const exploreRef = useRef(null);

  const mouseRef = useRef({
    x: 0,
    y: 0,
  });

  const targetMouseRef = useRef({
    x: 0,
    y: 0,
  });

  const activeProjectRef = useRef(-1);

  const visibleRef = useRef(false);

  const rafRef = useRef(null);

  /*
   * ==========================================================
   * FIND PROJECT UNDER POINTER
   * ==========================================================
   */

  const getProjectAtPoint = useCallback(
    (clientX, clientY) => {
      const section =
        sectionRef.current;

      if (!section) {
        return null;
      }

      const panels =
        section.querySelectorAll(
          "[data-project-panel]"
        );

      for (const panel of panels) {
        const rect =
          panel.getBoundingClientRect();

        if (
          clientX >= rect.left &&
          clientX <= rect.right &&
          clientY >= rect.top &&
          clientY <= rect.bottom
        ) {
          return panel;
        }
      }

      return null;
    },
    []
  );

  /*
   * ==========================================================
   * SET ACTIVE PROJECT
   * ==========================================================
   */

  const setActiveProject = useCallback(
    (panel) => {
      const explore =
        exploreRef.current;

      if (!explore || !panel) {
        return;
      }

      const index = Number(
        panel.dataset.projectIndex
      );

      if (
        Number.isNaN(index) ||
        !projects[index]
      ) {
        return;
      }

      /*
       * Same project:
       * nothing to do.
       */
      if (
        activeProjectRef.current ===
        index
      ) {
        return;
      }

      activeProjectRef.current =
        index;

      const project =
        projects[index];

      /*
       * The SAME anchor gets a new
       * destination.
       */
      explore.href =
        project.href;

      explore.setAttribute(
        "aria-label",
        `Open ${project.name}`
      );

      /*
       * Very subtle project change feedback.
       * No large scale bounce.
       */
      gsap.killTweensOf(
        explore
      );

      gsap.fromTo(
        explore,
        {
          opacity: 0.55,
        },
        {
          opacity: 1,
          duration: 0.2,
          ease: "power2.out",
        }
      );
    },
    []
  );

  /*
   * ==========================================================
   * SHOW EXPLORE
   * ==========================================================
   */

  const showExplore =
    useCallback(
      (event) => {
        const section =
          sectionRef.current;

        const explore =
          exploreRef.current;

        if (
          !section ||
          !explore
        ) {
          return;
        }

        const rect =
          section.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          EXPLORE_WIDTH / 2;

        const y =
          event.clientY -
          rect.top -
          EXPLORE_HEIGHT / 2;

        /*
         * Start exactly at pointer.
         */
        mouseRef.current = {
          x,
          y,
        };

        targetMouseRef.current = {
          x,
          y,
        };

        const panel =
          getProjectAtPoint(
            event.clientX,
            event.clientY
          );

        setActiveProject(
          panel
        );

        if (!visibleRef.current) {
          visibleRef.current =
            true;

          gsap.killTweensOf(
            explore
          );

          gsap.fromTo(
            explore,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.22,
              ease: "power2.out",
            }
          );
        }
      },
      [
        getProjectAtPoint,
        setActiveProject,
      ]
    );

  /*
   * ==========================================================
   * POINTER MOVE
   * ==========================================================
   */

  const handlePointerMove =
    useCallback(
      (event) => {
        const section =
          sectionRef.current;

        if (!section) {
          return;
        }

        const rect =
          section.getBoundingClientRect();

        targetMouseRef.current = {
          x:
            event.clientX -
            rect.left -
            EXPLORE_WIDTH / 2,

          y:
            event.clientY -
            rect.top -
            EXPLORE_HEIGHT / 2,
        };

        const panel =
          getProjectAtPoint(
            event.clientX,
            event.clientY
          );

        setActiveProject(
          panel
        );

        /*
         * First pointer movement after
         * entering the section.
         */
        if (
          !visibleRef.current
        ) {
          showExplore(event);
        }
      },
      [
        getProjectAtPoint,
        setActiveProject,
        showExplore,
      ]
    );

  /*
   * ==========================================================
   * POINTER ENTER
   * ==========================================================
   */

  const handlePointerEnter =
    useCallback(
      (event) => {
        showExplore(event);
      },
      [showExplore]
    );

  /*
   * ==========================================================
   * POINTER LEAVE
   * ==========================================================
   */

  const handlePointerLeave =
    useCallback(() => {
      const explore =
        exploreRef.current;

      activeProjectRef.current =
        -1;

      if (!explore) {
        return;
      }

      visibleRef.current =
        false;

      gsap.killTweensOf(
        explore
      );

      gsap.to(explore, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    }, []);

  /*
   * ==========================================================
   * SINGLE RAF CURSOR
   * ==========================================================
   */

  useEffect(() => {
    const animate =
      () => {
        const explore =
          exploreRef.current;

        if (explore) {
          const current =
            mouseRef.current;

          const target =
            targetMouseRef.current;

          current.x +=
            (target.x -
              current.x) *
            MOUSE_LERP;

          current.y +=
            (target.y -
              current.y) *
            MOUSE_LERP;

          explore.style.transform =
            `translate3d(
              ${current.x}px,
              ${current.y}px,
              0
            )`;
        }

        rafRef.current =
          requestAnimationFrame(
            animate
          );
      };

    rafRef.current =
      requestAnimationFrame(
        animate
      );

    return () => {
      cancelAnimationFrame(
        rafRef.current
      );
    };
  }, []);

  /*
   * ==========================================================
   * GSAP HORIZONTAL SCROLL
   * ==========================================================
   */

  useEffect(() => {
    const section =
      sectionRef.current;

    const track =
      trackRef.current;

    if (!section || !track) {
      return;
    }

    const panels =
      gsap.utils.toArray(
        "[data-project-panel]",
        track
      );

    const ctx =
      gsap.context(() => {
        /*
         * Total horizontal distance.
         */
        const getScrollAmount =
          () =>
            Math.max(
              0,
              track.scrollWidth -
              window.innerWidth
            );

        /*
         * ======================================================
         * IMPORTANT
         *
         * NO SNAP.
         *
         * The user controls the exact horizontal position.
         * Stopping at 17%, 38%, 61% etc. stays there.
         * ======================================================
         */

        const horizontalTween =
          gsap.to(track, {
            x: () =>
              -getScrollAmount(),

            ease: "none",

            scrollTrigger: {
              trigger: section,

              start:
                "top top",

              end: () =>
                `+=${getScrollAmount()}`,

              pin: true,

              /*
               * Slight smoothing.
               */
              scrub: 0.8,

              anticipatePin: 1,

              invalidateOnRefresh:
                true,
            },
          });

        /*
         * ======================================================
         * PROJECT ANIMATIONS
         * ======================================================
         */

        panels.forEach(
          (panel) => {
            const image =
              panel.querySelector(
                "[data-project-image]"
              );

            const content =
              panel.querySelector(
                "[data-project-content]"
              );

            const title =
              panel.querySelector(
                "[data-project-title]"
              );

            const meta =
              panel.querySelector(
                "[data-project-meta]"
              );

            const number =
              panel.querySelector(
                "[data-project-number]"
              );

            /*
             * IMAGE PARALLAX
             */

            if (image) {
              gsap.fromTo(
                image,
                {
                  scale: 1.08,
                  xPercent: -2,
                },
                {
                  scale: 1,
                  xPercent: 2,

                  ease: "none",

                  scrollTrigger: {
                    trigger: panel,

                    containerAnimation:
                      horizontalTween,

                    start:
                      "left right",

                    end:
                      "right left",

                    scrub: true,
                  },
                }
              );
            }

            /*
             * CONTENT
             */

            if (content) {
              gsap.fromTo(
                content,
                {
                  opacity: 0,
                  y: 34,
                },
                {
                  opacity: 1,
                  y: 0,

                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger: panel,

                    containerAnimation:
                      horizontalTween,

                    start:
                      "left 84%",

                    end:
                      "left 48%",

                    scrub: 1,
                  },
                }
              );
            }

            /*
             * META
             */

            if (meta) {
              gsap.fromTo(
                meta,
                {
                  opacity: 0,
                  y: 14,
                },
                {
                  opacity: 1,
                  y: 0,

                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger: panel,

                    containerAnimation:
                      horizontalTween,

                    start:
                      "left 90%",

                    end:
                      "left 58%",

                    scrub: 1,
                  },
                }
              );
            }

            /*
             * TITLE
             */

            if (title) {
              gsap.fromTo(
                title,
                {
                  opacity: 0,
                  yPercent: 18,
                },
                {
                  opacity: 1,
                  yPercent: 0,

                  ease:
                    "power4.out",

                  scrollTrigger: {
                    trigger: panel,

                    containerAnimation:
                      horizontalTween,

                    start:
                      "left 80%",

                    end:
                      "left 45%",

                    scrub: 1,
                  },
                }
              );
            }

            /*
             * NUMBER
             */

            if (number) {
              gsap.fromTo(
                number,
                {
                  opacity: 0,
                  yPercent: 60,
                },
                {
                  opacity: 1,
                  yPercent: 0,

                  ease:
                    "power3.out",

                  scrollTrigger: {
                    trigger: panel,

                    containerAnimation:
                      horizontalTween,

                    start:
                      "left 92%",

                    end:
                      "left 62%",

                    scrub: 1,
                  },
                }
              );
            }
          }
        );
      }, section);

    const handleResize =
      () => {
        ScrollTrigger.refresh();
      };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onPointerEnter={
        handlePointerEnter
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerLeave={
        handlePointerLeave
      }
      className="
        relative
        h-screen
        w-full
        overflow-hidden
        bg-[#080808]
      "
    >
      {/* ======================================================
          ONE GLOBAL EXPLORE CONTROL
      ====================================================== */}

      <a
        ref={exploreRef}
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open project"
        className="
          pointer-events-auto

          absolute
          left-0
          top-0

          z-[100]

          hidden

          h-[34px]
          w-[74px]

          items-center
          justify-center

          rounded-full

          border
          border-white/[0.24]

          bg-[#080808]/70

          px-3

          opacity-0

          shadow-[0_8px_30px_rgba(0,0,0,0.18)]

          backdrop-blur-[8px]

          will-change-transform

          transition-[background-color,border-color]
          duration-300

          hover:border-white/[0.55]
          hover:bg-[#f1f0ec]

          md:flex
        "
      >
        <span
          className="
            font-[doner]

            text-[7px]

            uppercase

            tracking-[0.18em]

            text-white/65

            transition-colors
            duration-300

            hover:text-[#080808]
          "
        >
          Open ↗
        </span>
      </a>

      {/* ======================================================
          HORIZONTAL TRACK
      ====================================================== */}

      <div
        ref={trackRef}
        className="
          flex
          h-screen
          w-max
          will-change-transform
        "
      >
        {projects.map(
          (
            project,
            index
          ) => (
            <article
              key={project.id}
              data-project-panel
              data-project-index={
                index
              }
              className="
                group

                relative

                h-screen
                w-screen
                shrink-0

                overflow-hidden

                border-t
                border-white/[0.07]

                bg-[#080808]
              "
            >
              {/* =================================================
                  IMAGE
              ================================================== */}

              <div
                className="
                  absolute
                  inset-0
                  overflow-hidden
                "
              >
                <img
                  data-project-image
                  src={project.image}
                  alt=""
                  draggable="false"
                  loading={
                    index === 0
                      ? "eager"
                      : "lazy"
                  }
                  className="
                    h-full
                    w-full

                    object-cover
                    object-center

                    opacity-[0.68]

                    will-change-transform

                    transition-opacity
                    duration-700

                    group-hover:opacity-[0.76]
                  "
                />
              </div>

              {/* =================================================
                  ATMOSPHERE
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0

                  bg-gradient-to-b
                  from-black/10
                  via-black/20
                  to-black/90
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0

                  bg-gradient-to-r
                  from-black/40
                  via-transparent
                  to-black/15
                "
              />

              {/* =================================================
                  TOP META
              ================================================== */}

              <div
                data-project-meta
                className="
                  absolute

                  left-[5vw]
                  right-[5vw]
                  top-[5vh]

                  z-20

                  flex
                  items-center
                  justify-between
                "
              >
                <div
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <span
                    className="
                      h-px
                      w-7
                      bg-red-500/60
                    "
                  />

                  <span
                    data-project-number
                    className="
                      font-[doner]
                      text-[9px]
                      tracking-[0.2em]
                      text-red-400
                    "
                  >
                    {project.id}
                  </span>
                </div>

                <span
                  className="
                    font-[doner]
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/40
                  "
                >
                  {project.year}
                </span>
              </div>

              {/* =================================================
                  PROJECT CONTENT
              ================================================== */}

              <div
                data-project-content
                className="
                  absolute

                  bottom-[7vh]
                  left-[5vw]
                  right-[5vw]

                  z-20
                "
              >
                <div
                  className="
                    max-w-[900px]
                  "
                >
                  <p
                    className="
                      mb-5

                      font-[doner]
                      text-[9px]

                      uppercase

                      tracking-[0.22em]

                      text-white/40
                    "
                  >
                    {project.category}
                  </p>

                  <h2
                    data-project-title
                    className="
                      font-[Arial]

                      text-[clamp(3.5rem,8vw,9rem)]

                      font-black

                      leading-[0.78]

                      tracking-[-0.065em]

                      text-[#f1f0ec]
                    "
                  >
                    {project.name}
                  </h2>

                  <p
                    className="
                      mt-6

                      max-w-[470px]

                      font-[doner]

                      text-[10px]

                      leading-[1.7]

                      tracking-[0.015em]

                      text-white/45

                      sm:text-xs
                    "
                  >
                    {project.description}
                  </p>
                </div>
              </div>

              {/* =================================================
                  LARGE BACKGROUND INDEX
              ================================================== */}

              <div
                className="
                  pointer-events-none

                  absolute

                  bottom-[-3vw]
                  right-[2vw]

                  z-10

                  hidden

                  font-[Arial]

                  text-[20vw]

                  font-black

                  leading-none

                  tracking-[-0.1em]

                  text-white/[0.025]

                  md:block
                "
              >
                {project.id}
              </div>

              {/* =================================================
                  MOBILE LINK
              ================================================== */}

              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name}`}
                className="
                  absolute

                  bottom-[7vh]
                  right-[5vw]

                  z-30

                  flex

                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-full

                  border
                  border-white/20

                  bg-black/30

                  backdrop-blur-md

                  font-[doner]

                  text-[11px]

                  text-white/70

                  md:hidden
                "
              >
                ↗
              </a>
            </article>
          )
        )}
      </div>
    </section>
  );
};

export default ProjectHorizontal;