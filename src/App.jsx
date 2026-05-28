import { useState, useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Projects from "./pages/Projects";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15; // Increment by random amount for natural feel
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        // Small delay at 100% for visual satisfaction
        setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = 'auto';
        }, 800);
      }
      setLoadProgress(Math.min(progress, 100));
    }, 200);

    // Track actual resource loading
    const resources = [];
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'resource') {
          resources.push(entry);
          // You can use this to make progress more accurate
          console.log(`Loaded: ${entry.name}`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });

    // Clean up
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {isLoading && <Preloader />}
      
      <div className={`min-h-screen ${isLoading ? 'overflow-hidden' : ''}`}>
        <Navbar />
        <main>
          <section id="home" className="min-h-screen overflow-hidden">
            <Hero />
          </section>
          
          {/* <section id="about" className="min-h-screen overflow-hidden">
            <About />
          </section> */}
          <section id="projects" className="min-h-screen overflow-hidden">
            <Projects />
          </section>
          
          <section id="contact" className="min-h-screen overflow-hidden">
            <Footer/>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;