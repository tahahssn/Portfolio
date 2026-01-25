import { useEffect, useState } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // Hide cursor on mobile/touch devices
    if ("ontouchstart" in window) return;

    const mouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setHidden(false);
    };

    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);
    const mouseLeave = () => setHidden(true);
    const mouseEnter = () => setHidden(false);

    // Check for link hovers
    const handleLinkHover = () => setLinkHovered(true);
    const handleLinkLeave = () => setLinkHovered(false);

    // Add event listeners to all links/buttons
    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach(link => {
      link.addEventListener("mouseenter", handleLinkHover);
      link.addEventListener("mouseleave", handleLinkLeave);
    });

    // Main event listeners
    document.addEventListener("mousemove", mouseMove);
    document.addEventListener("mousedown", mouseDown);
    document.addEventListener("mouseup", mouseUp);
    document.addEventListener("mouseleave", mouseLeave);
    document.addEventListener("mouseenter", mouseEnter);

    return () => {
      document.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mousedown", mouseDown);
      document.removeEventListener("mouseup", mouseUp);
      document.removeEventListener("mouseleave", mouseLeave);
      document.removeEventListener("mouseenter", mouseEnter);
      
      links.forEach(link => {
        link.removeEventListener("mouseenter", handleLinkHover);
        link.removeEventListener("mouseleave", handleLinkLeave);
      });
    };
  }, []);

  // Hide on mobile
  if ("ontouchstart" in window) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed w-4 h-4 rounded-full bg-[#94bcf7] pointer-events-none z-[9999] transition-transform duration-100 ease-out ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
          mixBlendMode: "difference"
        }}
      />

      {/* Outer ring */}
      <div
        className={`fixed w-10 h-10 rounded-full border border-[#b4c3d9] pointer-events-none z-[9998] transition-transform duration-100 ease-out ${
          hidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${linkHovered ? 1.5 : 1})`,
          borderWidth: linkHovered ? "1px" : "1px"
        }}
      />

      {/* Click effect */}
      {clicked && (
        <div
          className="fixed w-12 h-12 rounded-full border-2 border-[#94bcf7] pointer-events-none z-[9997] animate-ping"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            transform: "translate(-50%, -50%)"
          }}
        />
      )}

      {/* Trail effect (optional) */}
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="fixed w-2 h-2 rounded-full bg-[#94bcf7] pointer-events-none z-[9996] opacity-20"
          style={{
            left: `${position.x - i * 2}px`,
            top: `${position.y - i * 2}px`,
            transform: "translate(-50%, -50%)",
            animationDelay: `${i * 50}ms`
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;