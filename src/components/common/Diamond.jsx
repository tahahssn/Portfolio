// components/DiamondIcon.jsx
import React from "react";

const Diamond = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
    >
      <rect
        x="7"
        y="1"
        width="2"
        height="14"
        rx="50"
        fill="currentColor"
        className="text-[#FFCCDE]"
      />
      <rect
        x="1"
        y="7"
        width="14"
        height="2"
        rx="50"
        fill="currentColor"
        className="text-[#FFCCDE]"
      />
    </svg>
  );
};

export default Diamond;