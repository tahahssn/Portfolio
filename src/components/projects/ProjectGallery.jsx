import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Animation config
const modalAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  open: { scale: 1, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  close: { scale: 0, transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
};

// ==================== PROJECT ITEM ====================
export function ProjectItem({ project, index, onHover }) {
  return (
    <div
      className="group w-full flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-6 md:py-8 border-b border-zinc-700 cursor-pointer transition-all duration-300 hover:bg-white/5"
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      <div className="flex-1">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white mb-1">
          {project.title}
        </h2>
        <p className="text-[#b4c3d9] text-sm">{project.description}</p>
      </div>
      <div className="text-right">
        <span className="text-xs text-[#b4c3d9] block mb-1">Year</span>
        <span className="text-lg font-medium text-white">{project.year}</span>
      </div>
    </div>
  );
}

// ==================== PROJECT GALLERY ====================
export function ProjectGallery({ projects = [], activeIndex = null }) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mouse follow effect
  useEffect(() => {
    const moveElements = (e) => {
      if (!containerRef.current || !cursorRef.current) return;
      
      const { clientX, clientY } = e;
      
      containerRef.current.style.left = `${clientX}px`;
      containerRef.current.style.top = `${clientY}px`;
      
      cursorRef.current.style.left = `${clientX}px`;
      cursorRef.current.style.top = `${clientY}px`;
    };

    window.addEventListener('mousemove', moveElements);
    return () => window.removeEventListener('mousemove', moveElements);
  }, []);

  // Slider animation
  const sliderPosition = activeIndex !== null ? activeIndex * -100 : 0;

  return (
    <>
      {/* Modal with images - Clean dark theme */}
      <motion.div
        ref={containerRef}
        className="fixed w-[280px] h-[180px] sm:w-[320px] sm:h-[200px] md:w-[360px] md:h-[220px] bg-black border border-[#94bcf7] rounded-lg shadow-lg overflow-hidden pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
        initial="initial"
        animate={activeIndex !== null ? "open" : "close"}
        variants={modalAnimation}
      >
        <div 
          className="absolute inset-0 flex transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ transform: `translateY(${sliderPosition}%)` }}
        >
          {projects.map((project, index) => (
            <div 
              key={index}
              className="min-w-full min-h-full flex items-center justify-center p-4 bg-gradient-to-br from-black to-zinc-900"
            >
              <div className="text-center p-4">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-[#b4c3d9] mb-4">{project.description}</p>
                <div className="flex items-center justify-center space-x-2">
                  {project.tags?.map((tag, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 text-xs bg-[#94bcf7]/20 text-[#94bcf7] rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed w-12 h-12 bg-[#94bcf7] rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        initial={{ scale: 0 }}
        animate={activeIndex !== null ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}

// ==================== MAIN COMPONENT ====================
export function ProjectsShowcase({ projectList = [] }) {
  const [activeProject, setActiveProject] = useState(null);

  // Clean projects with your theme
  const projects = projectList.length > 0 ? projectList : [
    {
      title: "E-Commerce Platform",
      description: "Full-stack online marketplace with AI recommendations",
      year: "2024",
      tags: ["React", "Node.js", "MongoDB", "AI"]
    },
    {
      title: "AI Analytics Dashboard",
      description: "Real-time data visualization with machine learning insights",
      year: "2024",
      tags: ["Next.js", "Python", "TensorFlow", "D3.js"]
    },
    {
      title: "Fitness Tracking App",
      description: "Mobile app with personalized workout plans & progress tracking",
      year: "2023",
      tags: ["React Native", "Firebase", "HealthKit"]
    },
    {
      title: "Smart City Platform",
      description: "Urban planning tool with IoT integration & data analytics",
      year: "2023",
      tags: ["Vue.js", "IoT", "AWS", "Mapbox"]
    }
  ];

  return (
    <section className="min-h-screen bg-black py-12 md:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-[doner] font-bold tracking-wider mb-4 text-white">
            Projects
          </h1>
          <p className="text-[#b4c3d9] text-lg max-w-2xl mx-auto">
            Interactive showcase of my latest work with smooth hover animations
          </p>
        </div>

        {/* Projects List */}
        <div className="border-t border-zinc-700">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              project={project}
              index={index}
              onHover={setActiveProject}
            />
          ))}
        </div>

        {/* Stats - Clean theme version */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-br from-black to-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-3xl font-bold text-[#94bcf7] mb-2">{projects.length}+</div>
            <div className="text-[#b4c3d9]">Projects Completed</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-black to-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-3xl font-bold text-[#94bcf7] mb-2">100%</div>
            <div className="text-[#b4c3d9]">Client Satisfaction</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-black to-zinc-900 border border-zinc-800 rounded-xl">
            <div className="text-3xl font-bold text-[#94bcf7] mb-2">24/7</div>
            <div className="text-[#b4c3d9]">Available for Work</div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <ProjectGallery 
        projects={projects} 
        activeIndex={activeProject} 
      />
    </section>
  );
}

// ==================== SIMPLE USAGE ====================
export default function App() {
  return <ProjectsShowcase />;
}