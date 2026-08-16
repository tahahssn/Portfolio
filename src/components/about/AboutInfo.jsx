import React from "react";

import heroImage from "../../../public/images/PNGs/herobg1.png";

const AboutInfo = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#080808]">
      {/* RIGHT SIDE LABEL */}
      <div
        data-about-info-side
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
          <div className="h-full w-px bg-white/10" />

          <span
            className="
              rotate-90
              whitespace-nowrap
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/45
            "
          >
            About
          </span>
        </div>
      </div>

      {/* LEFT CONTENT */}
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
        {/* LABEL */}
        <div
          data-about-info-label
          className="mb-9 flex items-center gap-3"
        >
          <span
            className="
              font-[doner]
              text-[9px]
              tracking-[0.18em]
              text-white/30
            "
          >
            01
          </span>

          <span className="h-px w-7 bg-white/15" />

          <span
            className="
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/45
            "
          >
            About
          </span>
        </div>

        {/* TITLE */}
        <div
          data-about-info-title
          className="
            max-w-[900px]
            font-[Arial]
            font-normal
            text-[clamp(2rem,3.9vw,4.6rem)]
            leading-[1.05]
            tracking-[-0.045em]
            text-white
          "
        >
          I work between
          <span className="mx-2 italic text-white/85">
            intelligence
          </span>
          and interaction —
          building the systems underneath and the
          experiences people actually touch.
        </div>

        {/* DESCRIPTION */}
        <p
          data-about-info-paragraph
          className="
            mt-9
            max-w-[590px]
            font-[doner]
            text-[11px]
            leading-[1.75]
            tracking-[0.012em]
            text-white/48
            sm:text-xs
            md:text-[13px]
          "
        >
          My work moves between AI and machine learning,
          frontend development and interactive digital
          experiences. I care about the relationship between
          the logic underneath a product and the way it feels
          when someone uses it.
        </p>

        {/* META */}
        <div
          data-about-info-meta
          className="
            mt-11
            flex
            flex-wrap
            gap-x-12
            gap-y-7
          "
        >
          <div>
            <span
              className="
                mb-2
                block
                font-[doner]
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              Focus
            </span>

            <span
              className="
                font-[doner]
                text-[10px]
                leading-[1.75]
                text-white/65
              "
            >
              AI / ML
              <br />
              Frontend
              <br />
              Interactive Web
            </span>
          </div>

          <div>
            <span
              className="
                mb-2
                block
                font-[doner]
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              Approach
            </span>

            <span
              className="
                font-[doner]
                text-[10px]
                leading-[1.75]
                text-white/65
              "
            >
              Curious
              <br />
              Precise
              <br />
              Experimental
            </span>
          </div>

          <div>
            <span
              className="
                mb-2
                block
                font-[doner]
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-white/25
              "
            >
              Based
            </span>

            <span
              className="
                font-[doner]
                text-[10px]
                leading-[1.75]
                text-white/65
              "
            >
              Karachi
              <br />
              Pakistan
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT PORTRAIT */}
      <div
        data-about-info-portrait
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