// components/InfiniteTicker.jsx
import React, { useEffect, useRef } from "react";
import DiamondIcon from "./Diamond";

const Ticker = () => {
  const tickerRef = useRef(null);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const pixelsPerSecond = useRef(0);

  // Items array
  const items = [
    "AI Engineer",
    "Frontend Fanatic",
    "Creative Coder",
    "Tech Explorer",
    "Data Driver",
  ];

  // Duplicate items 4 times for seamless looping
  const duplicatedItems = [...items, ...items, ...items, ...items];

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // Measure the width of one complete set of items
    const singleSetWidth = ticker.scrollWidth / 4;

    // Calculate speed: complete one set in 25 seconds
    // (You can change this to 20 or 30 as needed)
    const durationInSeconds = 25;
    pixelsPerSecond.current = singleSetWidth / durationInSeconds;

    let currentPosition = 0;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime = (timestamp - startTimeRef.current) / 1000; // in seconds
      const distance = elapsedTime * pixelsPerSecond.current;

      // Reset when we've scrolled past one complete set
      if (distance >= singleSetWidth) {
        currentPosition = distance % singleSetWidth;
        startTimeRef.current = timestamp;
      } else {
        currentPosition = distance;
      }

      // Apply transform
      ticker.style.transform = `translateX(-${currentPosition}px)`;

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full overflow-hidden py-5 bg-purple-800">
      {/* Outer container with subtle background (optional) */}
      <div className="relative">
        {/* Ticker container */}
        <div className="overflow-hidden">
          <ul
            ref={tickerRef}
            className="flex items-center gap-2 m-0 p-0 list-none"
            style={{ willChange: "transform" }}
          >
            {duplicatedItems.map((item, index) => (
              <li key={index} className="flex-shrink-0">
                <div className="flex items-center gap-3">
                  {/* Diamond Icon */}
                  <div className="flex items-center justify-center">
                    <DiamondIcon />
                  </div>

                  {/* Text */}
                  <h4
                    className="font-['Formula_Condensed_Bold',_Impact,_sans-serif'] text-[30px] uppercase leading-[110%] tracking-[0.64px] text-[#FFCCDE] whitespace-nowrap m-0"
                    style={{
                      fontFamily:
                        '"Formula Condensed Bold", Impact, "Arial Narrow", sans-serif',
                    }}
                  >
                    {item}
                  </h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ticker;