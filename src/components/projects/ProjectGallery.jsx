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
      className="group w-full flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-24 py-8 md:py-12 border-t border-gray-300 cursor-pointer transition-all duration-300 hover:opacity-60 last:border-b"
      onMouseEnter={() => onHover && onHover(index)}
      onMouseLeave={() => onHover && onHover(null)}
    >
      <div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium mb-2 transition-transform duration-300 group-hover:-translate-x-2">
          {project.title}
        </h2>
        <p className="text-gray-600">{project.description || "Design & Development"}</p>
      </div>
      <div className="text-right">
        <span className="text-sm text-gray-500 block mb-1">Year</span>
        <span className="text-lg font-medium">{project.year || new Date().getFullYear()}</span>
      </div>
    </div>
  );
}

// ==================== PROJECT GALLERY ====================
export function ProjectGallery({ projects = [], activeIndex = null }) {
  const containerRef = useRef(null);
  const cursorRef = useRef(null);
  const labelRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mouse follow effect (no GSAP needed)
  useEffect(() => {
    const moveElements = (e) => {
      if (!containerRef.current || !cursorRef.current || !labelRef.current) return;
      
      const { clientX, clientY } = e;
      
      containerRef.current.style.left = `${clientX}px`;
      containerRef.current.style.top = `${clientY}px`;
      
      cursorRef.current.style.left = `${clientX}px`;
      cursorRef.current.style.top = `${clientY}px`;
      
      labelRef.current.style.left = `${clientX}px`;
      labelRef.current.style.top = `${clientY}px`;
    };

    window.addEventListener('mousemove', moveElements);
    return () => window.removeEventListener('mousemove', moveElements);
  }, []);

  // Slider animation
  const sliderPosition = activeIndex !== null ? activeIndex * -100 : 0;

  return (
    <>
      {/* Modal with images */}
      <motion.div
        ref={containerRef}
        className="fixed w-[280px] h-[200px] sm:w-[320px] sm:h-[240px] md:w-[360px] md:h-[280px] bg-white rounded-lg shadow-2xl overflow-hidden pointer-events-none z-[100] transform -translate-x-1/2 -translate-y-1/2"
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
              className="min-w-full min-h-full flex items-center justify-center p-4"
              style={{ backgroundColor: project.color || '#f3f4f6' }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-contain rounded"
                  loading="lazy"
                />
              ) : (
                <div className="text-center p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Custom cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed w-16 h-16 bg-blue-500 rounded-full pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        initial={{ scale: 0 }}
        animate={activeIndex !== null ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Cursor label */}
      <motion.div
        ref={labelRef}
        className="fixed text-white text-sm font-medium pointer-events-none z-[99] transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={activeIndex !== null ? { opacity: 1 } : { opacity: 0 }}
      >
        View
      </motion.div>
    </>
  );
}

// ==================== MAIN COMPONENT ====================
export function ProjectsShowcase({ projectList = [] }) {
  const [activeProject, setActiveProject] = useState(null);

  // Default projects if none provided
  const projects = projectList.length > 0 ? projectList : [
    {
      title: "Eco Marketplace",
      description: "Sustainable e-commerce platform",
      year: "2024",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop",
      color: "#10b981"
    },
    {
      title: "AI Analytics",
      description: "Real-time data visualization",
      year: "2024",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      color: "#3b82f6"
    },
    {
      title: "Fitness App",
      description: "Personalized workout platform",
      year: "2023",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
      color: "#8b5cf6"
    },
    {
      title: "Urban Design",
      description: "Smart city planning tool",
      year: "2023",
      image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&h=300&fit=crop",
      color: "#f59e0b"
    }
  ];

  return (
    <section className="min-h-screen bg-black py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-white">
            Featured Projects
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {/* Interactive showcase with smooth hover animations and visual previews */}
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-0">
          {projects.map((project, index) => (
            <ProjectItem
              key={index}
              project={project}
              index={index}
              onHover={setActiveProject}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">{projects.length}</div>
            <div className="text-gray-600">Total Projects</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
            <div className="text-gray-600">Client Satisfaction</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
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

// Or use with custom projects:
/*
export function MyPortfolio() {
  const myProjects = [
    {
      title: "My Awesome App",
      description: "Built with React & Node.js",
      year: "2024",
      image: "/path/to/image.jpg",
      color: "#ff6b6b"
    },
    // ... more projects
  ];

  return <ProjectsShowcase projectList={myProjects} />;
}
*/