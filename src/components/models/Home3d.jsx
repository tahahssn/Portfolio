import React from 'react'

const Home3d = () => {
  return (
    <div style={{ width: '1080px', height: '1080px', position: 'relative' }}>
      <Orb
        hue={0}
        hoverIntensity={0.5}
        rotateOnHover
        forceHoverState={false}
      />
    </div>
  )
}

export default Home3d