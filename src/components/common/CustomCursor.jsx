import { useEffect, useRef } from "react";
import gsap from "gsap";

const DEFAULT_SIZE = 8;
const ACTIVE_SIZE = 16;

const PROJECT_WIDTH = 78;
const PROJECT_HEIGHT = 34;

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  const stateRef = useRef("default");
  const visibleRef = useRef(false);

  const xToRef = useRef(null);
  const yToRef = useRef(null);

  const widthToRef = useRef(null);
  const heightToRef = useRef(null);

  const scaleToRef = useRef(null);
  const opacityToRef = useRef(null);
  const borderRadiusToRef = useRef(null);

  useEffect(() => {
    /*
     * ----------------------------------------------------------
     * Only enable the custom cursor on devices that actually
     * have a precise pointer.
     * ----------------------------------------------------------
     */

    const canUseCustomCursor =
      window.matchMedia(
        "(hover: hover) and (pointer: fine)"
      ).matches;

    if (!canUseCustomCursor) {
      return undefined;
    }

    const cursor =
      cursorRef.current;

    const label =
      labelRef.current;

    if (!cursor || !label) {
      return undefined;
    }

    /*
     * ----------------------------------------------------------
     * Hide the native cursor.
     *
     * This is scoped and cleaned up on unmount.
     * ----------------------------------------------------------
     */

    const style = document.createElement("style");

    style.setAttribute(
      "data-custom-cursor",
      "true"
    );

    style.textContent = `
      @media (hover: hover) and (pointer: fine) {
        html[data-custom-cursor-enabled="true"] body,
        html[data-custom-cursor-enabled="true"] body * {
          cursor: none !important;
        }
      }
    `;

    document.head.appendChild(style);

    document.documentElement.dataset.customCursorEnabled =
      "true";

    /*
     * ----------------------------------------------------------
     * GSAP quickTo
     *
     * Extremely efficient for a mouse follower.
     * No React renders on pointermove.
     * ----------------------------------------------------------
     */

    xToRef.current = gsap.quickTo(
      cursor,
      "x",
      {
        duration: 0.18,
        ease: "power3.out",
      }
    );

    yToRef.current = gsap.quickTo(
      cursor,
      "y",
      {
        duration: 0.18,
        ease: "power3.out",
      }
    );

    widthToRef.current = gsap.quickTo(
      cursor,
      "width",
      {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }
    );

    heightToRef.current = gsap.quickTo(
      cursor,
      "height",
      {
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1],
      }
    );

    scaleToRef.current = gsap.quickTo(
      cursor,
      "scale",
      {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    );

    opacityToRef.current = gsap.quickTo(
      cursor,
      "opacity",
      {
        duration: 0.2,
        ease: "power2.out",
      }
    );

    borderRadiusToRef.current =
      gsap.quickTo(
        cursor,
        "borderRadius",
        {
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1],
        }
      );

    /*
     * ----------------------------------------------------------
     * Initial state
     * ----------------------------------------------------------
     */

    gsap.set(cursor, {
      x: -100,
      y: -100,
      width: DEFAULT_SIZE,
      height: DEFAULT_SIZE,
      scale: 1,
      opacity: 0,
      borderRadius: "50%",
    });

    /*
     * ----------------------------------------------------------
     * Helpers
     * ----------------------------------------------------------
     */

    const setLabel = (text) => {
      label.textContent = text;
    };

    const showCursor = () => {
      if (visibleRef.current) {
        return;
      }

      visibleRef.current = true;

      opacityToRef.current?.(
        1
      );
    };

    const setDefaultState =
      () => {
        if (
          stateRef.current ===
          "default"
        ) {
          return;
        }

        stateRef.current =
          "default";

        setLabel("");

        widthToRef.current?.(
          DEFAULT_SIZE
        );

        heightToRef.current?.(
          DEFAULT_SIZE
        );

        scaleToRef.current?.(
          1
        );

        borderRadiusToRef.current?.(
          "50%"
        );

        gsap.to(label, {
          opacity: 0,
          duration: 0.16,
          ease: "power2.out",
          overwrite: true,
        });
      };

    const setInteractiveState =
      () => {
        if (
          stateRef.current ===
          "interactive"
        ) {
          return;
        }

        stateRef.current =
          "interactive";

        setLabel("");

        widthToRef.current?.(
          ACTIVE_SIZE
        );

        heightToRef.current?.(
          ACTIVE_SIZE
        );

        scaleToRef.current?.(
          1
        );

        borderRadiusToRef.current?.(
          "50%"
        );

        gsap.to(label, {
          opacity: 0,
          duration: 0.12,
          ease: "power2.out",
          overwrite: true,
        });
      };

    const setProjectState =
      () => {
        if (
          stateRef.current ===
          "project"
        ) {
          return;
        }

        stateRef.current =
          "project";

        setLabel("OPEN ↗");

        widthToRef.current?.(
          PROJECT_WIDTH
        );

        heightToRef.current?.(
          PROJECT_HEIGHT
        );

        scaleToRef.current?.(
          1
        );

        borderRadiusToRef.current?.(
          "999px"
        );

        gsap.to(label, {
          opacity: 1,
          duration: 0.18,
          ease: "power2.out",
          overwrite: true,
        });
      };

    const handlePointerMove =
      (event) => {
        const x =
          event.clientX;

        const y =
          event.clientY;

        /*
         * Cursor is viewport-based.
         *
         * Therefore it does NOT care whether
         * Projects is horizontally transformed.
         */

        xToRef.current?.(
          x -
            DEFAULT_SIZE /
              2
        );

        yToRef.current?.(
          y -
            DEFAULT_SIZE /
              2
        );

        showCursor();

        /*
         * ------------------------------------------------------
         * Context detection
         * ------------------------------------------------------
         *
         * No IDs.
         * No home selectors.
         * No canvas selectors.
         */

        const target =
          event.target instanceof Element
            ? event.target
            : null;

        if (!target) {
          setDefaultState();
          return;
        }

        const projectZone =
          target.closest(
            "[data-cursor-project]"
          );

        if (projectZone) {
          setProjectState();
          return;
        }

        const interactive =
          target.closest(
            "a, button, [role='button'], [data-cursor-interactive]"
          );

        if (interactive) {
          setInteractiveState();
          return;
        }

        setDefaultState();
      };

    const handlePointerLeave =
      () => {
        visibleRef.current =
          false;

        opacityToRef.current?.(
          0
        );
      };

    const handlePointerEnter =
      () => {
        showCursor();
      };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave
    );

    document.documentElement.addEventListener(
      "pointerenter",
      handlePointerEnter
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave
      );

      document.documentElement.removeEventListener(
        "pointerenter",
        handlePointerEnter
      );

      /*
       * Remove custom-cursor CSS.
       */

      delete document.documentElement
        .dataset
        .customCursorEnabled;

      style.remove();

      /*
       * Kill GSAP tweens.
       */

      gsap.killTweensOf(cursor);
      gsap.killTweensOf(label);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        left-0
        top-0
        z-[99999]

        flex
        items-center
        justify-center

        overflow-hidden

        bg-[#F1F0EC]
        mix-blend-difference

        shadow-[0_4px_18px_rgba(0,0,0,0.08)]

        will-change-transform
      "
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      <span
        ref={labelRef}
        className="
          whitespace-nowrap
          font-[doner]
          text-[7px]
          font-medium
          uppercase
          tracking-[0.16em]
          text-[#080808]

          opacity-0
        "
      />
    </div>
  );
};

export default CustomCursor;