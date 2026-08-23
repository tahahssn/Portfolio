import React from "react";

const heroImage = "/images/herobg1.avif";

const AboutInfo = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#080808] text-[#F1F0EC]">
      {/* =====================================================
          RIGHT SIDE LABEL
      ====================================================== */}

      <div
        data-about-info-side
        data-about-vertical
        className="
          absolute
          right-[2.2vw]
          top-1/2
          z-30
          hidden
          -translate-y-1/2
          items-center
          lg:flex
        "
      >
        <div className="flex h-[72vh] items-center gap-4">
          <div className="h-full w-px bg-white/[0.10]" />

          <span
            className="
              rotate-90
              whitespace-nowrap
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white/[0.42]
            "
          >
            About
          </span>
        </div>
      </div>

      {/* =====================================================
          LEFT CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20
          flex
          h-full
          w-full
          flex-col
          justify-center

          px-[6vw]
          py-[10vh]

          lg:w-[56%]
          lg:px-[5vw]
          lg:pr-[4vw]
        "
      >
        {/* ===================================================
            LABEL
        ==================================================== */}

        <div
          data-about-info-label
          data-about-label
          className="
            mb-8
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              font-[doner]
              text-[9px]
              tracking-[0.18em]
              text-white/[0.32]
            "
          >
            01
          </span>

          <span
            className="
              h-px
              w-7
              bg-red-500/[0.65]
            "
          />

          <span
            className="
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white/[0.48]
            "
          >
            About
          </span>
        </div>

        {/* ===================================================
            MAIN STATEMENT
        ==================================================== */}

        <div
          data-about-info-title
          data-about-text
          className="
            max-w-[880px]

            font-[Arial]
            font-normal

            text-[clamp(2.15rem,3.65vw,4.45rem)]
            leading-[1.03]
            tracking-[-0.048em]

            text-[#F1F0EC]
          "
        >
          I build systems that{" "}
          <span
            className="
              italic
              text-[#D7D5CF]
            "
          >
            think
          </span>{" "}
          and interfaces that{" "}
          <span
            className="
              italic
              text-[#D7D5CF]
            "
          >
            move.
          </span>
        </div>

        {/* ===================================================
            SINGLE SUPPORTING PARAGRAPH
        ==================================================== */}

        <p
          data-about-info-paragraph
          data-about-description
          className="
            mt-8
            max-w-[600px]

            font-[doner]
            text-[11px]
            leading-[1.75]
            tracking-[0.01em]

            text-white/[0.52]

            sm:text-xs
            md:text-[13px]
          "
        >
          From AI/ML and data to frontend and interaction,
          I turn technical ideas into products that feel
          clear, responsive, and deliberately made.
        </p>

        {/* ===================================================
            HORIZONTAL META
        ==================================================== */}

        <div
          data-about-info-meta
          data-about-meta
          className="
            mt-10

            flex
            items-center
            whitespace-nowrap
            overflow-hidden

            font-[doner]
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/[0.42]

            sm:text-[9px]
          "
        >
          <span
            className="
              transition-colors
              duration-300
              hover:text-white/[0.85]
            "
          >
            INTELLIGENCE
          </span>

          <span className="mx-4 h-3 w-px shrink-0 bg-red-500/[0.65]" />

          <span
            className="
              transition-colors
              duration-300
              hover:text-white/[0.85]
            "
          >
            SYSTEMS
          </span>

          <span className="mx-4 h-3 w-px shrink-0 bg-red-500/[0.65]" />

          <span
            className="
              transition-colors
              duration-300
              hover:text-white/[0.85]
            "
          >
            KARACHI, PAKISTAN
          </span>

          <span className="mx-4 h-3 w-px shrink-0 bg-red-500/[0.65]" />

          <span
            className="
              text-white/[0.62]
              transition-colors
              duration-300
              hover:text-white/[0.9]
            "
          >
            AVAILABLE WORLDWIDE
          </span>
        </div>
      </div>

      {/* =====================================================
          RIGHT PORTRAIT
          
          DO NOT TOUCH THIS.
      ====================================================== */}

      <div
        data-about-info-portrait
        data-about-info-image
        className="
          absolute
          right-0
          top-0
          hidden
          h-full
          w-[46%]
          overflow-hidden
          lg:block
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

            opacity-90
            saturate-[0.9]
            contrast-[1.02]
            brightness-[0.92]

            will-change-transform
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            w-[38%]
            bg-gradient-to-r
            from-[#080808]
            via-[#080808]/60
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-red-900/8
            mix-blend-screen
          "
        />
      </div>
    </div>
  );
};

export default AboutInfo;