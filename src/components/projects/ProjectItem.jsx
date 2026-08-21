import React, {
  useCallback,
  useEffect,
  useRef,
} from "react";

const PREVIEW_WIDTH = 360;
const PREVIEW_HEIGHT = 240;
const LERP = 0.09;

const ProjectItem = ({
  project,
  index,
}) => {
  const sectionRef = useRef(null);
  const previewRef = useRef(null);
  const previewImageRef = useRef(null);
  const rafRef = useRef(null);

  const targetRef = useRef({
    x: 0,
    y: 0,
  });

  const currentRef = useRef({
    x: 0,
    y: 0,
  });

  const animatePreview = useCallback(() => {
    const current =
      currentRef.current;

    const target =
      targetRef.current;

    current.x +=
      (target.x - current.x) *
      LERP;

    current.y +=
      (target.y - current.y) *
      LERP;

    if (previewRef.current) {
      previewRef.current.style.transform =
        `translate3d(${current.x}px, ${current.y}px, 0)`;
    }

    rafRef.current =
      requestAnimationFrame(
        animatePreview
      );
  }, []);

  const setPreviewPosition = (event) => {
    const section =
      sectionRef.current;

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    const localX =
      event.clientX - rect.left;

    const localY =
      event.clientY - rect.top;

    targetRef.current = {
      x: Math.min(
        Math.max(
          localX - PREVIEW_WIDTH / 2,
          30
        ),
        rect.width -
          PREVIEW_WIDTH -
          30
      ),

      y: Math.min(
        Math.max(
          localY - PREVIEW_HEIGHT / 2,
          30
        ),
        rect.height -
          PREVIEW_HEIGHT -
          30
      ),
    };
  };

  const handleEnter = (event) => {
    const section =
      sectionRef.current;

    const preview =
      previewRef.current;

    if (!section || !preview) {
      return;
    }

    const rect =
      section.getBoundingClientRect();

    const localX =
      event.clientX - rect.left;

    const localY =
      event.clientY - rect.top;

    const initial = {
      x:
        localX -
        PREVIEW_WIDTH / 2,

      y:
        localY -
        PREVIEW_HEIGHT / 2,
    };

    currentRef.current =
      initial;

    targetRef.current =
      initial;

    preview.style.transform =
      `translate3d(${initial.x}px, ${initial.y}px, 0) scale(0.88)`;

    preview.style.opacity =
      "1";

    preview.style.transition =
      "opacity .45s cubic-bezier(.25,.46,.45,.94), transform .45s cubic-bezier(.25,.46,.45,.94)";

    requestAnimationFrame(() => {
      if (!previewRef.current) {
        return;
      }

      previewRef.current.style.transform =
        `translate3d(${initial.x}px, ${initial.y}px, 0) scale(1)`;
    });

    cancelAnimationFrame(
      rafRef.current
    );

    rafRef.current =
      requestAnimationFrame(
        animatePreview
      );
  };

  const handleMove = (event) => {
    setPreviewPosition(event);
  };

  const handleLeave = () => {
    cancelAnimationFrame(
      rafRef.current
    );

    if (previewRef.current) {
      previewRef.current.style.opacity =
        "0";

      previewRef.current.style.transform =
        `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) scale(0.88)`;
    }
  };

  const handlePreviewEnter = () => {
    if (!previewImageRef.current) {
      return;
    }

    previewImageRef.current.style.transform =
      "scale(1.05)";
  };

  const handlePreviewLeave = () => {
    if (!previewImageRef.current) {
      return;
    }

    previewImageRef.current.style.transform =
      "scale(1)";
  };

  useEffect(() => {
    return () => {
      cancelAnimationFrame(
        rafRef.current
      );
    };
  }, []);

  return (
    <article
      ref={sectionRef}
      onMouseEnter={handleEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="group relative h-screen w-full overflow-hidden border-t border-white/[0.07] bg-[#080808]"
    >
      {/* ==================================================
          PROJECT IMAGE
      ================================================== */}

      <img
        src={project.image}
        alt=""
        loading={
          index === 0
            ? "eager"
            : "lazy"
        }
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center

          opacity-[0.68]

          transition-transform
          duration-[1.2s]
          ease-[cubic-bezier(.22,1,.36,1)]

          group-hover:scale-[1.025]
        "
      />

      {/* ==================================================
          ATMOSPHERE
      ================================================== */}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/85" />

      {/* ==================================================
          INDEX / YEAR
      ================================================== */}

      <div className="absolute left-[5vw] right-[5vw] top-[5vh] z-10 flex items-center justify-between">
        <span className="font-[doner] text-[9px] tracking-[0.2em] text-red-400">
          {project.id}
        </span>

        <span className="font-[doner] text-[9px] uppercase tracking-[0.18em] text-white/40">
          {project.year}
        </span>
      </div>

      {/* ==================================================
          PROJECT INFO
      ================================================== */}

      <div className="absolute bottom-[6vh] left-[5vw] right-[5vw] z-10 flex items-end justify-between gap-8">
        <div className="max-w-[720px]">
          <h3 className="font-[Arial] text-[clamp(3rem,7vw,8rem)] font-black leading-[0.78] tracking-[-0.06em] text-white">
            {project.name}
          </h3>

          <p className="mt-5 max-w-[460px] font-[doner] text-[10px] leading-[1.65] tracking-[0.02em] text-white/45 sm:text-xs">
            {project.description}
          </p>
        </div>

        <div className="hidden max-w-[220px] text-right md:block">
          <p className="font-[doner] text-[9px] uppercase leading-[1.7] tracking-[0.18em] text-white/40">
            {project.category}
          </p>
        </div>
      </div>

      {/* ==================================================
          FLOATING PREVIEW
      ================================================== */}

      <a
        ref={previewRef}
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.name}`}
        className="
          pointer-events-auto
          absolute
          left-0
          top-0
          z-30
          hidden

          h-[240px]
          w-[360px]

          overflow-hidden
          rounded-[3px]

          opacity-0

          shadow-[0_25px_80px_rgba(0,0,0,.55)]

          will-change-transform

          transition-[opacity,transform]
          duration-450

          ease-[cubic-bezier(.25,.46,.45,.94)]

          md:block
        "
      >
        <img
          ref={previewImageRef}
          src={project.image}
          alt={project.name}
          draggable="false"
          onMouseEnter={
            handlePreviewEnter
          }
          onMouseLeave={
            handlePreviewLeave
          }
          className="
            h-full
            w-full
            object-cover

            transition-transform
            duration-700
            ease-[cubic-bezier(.25,.46,.45,.94)]
          "
        />
      </a>

      {/* ==================================================
          MOBILE CTA
      ================================================== */}

      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        className="
          absolute
          bottom-[6vh]
          right-[5vw]
          z-20

          font-[doner]
          text-[9px]
          uppercase
          tracking-[0.2em]
          text-white/60

          md:hidden
        "
      >
        VIEW ↗
      </a>
    </article>
  );
};

export default ProjectItem;