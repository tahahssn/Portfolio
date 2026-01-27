import React from "react";
import { Link } from "react-router-dom";

const Button = ({ 
  text = "Let's Collaborate", 
  to = "mailto:tahahassan699@gmail.com",
  onClick,
  className = "",
  isExternal = false // For external links
}) => {
  
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // If it's an external link or no "to" prop, use regular <a> tag
  if (isExternal || to.startsWith("http") || to === "#") {
    return (
      <a
        href={to}
        onClick={handleClick}
        className={`group relative inline-block border-2 border-white bg-transparent px-2 py-2 text-center font-bold uppercase tracking-wider text-white transition-all duration-300 ease-in-out hover:bg-white ${className}`}
      >
        {/* Top key */}
        <span className="absolute left-2.5 top-[-2px] h-0.5 w-6 bg-[#212121] transition-all duration-500 ease-out group-hover:left-[-2px] group-hover:w-0" />
        
        {/* Button text */}
        <span className="relative block pl-4 text-left text-xs leading-normal transition-all duration-300 ease-in-out group-hover:pl-6 group-hover:text-black">
          {text}
        </span>
        
        {/* Bottom key 1 */}
        <span className="absolute bottom-[-2px] right-7 h-0.5 w-6 bg-[#212121] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0" />
        
        {/* Bottom key 2 */}
        <span className="absolute bottom-[-2px] right-2.5 h-0.5 w-2.5 bg-[#212121] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0" />
        
        {/* Left line (before pseudo-element) */}
        <span className="absolute left-3 top-1/2 h-0.5 w-1.5 -translate-y-1/2 bg-white transition-all duration-300 ease-linear group-hover:w-3.5 group-hover:bg-black" />
      </a>
    );
  }

  // For internal navigation, use React Router Link
  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`group relative inline-block border-2 border-white bg-transparent px-2 py-2 text-center font-bold uppercase tracking-wider text-white transition-all duration-300 ease-in-out hover:bg-white ${className}`}
    >
      {/* Top key */}
      <span className="absolute left-2.5 top-[-2px] h-0.5 w-6 bg-[#212121] transition-all duration-500 ease-out group-hover:left-[-2px] group-hover:w-0" />
      
      {/* Button text */}
      <span className="relative block pl-4 text-left text-xs leading-normal transition-all duration-300 ease-in-out group-hover:pl-6 group-hover:text-black">
        {text}
      </span>
      
      {/* Bottom key 1 */}
      <span className="absolute bottom-[-2px] right-7 h-0.5 w-6 bg-[#212121] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0" />
      
      {/* Bottom key 2 */}
      <span className="absolute bottom-[-2px] right-2.5 h-0.5 w-2.5 bg-[#212121] transition-all duration-500 ease-out group-hover:right-0 group-hover:w-0" />
      
      {/* Left line (before pseudo-element) */}
      <span className="absolute left-3 top-1/2 h-0.5 w-1.5 -translate-y-1/2 bg-white transition-all duration-300 ease-linear group-hover:w-2.5 group-hover:bg-black" />
    </Link>
  );
};

export default Button;