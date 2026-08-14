import { useEffect, useState } from "react";

import Navbar from "./components/navigation/Navbar";
import Footer from "./components/common/Footer";
import Preloader from "./components/common/Preloader";

import Hero from "./pages/Hero";
import Projects from "./pages/Projects";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2500;
    const step = 50;

    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += step;

      const value = Math.min(
        (elapsed / duration) * 100,
        100
      );

      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
      }
    }, step);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      {/* =========================================
          WEBSITE
      ========================================== */}

      <div className="min-h-screen">
        <Navbar />

        <main>
          <section
            id="home"
            className="min-h-screen overflow-hidden"
          >
            <Hero />
          </section>

          <section
            id="projects"
            className="min-h-screen overflow-hidden"
          >
            <Projects />
          </section>

          <section
            id="contact"
            className="min-h-screen overflow-hidden"
          >
            <Footer />
          </section>
        </main>
      </div>

      {/* =========================================
          PRELOADER + EXIT ANIMATION
      ========================================== */}

      {isLoading && (
        <Preloader
          percentage={progress}
          onComplete={handlePreloaderComplete}
        />
      )}
    </>
  );
}

export default App;