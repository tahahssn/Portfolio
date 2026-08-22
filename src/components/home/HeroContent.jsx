import React, { useRef } from "react";

import HeroStatement from "./HeroStatement";
import HeroSignature from "./HeroSignature";
import HeroCTA from "./HeroCTA";

const HeroContent = () => {
  const rootRef = useRef(null);
  const statementRef = useRef(null);
  const signatureRef = useRef(null);
  const ctaRef = useRef(null);

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
      {/* ==========================================================
          MAIN STATEMENT
          STATIC — NO ENTRANCE ANIMATION
          ========================================================== */}

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

      {/* ==========================================================
          SIGNATURE
          STATIC
          ========================================================== */}

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

      {/* ==========================================================
          CTA
          STATIC
          ========================================================== */}

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