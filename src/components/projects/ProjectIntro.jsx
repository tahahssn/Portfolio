import React from "react";
import { motion } from "framer-motion";

const ProjectIntro = () => {
  return (
    <section className="relative flex min-h-[58vh] w-full items-end overflow-hidden bg-[#080808] px-[5vw] pb-[10vh] text-white">
      <div className="w-full">
        {/* =====================================================
            SECTION LABEL
        ====================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 24,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: false,
            amount: 0.25,
          }}
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-8 flex items-center gap-3"
        >
          <span className="font-[doner] text-[9px] tracking-[0.18em] text-white/30">
            02
          </span>

          <span className="h-px w-7 bg-red-500/60" />

          <span className="font-[doner] text-[9px] uppercase tracking-[0.22em] text-white/45">
            Work
          </span>
        </motion.div>

        {/* =====================================================
            TITLE / DESCRIPTION
        ====================================================== */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <motion.h2
            initial={{
              opacity: 0,
              y: 45,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="
              font-[Arial]
              text-[clamp(4rem,9vw,10rem)]
              font-black
              leading-[0.78]
              tracking-[-0.065em]
              text-[#f1f0ec]
            "
          >
            SELECTED
            <br />
            WORK.
          </motion.h2>

          <motion.p
            initial={{
              opacity: 0,
              y: 24,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              max-w-[360px]
              pb-2
              font-[doner]
              text-[11px]
              leading-[1.7]
              tracking-[0.015em]
              text-white/45
              sm:text-xs
            "
          >
            A few things I’ve built across intelligent systems,
            interfaces and interactive experiments.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default ProjectIntro;