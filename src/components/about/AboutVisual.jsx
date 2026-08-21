import React from "react";

const heroImage = "/images/PNGs/herobg1.png";

const AboutVisual = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* IMAGE */}
      <div
        data-about-visual-image
        className="absolute inset-0 overflow-hidden"
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

        <div className="absolute inset-0 bg-black/25" />

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

      {/* RED ATMOSPHERE */}
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

      {/* LABEL */}
      <div
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

          <span className="h-px w-7 bg-white/20" />

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

      {/* STATEMENT */}
      <div
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
          I make complex things
          <span className="mx-2 italic text-white">
            feel simple.
          </span>
        </p>
      </div>

      {/* HINT */}
      <div
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
          <span className="h-px w-7 bg-white/20" />

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

          <span className="h-px w-7 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default AboutVisual;