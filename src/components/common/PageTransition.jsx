import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageTransition = ({ children }) => {
  const location = useLocation()
  const [isAnimating, setIsAnimating] = useState(false)
  const [previousPath, setPreviousPath] = useState('')
  const stairParentRef = useRef(null)
  const pageRef = useRef(null)
  const contentRef = useRef(null)
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)

  // Listen to navbar state via custom event
  useEffect(() => {
    const handleNavbarChange = (e) => {
      setIsNavbarOpen(e.detail.isOpen)
    }

    // Listen for navbar state changes
    window.addEventListener('navbar-state', handleNavbarChange)

    return () => {
      window.removeEventListener('navbar-state', handleNavbarChange)
    }
  }, [])

  // Reset scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  useGSAP(() => {
    // Only animate if path changed and not first load
    if (previousPath === location.pathname || previousPath === '') {
      setPreviousPath(location.pathname)
      return
    }

    // Check if navbar is open - if yes, wait for it to close
    const checkNavbarAndAnimate = () => {
      if (isNavbarOpen) {
        // Wait 50ms and check again
        setTimeout(checkNavbarAndAnimate, 50)
        return
      }

      // Now start the animation
      setIsAnimating(true)
      
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onStart: () => {
          // Ensure content is visible before hiding
          gsap.set(contentRef.current, { opacity: 1 })
        },
        onComplete: () => {
          setIsAnimating(false)
          setPreviousPath(location.pathname)
        }
      })

      // 1. Show stairs IMMEDIATELY (no delay)
      tl.set(stairParentRef.current, { 
        display: 'flex',
        opacity: 1 
      })

      // 2. Stairs rise up
      tl.fromTo('.stair', 
        { 
          height: '0%',
          y: '100%'
        },
        { 
          height: '100%',
          y: '0%',
          stagger: {
            each: 0.05,
            from: "start"
          },
          duration: 0.4
        }
      )

      // 3. Hide previous page content (AFTER stairs cover)
      tl.to(contentRef.current, {
        opacity: 0,
        duration: 0.1
      }, "-=0.1")

      // 4. Stairs move down to reveal new page
      tl.to('.stair', {
        y: '100%',
        stagger: {
          each: 0.05,
          from: "end"
        },
        duration: 0.5
      })

      // 5. Hide stairs
      tl.to(stairParentRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          gsap.set(stairParentRef.current, { display: 'none' })
        }
      })

      // 6. Show new page content IMMEDIATELY after stairs start moving down
      tl.fromTo(contentRef.current,
        { opacity: 0, scale: 1 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        },
        "-=0.4" // Start BEFORE stairs completely move down
      )

      // Reset stairs position for next animation
      tl.set('.stair', {
        y: '0%',
        height: '100%'
      })
    }

    // Start the check
    checkNavbarAndAnimate()

  }, [location.pathname])

  // Handle initial page load (after preloader)
  useEffect(() => {
    const hasPreloaderCompleted = sessionStorage.getItem('preloaderCompleted')
    
    if (hasPreloaderCompleted) {
      // Show content immediately if preloader already completed
      gsap.set(contentRef.current, { opacity: 1 })
    } else {
      // Mark preloader as completed
      sessionStorage.setItem('preloaderCompleted', 'true')
      
      // Initial fade in for home page
      gsap.fromTo(contentRef.current,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out"
        }
      )
    }
  }, [])

  return (
    <>
      {/* Stairs Transition Overlay */}
      <div
        ref={stairParentRef}
        className="fixed inset-0 z-[9998] hidden opacity-0 pointer-events-none bg-black"
      >
        {/* 5 stairs covering the screen */}
        <div className="h-full w-full flex">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="stair h-0 w-1/5 bg-gradient-to-b from-[#ffffff] to-[#ffffff] opacity-90"
              style={{ 
                transform: 'translateY(100%)',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.3)'
              }}
            />
          ))}
        </div>
      </div>

      {/* Page Content Container */}
      <div 
        ref={pageRef} 
        className={`relative ${isAnimating ? 'overflow-hidden' : ''}`}
      >
        <div ref={contentRef} className="opacity-100">
          {children}
        </div>
      </div>
    </>
  )
}

export default PageTransition