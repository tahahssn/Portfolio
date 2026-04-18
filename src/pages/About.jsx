/**
 * About.jsx — Hero section only
 *
 * Matches Arjun Raghavan's portfolio hero (dark-themed).
 *
 * Install:  npm install framer-motion
 * Add to index.html <head>:
 *   <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
 */

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// ── Design tokens ─────────────────────────────────────────────────────────────
const T = {
  bgGradient: "bg-gradient-to-t from-[#091021] to-[#050914]",
  cream:  "#f0ece3",
  muted:  "#5a5854",
  dimmed: "#2e2c2a",
  purple: "#5500ff",
  orange: "#b8440b",
};

const FONT = "'Inter', sans-serif";

// ── Cycling words for the "product design" slot ───────────────────────────────
const CYCLING_WORDS = [
  "frontend",
  "clear stories",
  "ai systems",
  "human experience",
];

// ── Background squiggle (scattered decoration, like original) ─────────────────
function Squiggle({ style = {} }) {
  return (
    <svg
      viewBox="0 0 256 100"
      fill="none"
      aria-hidden
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <path
        d="M0 52 C12 38,24 19,38 10 C51 1,67 -2,80 2
           C97 7,108 25,119 47 C123 55,127 63,131 70
           C134 76,138 85,142 89 C146 92,150 84,153 81
           C162 69,173 60,184 56 C196 51,209 50,219 64
           C226 72,232 82,239 89 C244 94,252 85,256 80"
        stroke={T.muted}
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="miter"
        strokeMiterlimit="10"
        opacity="0.18"
      />
    </svg>
  );
}

// ── Double squiggle underline on "make sense" ─────────────────────────────────
function DoubleUnderline({ inView }) {
  return (
    <svg
      viewBox="0 0 540 24"
      fill="none"
      style={{
        position: "absolute",
        bottom: -6,
        left: 0,
        width: "100%",
        height: 20,
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <motion.path
        d="M2 7 C60 1,120 13,180 6 C240 -1,300 11,360 5 C420 -1,480 10,538 6"
        stroke={T.purple}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.05 }}
      />
      <motion.path
        d="M2 16 C60 10,120 22,180 15 C240 8,300 20,360 14 C420 8,480 19,538 15"
        stroke={T.purple}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1.18 }}
      />
    </svg>
  );
}

// ── Decorative Sparkle SVG (replaces eyes + annotation) ───────────────────────
function SparkleDecoration() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.2 }}
      style={{
        position: "absolute",
        bottom: "clamp(36px, 6vh, 72px)",
        right: "clamp(36px, 8vw, 150px)",
        pointerEvents: "none",
      }}
    >
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M40 8 L43 32 L67 35 L43 38 L40 62 L37 38 L13 35 L37 32 L40 8Z"
          fill={T.purple}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          opacity="0.5"
        />
        <motion.path
          d="M40 18 L42 34 L58 36 L42 38 L40 54 L38 38 L22 36 L38 34 L40 18Z"
          fill={T.orange}
          initial={{ rotate: 0 }}
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          opacity="0.7"
        />
        <circle cx="40" cy="38" r="4" fill={T.cream} opacity="0.9" />
      </svg>
    </motion.div>
  );
}

// ── Additional decorative SVG — orbiting dots ─────────────────────────────────
function OrbitingDots() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 1.4, duration: 0.8 }}
      style={{
        position: "absolute",
        top: "15%",
        left: "5%",
        pointerEvents: "none",
      }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="50" stroke={T.muted} strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
        <motion.circle
          cx="60"
          cy="60"
          r="4"
          fill={T.purple}
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        />
      </svg>
    </motion.div>
  );
}

// ── Staggered word reveal ─────────────────────────────────────────────────────
function Words({ children, inView, delay = 0, style = {} }) {
  const words = String(children).split(" ");
  return (
    <>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.52,
            ease: [0.22, 1, 0.36, 1],
            delay: delay + i * 0.055,
          }}
          style={{ display: "inline-block", marginRight: "0.27em", ...style }}
        >
          {w}
        </motion.span>
      ))}
    </>
  );
}

// ── Cycling text with flip animation ─────────────────────────────────────────
function CyclingText({ inView }) {
  const [idx, setIdx]         = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setStarted(true), 1500);
    return () => clearTimeout(t);
  }, [inView]);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setIdx(p => (p + 1) % CYCLING_WORDS.length), 2300);
    return () => clearInterval(id);
  }, [started]);

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 44, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{   y: -44, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block" }}
        >
          {CYCLING_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
      {/* Ghost shadow underneath */}
      <span
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          userSelect: "none",
          transform: "translateY(5px)",
          pointerEvents: "none",
        }}
      >
        {CYCLING_WORDS[idx]}
      </span>
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ABOUT / HERO
// ═══════════════════════════════════════════════════════════════════════════════
export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true });

  // Shared heading CSS
  const H = {
    fontFamily:    FONT,
    fontWeight:    700,
    fontSize:      "clamp(36px, 5vw, 66px)",
    lineHeight:    1.0,
    letterSpacing: "-0.05em",
    color:         T.cream,
    margin:        0,
  };

  return (
    <section
      ref={ref}
      style={{
        background:     "linear-gradient(to top, #091021, #050914)",
        minHeight:      "100dvh",
        display:        "flex",
        flexDirection:  "column",
        justifyContent: "center",
        padding:        "clamp(60px, 9vh, 120px) clamp(24px, 7vw, 130px)",
        position:       "relative",
        overflow:       "hidden",
      }}
    >
      {/* Scattered background squiggles */}
      <Squiggle style={{ width: 200, top: "10%",  right: "7%",  transform: "rotate(48deg)"  }} />
      <Squiggle style={{ width: 160, bottom: "16%", left: "1%", transform: "rotate(-36deg)", opacity: 0.1 }} />

      {/* Additional decorative SVG elements */}
      <OrbitingDots />

      {/* ── "Hi, I'm Arjun" ──────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0, x: -14 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        style={{
          fontFamily:   FONT,
          fontWeight:   400,
          fontSize:     "clamp(15px, 1.6vw, 20px)",
          color:        T.muted,
          marginBottom: "clamp(18px, 3vh, 32px)",
          letterSpacing: 0,
        }}
      >
        Hi, I'm{" "}
        <span style={{ color: T.cream, fontWeight: 700 }}>Taha Hassan</span>
      </motion.p>


      {/* ── HEADLINE ─────────────────────────────────────────────── */}
      <div style={{ position: "relative" }}>

        {/* Line 1 */}
        <div style={{ ...H, marginBottom: 4 }}>
          <Words inView={inView} delay={0.1}>
            I blend my engineering roots with
          </Words>
        </div>

        {/* Line 2 — cycling slot */}
        <div
          style={{
            ...H,
            color:       T.orange,
            overflow:    "hidden",
            height:      "1.06em",
            marginBottom: 4,
            display:     "flex",
            alignItems:  "flex-end",
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <CyclingText inView={inView} />
          </motion.span>
        </div>

        {/* Line 3 */}
        <div style={{ ...H, marginBottom: 4 }}>
          <Words inView={inView} delay={0.62}>
            to make interfaces
          </Words>
        </div>

        {/* Line 4 — "that just… make sense" without eyes */}
        <div
          style={{
            display:     "flex",
            alignItems:  "center",
            flexWrap:    "wrap",
            rowGap:      8,
            columnGap:   "0.28em",
          }}
        >
          <span style={{ ...H }}>
            <Words inView={inView} delay={0.74}>that just…</Words>
          </span>

          {/* "make sense" + double squiggle */}
          <motion.span
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1], delay: 0.92 }}
            style={{ ...H, position: "relative", display: "inline-block" }}
          >
            make sense
            <DoubleUnderline inView={inView} />
          </motion.span>
        </div>

      </div>

      {/* Sparkle decoration instead of removed sections */}
      <SparkleDecoration />

    </section>
  );
}