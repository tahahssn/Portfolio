'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, transform, animate } from 'framer-motion';

const CustomCursor = () => {
  const cursor = useRef(null);
  const trail = useRef(null);

  const [hoveredEl, setHoveredEl] = useState(null);

  // Main mouse positions
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trail positions
  const trailX = useMotionValue(-100);
  const trailY = useMotionValue(-100);

  // Smooth motions
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 25 });

  const smoothTrailX = useSpring(trailX, { stiffness: 100, damping: 20 });
  const smoothTrailY = useSpring(trailY, { stiffness: 100, damping: 20 });

  const cursorBaseSize = 15;
  const cursorHoverSize = 40;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;

    if (hoveredEl) {
      // Sticky effect: cursor moves towards center of element + small offset towards mouse
      const rect = hoveredEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = { x: clientX - centerX, y: clientY - centerY };

      // Stretch/scale based on distance
      const scaleX = transform(Math.abs(distance.x), [0, rect.width / 2], [1, 1.3]);
      const scaleY = transform(Math.abs(distance.y), [0, rect.height / 2], [1, 0.8]);
      animate(cursor.current, { scaleX, scaleY }, { type: 'spring', stiffness: 300, damping: 20 });

      // Rotate cursor slightly
      const angle = Math.atan2(distance.y, distance.x);
      animate(cursor.current, { rotate: `${angle}rad` }, { duration: 0 });

      mouseX.set(centerX - cursorHoverSize / 2 + distance.x * 0.1);
      mouseY.set(centerY - cursorHoverSize / 2 + distance.y * 0.1);

      trailX.set(centerX - 20);
      trailY.set(centerY - 20);
    } else {
      // Normal cursor follows mouse
      mouseX.set(clientX - cursorBaseSize / 2);
      mouseY.set(clientY - cursorBaseSize / 2);
      trailX.set(clientX - 20);
      trailY.set(clientY - 20);

      animate(cursor.current, { scaleX: 1, scaleY: 1, rotate: 0 }, { type: 'spring', stiffness: 300 });
    }
  };

  const handleMouseEnter = (e) => setHoveredEl(e.currentTarget);
  const handleMouseLeave = () => setHoveredEl(null);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    // All hoverable elements for sticky effect
    const interactive = document.querySelectorAll('a, button, [data-cursor]');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [hoveredEl]);

  return (
    <>
      {/* Trail */}
      <motion.div
        ref={trail}
        style={{
          left: smoothTrailX,
          top: smoothTrailY,
        }}
        className="fixed pointer-events-none z-40 w-10 h-10 bg-zinc-500/30 rounded-full blur-2xl"
      />

      {/* Main Cursor */}
      <motion.div
        ref={cursor}
        style={{
          left: smoothX,
          top: smoothY,
        }}
        animate={{
          width: hoveredEl ? cursorHoverSize : cursorBaseSize,
          height: hoveredEl ? cursorHoverSize : cursorBaseSize,
        }}
        className="fixed pointer-events-none z-50 bg-zinc-500 rounded-full"
      />
    </>
  );
};

export default CustomCursor;