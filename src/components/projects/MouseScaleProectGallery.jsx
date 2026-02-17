'use client';
import { useRef, useState, useEffect } from 'react';

export default function MouseScaleProectGallery({ projects, reversed = false }) {
  const firstImage = useRef(null);
  const secondImage = useRef(null);
  let requestAnimationFrameId = null;
  let xPercent = reversed ? 100 : 0;
  let currentXPercent = reversed ? 100 : 0;
  const speed = 0.15;
  
  const manageMouseMove = (e) => {
    const { clientX } = e;
    xPercent = (clientX / window.innerWidth) * 100;
    
    if(!requestAnimationFrameId){
      requestAnimationFrameId = window.requestAnimationFrame(animate);
    }
  }

  const animate = () => {
    const xPercentDelta = xPercent - currentXPercent;
    currentXPercent = currentXPercent + (xPercentDelta * speed);
    
    const firstImagePercent = 66.66 - (currentXPercent * 0.33);
    const secondImagePercent = 33.33 + (currentXPercent * 0.33);
    
    if (firstImage.current && secondImage.current) {
      firstImage.current.style.width = `${firstImagePercent}%`;
      secondImage.current.style.width = `${secondImagePercent}%`;
    }
    
    if(Math.round(xPercent) === Math.round(currentXPercent)){
      window.cancelAnimationFrame(requestAnimationFrameId);
      requestAnimationFrameId = null;
    } else {
      requestAnimationFrameId = window.requestAnimationFrame(animate);
    }
  }

  // Clean up animation frame on unmount
  useEffect(() => {
    return () => {
      if (requestAnimationFrameId) {
        window.cancelAnimationFrame(requestAnimationFrameId);
      }
    };
  }, []);

  // Click handler to redirect to project link
  const handleImageClick = (projectLink) => {
    if (projectLink) {
      window.open(projectLink, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div 
      onMouseMove={manageMouseMove} 
      className="flex mt-[10vh] h-[45vw] cursor-pointer"
    >
      {/* First Image Container */}
      <div 
        ref={firstImage} 
        className="h-full overflow-hidden"
        style={{ width: reversed ? '33.33%' : '66.66%' }}
      >
        <div 
          className="relative pb-[66%] h-0 cursor-pointer"
          onClick={() => handleImageClick(projects[0].link)}
        >
          <img 
            src={`/images/${projects[0].src}`}
            alt={projects[0].name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-[10px] text-base">
          <h2 className="text-[1.2em] mb-1 mt-0 font-normal">{projects[0].name}</h2>
          <p className="text-[1em] m-0 text-gray-400">{projects[0].description}</p>
          <p className="text-[1em] m-0 text-gray-300">{projects[0].year}</p>
        </div>
      </div>

      {/* Second Image Container */}
      <div 
        ref={secondImage} 
        className="h-full overflow-hidden"
        style={{ width: reversed ? '66.66%' : '33.33%' }}
      >
        <div 
          className="relative pb-[66%] h-0 cursor-pointer"
          onClick={() => handleImageClick(projects[1].link)}
        >
          <img 
            src={`/images/${projects[1].src}`}
            alt={projects[1].name}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-[10px] text-base">
          <h2 className="text-[1.2em] mb-1 mt-0 font-normal">{projects[1].name}</h2>
          <p className="text-[1em] m-0 text-gray-400">{projects[1].description}</p>
          <p className="text-[1em] m-0 text-gray-300">{projects[1].year}</p>
        </div>
      </div>
    </div>
  );
}