import React from "react";

const HeroSignature = () => {
  return (
    <div className="flex items-start gap-3 sm:gap-4">
      <span
        className="
          mt-[0.48em]
          h-px
          w-7
          shrink-0
          bg-white/55

          sm:w-9
          md:w-11
        "
      />

      <p
        className="
          max-w-[270px]

          font-[doner]
          text-[clamp(0.7rem,0.9vw,0.92rem)]
          font-medium
          uppercase
          leading-[1.5]
          tracking-[0.08em]
          text-white/70

          max-md:max-w-[240px]
          max-sm:max-w-[200px]
        "
      >
        Move people,
        <br />
        not just screens.
      </p>
    </div>
  );
};

export default HeroSignature;