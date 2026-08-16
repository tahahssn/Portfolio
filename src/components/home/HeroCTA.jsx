import React from "react";
import gsap from "gsap";

const HeroCTA = () => {
  const handleEnter = (event) => {
    const element = event.currentTarget;

    const arrow =
      element.querySelector("[data-arrow]");

    const line =
      element.querySelector("[data-line]");

    gsap.to(arrow, {
      x: 6,
      y: -6,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });

    gsap.to(line, {
      scaleX: 1,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  const handleLeave = (event) => {
    const element = event.currentTarget;

    const arrow =
      element.querySelector("[data-arrow]");

    const line =
      element.querySelector("[data-line]");

    gsap.to(arrow, {
      x: 0,
      y: 0,
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });

    gsap.to(line, {
      scaleX: 0,
      duration: 0.38,
      ease: [0.22, 1, 0.36, 1],
      overwrite: "auto",
    });
  };

  return (
    <a
      href="mailto:tahahassan699@gmail.com"
      aria-label="Let's talk"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="
        pointer-events-auto
        relative
        inline-flex
        items-center
        gap-3
        pb-2

        font-[doner]
        text-[10px]
        uppercase
        tracking-[0.22em]

        text-white/85

        sm:text-[11px]
        md:text-xs
      "
    >
      <span>LET'S TALK</span>

      <span
        data-arrow
        className="inline-block"
      >
        ↗
      </span>

      <span
        data-line
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          origin-left
          scale-x-0
          bg-white/65
        "
      />
    </a>
  );
};

export default HeroCTA;