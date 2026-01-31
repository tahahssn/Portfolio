import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HorizontalSection = () => {
  const horizontalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    if (!horizontalRef.current || !contentRef.current) return;

    const section = horizontalRef.current;
    const content = contentRef.current;

    // Calculate horizontal scroll distance
    const getScrollDistance = () => {
      return content.scrollWidth - window.innerWidth;
    };

    // Horizontal scroll animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: true,
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(content, {
      x: () => -getScrollDistance(),
      ease: "none"
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={horizontalRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <div 
        ref={contentRef}
        className="flex h-full w-max"
      >
        {/* Panel 1 */}
        <div className="flex h-full w-screen items-center justify-center bg-black">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white">Horizontal Scroll</h2>
            <p className="mt-4 text-xl text-gray-400">Scroll right →</p>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="flex h-full w-screen items-center justify-center bg-gray-900">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white">Smooth Animation</h2>
            <p className="mt-4 text-xl text-gray-400">Powered by GSAP</p>
          </div>
        </div>

        {/* Panel 3 */}
        <div className="flex h-full w-screen items-center justify-center bg-gray-800">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white">Pure CSS</h2>
            <p className="mt-4 text-xl text-gray-400">Tailwind styling</p>
          </div>
        </div>

        {/* Panel 4 */}
        <div className="flex h-full w-screen items-center justify-center bg-gray-900">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white">Responsive</h2>
            <p className="mt-4 text-xl text-gray-400">Works on all devices</p>
          </div>
        </div>

        {/* Panel 5 */}
        <div className="flex h-full w-screen items-center justify-center bg-black">
          <div className="text-center">
            <h2 className="text-6xl font-bold text-white">End</h2>
            <p className="mt-4 text-xl text-gray-400">← Keep scrolling</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalSection;