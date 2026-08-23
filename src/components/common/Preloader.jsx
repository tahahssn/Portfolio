import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const COLUMN_COUNT = 5;

const stairVariants = {
  initial: {
    y: "100%",
  },

  cover: (index) => ({
    y: "0%",
    transition: {
      duration: 0.55,
      delay: index * 0.055,
      ease: [0.76, 0, 0.24, 1],
    },
  }),

  reveal: (index) => ({
    y: "100%",
    transition: {
      duration: 0.65,
      delay: index * 0.055,
      ease: [0.76, 0, 0.24, 1],
    },
  }),
};

const Preloader = ({ onComplete }) => {
  const barRef = useRef(null);
  const percentTextRef = useRef(null);

  const [phase, setPhase] = useState("loading");

  const completedColumns = useRef(0);
  const finished = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2500;
    const step = 50;
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += step;
      const value = Math.min((elapsed / duration) * 100, 100);

      if (percentTextRef.current) {
        percentTextRef.current.textContent = `${Math.floor(value)}%`;
      }
      if (barRef.current) {
        barRef.current.style.width = `${value}%`;
      }

      if (value >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          completedColumns.current = 0;
          setPhase("cover");
        }, 300);
      }
    }, step);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  /*
   * Count the stairs while they move UP.
   */

  const handleCoverComplete = () => {
    if (phase !== "cover") return;

    completedColumns.current += 1;

    if (completedColumns.current !== COLUMN_COUNT) {
      return;
    }

    /*
     * ALL stairs are now covering the loader.
     *
     * Reset counter before the second animation.
     */
    completedColumns.current = 0;

    /*
     * The loader disappears NOW.
     *
     * The black stair curtains remain on screen,
     * so the user never sees the swap.
     */
    requestAnimationFrame(() => {
      setPhase("reveal");
    });
  };

  /*
   * Count the stairs while they move DOWN.
   */

  const handleRevealComplete = () => {
    if (phase !== "reveal") return;

    completedColumns.current += 1;

    if (
      completedColumns.current === COLUMN_COUNT &&
      !finished.current
    ) {
      finished.current = true;

      requestAnimationFrame(() => {
        onComplete?.();
      });
    }
  };

  const showLoader =
    phase === "loading" || phase === "cover";

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden">

      {/* =====================================================
          LOADING SCREEN
      ====================================================== */}

      {showLoader && (
        <div className="absolute inset-0 z-10 bg-black">

          <div
            ref={percentTextRef}
            className="absolute bottom-4 right-8 font-[honer-those] text-[5.5rem] font-thin leading-none text-white/70 max-md:right-6 max-md:text-[4rem] max-sm:right-4 max-sm:text-[3rem]"
          >
            0%
          </div>

          <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/10">
            <div
              ref={barRef}
              className="h-full bg-white/60"
              style={{
                width: "0%",
              }}
            />
          </div>

        </div>
      )}

      {/* =====================================================
          STAIR CURTAIN
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-20 flex overflow-hidden">

        {Array.from({ length: COLUMN_COUNT }).map((_, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={stairVariants}
            initial="initial"
            animate={
              phase === "cover"
                ? "cover"
                : phase === "reveal"
                  ? "reveal"
                  : "initial"
            }
            onAnimationComplete={(definition) => {
              if (definition === "cover") {
                handleCoverComplete();
              }

              if (definition === "reveal") {
                handleRevealComplete();
              }
            }}
            className="relative h-full w-full bg-slate-100"
          />
        ))}

      </div>
    </div>
  );
};

export default Preloader;