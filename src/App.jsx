import { lazy, Suspense, useState } from "react";

import Navbar from "./components/navigation/Navbar";
import Preloader from "./components/common/Preloader";
import CustomCursor from "./components/common/CustomCursor";
import Hero from "./pages/Hero";

const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Footer = lazy(() => import("./components/common/Footer"));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    document.body.style.overflow = "";
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen">
        <Navbar />

        <main>
          {/* HERO */}

          <section
            id="home"
            className="min-h-screen overflow-hidden"
          >
            <Hero />
          </section>

          {/* ABOUT */}

          <section
            id="about"
            className="relative min-h-screen overflow-visible"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
              <About />
            </Suspense>
          </section>

          {/* PROJECTS */}

          <section
            id="projects"
            className="min-h-screen overflow-hidden"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
              <Projects />
            </Suspense>
          </section>

          {/* CONTACT */}

          <section
            id="contact"
            className="min-h-screen overflow-hidden"
          >
            <Suspense fallback={<div className="min-h-screen bg-[#080808]" />}>
              <Footer />
            </Suspense>
          </section>
        </main>
      </div>

      {isLoading && (
        <Preloader
          onComplete={handlePreloaderComplete}
        />
      )}
    </>
  );
}

export default App;