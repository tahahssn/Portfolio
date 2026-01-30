import { useState, useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Preloader from "./components/common/Preloader";
import CustomCursor from "./components/common/CustomCursor";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 4500);

    return () => clearTimeout(timer);
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
          
          <section id="about" className="min-h-screen overflow-hidden">
            <About />
          </section>
          
          <section id="skills" className="min-h-screen overflow-hidden">
            <Skills />
          </section>
          
          <section id="projects" className="min-h-screen overflow-hidden">
            <Projects />
          </section>
          
          <section id="contact" className="min-h-screen overflow-hidden">
            <Contact />
          </section>
        </main>
      </div>
    </>
  );
}

export default App;