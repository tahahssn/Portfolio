// src/components/SmoothScrolling.jsx
import { useEffect } from 'react';

// Import lenis directly (not dynamically)
import Lenis from 'lenis';

export default function SmoothScrolling({ children }) {
  useEffect(() => {
    let lenisInstance;
    let animationFrameId;

    const initSmoothScroll = () => {
      try {
        // Direct initialization
        lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
          infinite: false,
        });

        // Animation frame
        const raf = (time) => {
          lenisInstance.raf(time);
          animationFrameId = requestAnimationFrame(raf);
        };
        animationFrameId = requestAnimationFrame(raf);

        // Store globally for access
        window.lenis = lenisInstance;

        console.log('Lenis initialized successfully');

      } catch (error) {
        console.error('Lenis initialization error:', error);
        // Fallback to normal scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    };

    initSmoothScroll();

    // Cleanup
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (lenisInstance) {
        lenisInstance.destroy();
      }
      if (window.lenis) {
        delete window.lenis;
      }
    };
  }, []);

  return <>{children}</>;
}