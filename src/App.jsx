import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/navigation/Navbar";
import Preloader from "./components/common/Preloader";
import Hero from "./pages/Hero";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import CustomCursor from "./components/common/CustomCursor";
import PageTransition from "./components/common/PageTransition"

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4500); // MATCH PRELOADER DURATION

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {isLoading && <Preloader />}
      
      <div className={`min-h-screen ${isLoading ? 'overflow-hidden' : ''}`}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <PageTransition>
              <Hero />
            </PageTransition>
          }/>
          <Route path="/about" element={
            <PageTransition>
              <About />
            </PageTransition>
          }/>
          <Route path="/skills" element={
            <PageTransition>
              <Skills />
            </PageTransition>
            }/>
          <Route path="/projects" element={
            <PageTransition>
              <Projects />
            </PageTransition>
            }/>
          <Route path="/contact" element={
            <PageTransition>
                <Contact />
            </PageTransition>
            }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;