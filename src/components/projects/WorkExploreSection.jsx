import { useEffect, useRef, useCallback } from 'react'

/* ════════════════════════════════════════════════════════════════
   GLOBAL STYLES + FONTS
════════════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --pink:  #F62A99;
      --black: #090909;
      --white: #ffffff;
      --disp:  'Bebas Neue', sans-serif;
      --body:  'DM Sans', sans-serif;
    }

    /* ── Scroll reveal ──────────────────────────────────── */
    .rv {
      opacity: 0;
      transform: translateY(38px);
      transition:
        opacity   .85s cubic-bezier(.25,.46,.45,.94),
        transform .85s cubic-bezier(.25,.46,.45,.94);
    }
    .rv.in { opacity: 1; transform: translateY(0); }
    .rv.d1 { transition-delay: .13s; }
    .rv.d2 { transition-delay: .28s; }

    /* ── Explore-Now button shell ───────────────────────── */
    .explore-btn {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 10px 26px 10px 10px;
      background: #fff;
      border-radius: 999px;
      box-shadow: 0 1px 14px 2px rgba(255,255,255,.44);
      text-decoration: none;
      transition: transform .3s ease, box-shadow .3s ease;
    }
    .explore-btn:hover {
      transform: scale(1.04);
      box-shadow: 0 2px 28px 5px rgba(255,255,255,.55);
    }

    /*
      Arrow circle — clips the two-arrow track.
      IMPORTANT: no display:flex / align-items here.
      The circle is exactly 36 × 36 px and overflow:hidden,
      so whichever arrow slot is at y=0 inside the circle
      fills it perfectly (each slot is also 36 × 36).
    */
    .btn-circle {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--pink);
      overflow: hidden;
      flex-shrink: 0;
    }

    /*
      Two-arrow track.
      Rest  → translateY(0)  : Arrow 1 sits at y=0 → perfectly centered ✓
      Hover → translateY(-36px) : Arrow 2 slides up from below → centered ✓
      Leave → CSS transition eases back to translateY(0) → Arrow 1 returns ✓
      Zero JS. No frozen last-frame bug. No infinite animation.
    */
    .btn-arrow-track {
      display: flex;
      flex-direction: column;
      transform: translateY(0);
      will-change: transform;
      transition: transform .42s cubic-bezier(.25,.46,.45,.94);
    }
    .explore-btn:hover .btn-arrow-track {
      transform: translateY(-36px);
    }
    .btn-arrow-slot {
      width: 36px;
      height: 36px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .btn-label {
      font-family: var(--disp);
      font-size: 17px;
      letter-spacing: .06em;
      color: var(--black);
      line-height: 1;
    }
  `}</style>
)

/* ════════════════════════════════════════════════════════════════
   ARROW SVG
════════════════════════════════════════════════════════════════ */
const ArrowSVG = () => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none"
    stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2 13L13 2M13 2H6M13 2V9" />
  </svg>
)

/* ════════════════════════════════════════════════════════════════
   EXPLORE NOW BUTTON — pure CSS arrow slide, zero JS
════════════════════════════════════════════════════════════════ */
function ExploreBtn({ href = '#' }) {
  return (
    <a className="explore-btn" href={href}>
      <span className="btn-circle">
        <span className="btn-arrow-track">
          <span className="btn-arrow-slot"><ArrowSVG /></span>{/* Arrow 1 — resting */}
          <span className="btn-arrow-slot"><ArrowSVG /></span>{/* Arrow 2 — enters from below on hover */}
        </span>
      </span>
      <span className="btn-label">EXPLORE NOW</span>
    </a>
  )
}

/* ════════════════════════════════════════════════════════════════
   PROJECTS DATA
════════════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1, title: 'CardioRisk AI', tags: 'Machine Learning ·  Model Persistence · Streamlit', href: 'https://cardioriskai.streamlit.app/',
    bg:    'https://d2cxceko1uvz80.cloudfront.net/cardiobg.jpg',
    thumb: 'https://d2cxceko1uvz80.cloudfront.net/cardio.webp',
  },
  {
    id: 2, title: 'Derivium', tags: 'Web · 3D Visualization · Symbolic Math', href: 'https://derivium-coral.vercel.app/',
    bg:    'https://framerusercontent.com/images/BO4v1zzGmf5eA3osW1s6v8M5w.jpg',
    thumb: 'https://d2cxceko1uvz80.cloudfront.net/derivium.webp',
  },
  {
    id: 3, title: 'Significo', tags: 'Web · Vanilla JS · CI/CD', href: 'https://significo-clone.s3.eu-north-1.amazonaws.com/index.html',
    bg:    'https://framerusercontent.com/images/LoZV0FH52pU8337Nsd1aPAKxHls.jpg',
    thumb: 'https://d2cxceko1uvz80.cloudfront.net/significo.webp',
  },
  {
    id: 4, title: 'GameNight', tags: 'Linux Server · Game Development · Reverse Engineering', href: 'https://discord.gg/RPmARKDc6f',
    bg:    'https://d2cxceko1uvz80.cloudfront.net/gamenightbg.jpg',
    thumb: 'https://d2cxceko1uvz80.cloudfront.net/gamenight.webp',
  },
]

/* ════════════════════════════════════════════════════════════════
   WORK ITEM
   Background  → 100 vh, object-fit cover.
   Thumbnail   → invisible at rest.
   mouseenter  → seeds position to exact cursor (no fly-in).
   mousemove   → lerp-follows cursor, clamped to mid 50 % zone
                 so title (bottom-left) & tags (bottom-right)
                 are always visible.
   mouseleave  → fades + scales out; RAF stops.
   Click       → thumbnail <a> fires normally.

   Two-ref pattern keeps position (RAF) and opacity/scale
   (CSS transition) on separate DOM nodes → zero conflicts.
════════════════════════════════════════════════════════════════ */
const THUMB_W  = 360
const THUMB_H  = 240   // 3 : 2
const LERP     = 0.095 // smoothness: lower = more lag/silkier

function WorkItem({ project, index }) {
  const sectionRef = useRef(null)
  const posRef     = useRef(null)   // moved only via RAF transform
  const innerRef   = useRef(null)   // opacity + scale via CSS transition

  const rafRef  = useRef(null)
  const target  = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  /* Clamp a raw mouse point to the middle 50 % of the section */
  const clamp = useCallback((mx, my, rect) => ({
    x: Math.min(Math.max(mx, rect.width  * 0.25), rect.width  * 0.75) - THUMB_W / 2,
    y: Math.min(Math.max(my, rect.height * 0.25), rect.height * 0.75) - THUMB_H / 2,
  }), [])

  /* RAF lerp — runs only while cursor is inside the section */
  const tick = useCallback(() => {
    const lx = current.current.x + (target.current.x - current.current.x) * LERP
    const ly = current.current.y + (target.current.y - current.current.y) * LERP
    current.current = { x: lx, y: ly }
    if (posRef.current)
      posRef.current.style.transform = `translate(${lx}px, ${ly}px)`
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  /* mouseenter — seed both current & target to the cursor
     so the thumbnail materialises exactly under the pointer */
  const onEnter = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const pos = clamp(e.clientX - rect.left, e.clientY - rect.top, rect)

    target.current  = { ...pos }
    current.current = { ...pos }
    if (posRef.current)
      posRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`

    /* Fade + scale in */
    if (innerRef.current) {
      innerRef.current.style.transition =
        'opacity .45s cubic-bezier(.25,.46,.45,.94), transform .45s cubic-bezier(.25,.46,.45,.94)'
      innerRef.current.style.opacity   = '1'
      innerRef.current.style.transform = 'scale(1)'
    }

    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(tick)
  }, [clamp, tick])

  /* mousemove — update target only; RAF handles the lerp */
  const onMove = useCallback((e) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    target.current = clamp(e.clientX - rect.left, e.clientY - rect.top, rect)
  }, [clamp])

  /* mouseleave — stop RAF, fade + scale out */
  const onLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (innerRef.current) {
      innerRef.current.style.transition =
        'opacity .5s cubic-bezier(.25,.46,.45,.94), transform .5s cubic-bezier(.25,.46,.45,.94)'
      innerRef.current.style.opacity   = '0'
      innerRef.current.style.transform = 'scale(0.88)'
    }
  }, [])

  /* Scroll-reveal for the text nodes inside this item */
  useEffect(() => {
    const sec = sectionRef.current; if (!sec) return
    const els = sec.querySelectorAll('.rv')
    const io  = new IntersectionObserver(
      (entries) => entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target) }
      }),
      { threshold: 0.14 }
    )
    els.forEach(el => io.observe(el))
    return () => { io.disconnect(); cancelAnimationFrame(rafRef.current) }
  }, [])

  return (
    <section
      ref={sectionRef}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',       /* ← full screen height + width always */
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,.06)',
      }}
    >
      {/* ── Full-cover background ── */}
      <img
        src={project.bg}
        alt=""
        loading="lazy"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center',
          pointerEvents: 'none',
        }}
      />

      {/* ── Vignette overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: `
          linear-gradient(to bottom,
            rgba(9,9,9,.55) 0%,
            rgba(9,9,9,.12) 40%,
            rgba(9,9,9,.78) 100%)
        `,
      }} />

      {/* ── Index (top-left) ── */}
      <p className="rv" style={{
        position: 'absolute', top: 36, left: 'clamp(24px,5vw,64px)',
        fontFamily: 'var(--disp)', fontSize: 12,
        letterSpacing: '.28em', color: 'var(--pink)', pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </p>

      {/* ── Title (bottom-left) ── */}
      <h2 className="rv d1" style={{
        position: 'absolute',
        bottom: 'clamp(32px,5vh,60px)',
        left:   'clamp(24px,5vw,64px)',
        fontFamily: 'var(--disp)',
        fontSize:   'clamp(52px,8vw,120px)',
        color: 'var(--white)', lineHeight: .9,
        letterSpacing: '.01em', maxWidth: '55%',
        pointerEvents: 'none',
      }}>
        {project.title}
      </h2>

      {/* ── Tags (bottom-right) — always visible (outside the 50 % clamp zone) ── */}
      <p className="rv d2" style={{
        position: 'absolute',
        bottom: 'clamp(32px,5vh,60px)',
        right:  'clamp(24px,5vw,64px)',
        fontFamily: 'var(--body)', fontSize: 11, fontWeight: 300,
        letterSpacing: '.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,.5)', pointerEvents: 'none',
      }}>
        {project.tags}
      </p>

      {/* ══════════════════════════════════════════════════════════
          FLOATING THUMBNAIL — two-ref separation:
          posRef  = outer div,  moved by RAF  (transform only)
          innerRef = inner div, faded by transition (opacity + scale)
          This keeps the two concerns completely independent.
      ══════════════════════════════════════════════════════════ */}
      <div
        ref={posRef}
        style={{
          position: 'absolute', top: 0, left: 0,
          width: THUMB_W, height: THUMB_H,
          pointerEvents: 'none',   /* outer: never blocks events */
          zIndex: 20,
          willChange: 'transform',
        }}
      >
        {/* Inner layer — opacity + scale only */}
        <div
          ref={innerRef}
          style={{
            width: '100%', height: '100%',
            opacity: 0,
            transform: 'scale(0.88)',
            /* transition is applied dynamically on enter / leave */
          }}
        >
          {/* Actual clickable link */}
          <a
            href={project.href}
            style={{
              display: 'block', width: '100%', height: '100%',
              borderRadius: 10, overflow: 'hidden',
              pointerEvents: 'auto',   /* re-enable clicks */
              cursor: 'pointer',
              boxShadow: '0 24px 64px rgba(0,0,0,.65), 0 4px 16px rgba(0,0,0,.4)',
            }}
          >
            <img
              src={project.thumb}
              alt={project.title}
              draggable={false}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', display: 'block',
                pointerEvents: 'none',
                transition: 'transform .6s cubic-bezier(.25,.46,.45,.94)',
              }}
              onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.06)' }}
              onMouseOut={e  => { e.currentTarget.style.transform = 'scale(1)' }}
            />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   WORK HERO
════════════════════════════════════════════════════════════════ */
function WorkHero() {
  const ref = useRef(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll('.rv'); if (!els) return
    const io  = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.08 }
    )
    els.forEach(el => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in')
      else io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={ref} id="work"
      style={{
        position: 'relative', width: '100%', minHeight: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        overflow: 'hidden', background: 'var(--black)',
      }}
    >
      <img
        src="https://framerusercontent.com/images/UeSiWGi3nUKunh3W4pEpGW8u5K4.png"
        alt=""
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', pointerEvents:'none' }}
      />
      <div style={{
        position:'absolute', inset:0, pointerEvents:'none',
        background:'linear-gradient(180deg, rgba(9,9,9,.08) 0%, rgba(9,9,9,.5) 55%, rgba(9,9,9,.98) 100%)',
      }} />

      <div style={{
        position:'relative', zIndex:2,
        width:'100%', maxWidth:1320, margin:'0 auto',
        padding:'clamp(80px,10vw,140px) clamp(24px,5vw,64px) clamp(56px,8vw,96px)',
        display:'grid', gridTemplateColumns:'1fr 1fr',
        alignItems:'flex-end', gap:'clamp(24px,4vw,60px)',
      }}>
        <h1 className="rv" style={{
          fontFamily:'var(--disp)',
          fontSize:'clamp(96px,14vw,200px)',
          color:'var(--white)', textTransform:'uppercase',
          lineHeight:.88, letterSpacing:'-.01em',
        }}>
          Selected Work
        </h1>
        <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
          <p className="rv d1" style={{
            fontFamily:'var(--body)',
            fontSize:'clamp(15px,1.35vw,19px)',
            fontWeight:300, color:'rgba(255,255,255,.8)', lineHeight:1.62,
          }}>
            Explore a collection of high-quality, innovative designs crafted to
            elevate brands and captivate audiences. Each project reflects our
            commitment to creativity and excellence.
          </p>
          <div className="rv d2">
            <ExploreBtn href="https://github.com/tahahssn" />
          </div>
        </div>
      </div>

      <style>{`@media(max-width:640px){#work>div:last-child{grid-template-columns:1fr!important}}`}</style>
    </section>
  )
}

/* ════════════════════════════════════════════════════════════════
   ROOT EXPORT
════════════════════════════════════════════════════════════════ */
export default function WorkExploreSection() {
  return (
    <>
      <GlobalStyles />
      <WorkHero />
      <div id="explore">
        {PROJECTS.map((p, i) => <WorkItem key={p.id} project={p} index={i} />)}
      </div>
    </>
  )
}