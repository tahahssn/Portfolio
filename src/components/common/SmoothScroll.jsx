// src/components/SmoothScroll.jsx
import { ReactLenis } from 'lenis/react'

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,          // Lower = more floaty/smooth (0.05 is ultra-smooth)
        duration: 1.5,        // Longer easing curve
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 0.8, // Slightly reduces wheel sensitivity
        touchMultiplier: 2,   // Better feel on mobile
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential ease
      }}
    >
      {children}
    </ReactLenis>
  )
}

export default SmoothScroll