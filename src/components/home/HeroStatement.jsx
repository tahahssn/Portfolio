import React from "react";

const HeroStatement = () => {
  return (
    <h1
      className="
        select-none
        text-white
        antialiased

        font-[Arial]
        font-black

        text-[clamp(4rem,8.4vw,10rem)]
        leading-[0.76]
        tracking-[-0.065em]

        max-xl:text-[clamp(3.8rem,8.6vw,8rem)]

        max-lg:text-[clamp(3.5rem,9vw,7rem)]

        max-md:text-[clamp(3.1rem,14vw,6rem)]
        max-md:leading-[0.79]

        max-sm:text-[clamp(2.65rem,14.2vw,5rem)]
      "
    >
      <span
        data-hero-line
        className="block overflow-hidden pb-[0.06em]"
      >
        MAKE
      </span>

      <span
        data-hero-line
        className="block overflow-hidden pb-[0.06em]"
      >
        MIND
      </span>

      <span
        data-hero-line
        className="block overflow-hidden pb-[0.06em]"
      >
        MOVE.
      </span>
    </h1>
  );
};

export default HeroStatement;