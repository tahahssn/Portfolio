import { div } from 'framer-motion/client'
import React from 'react'

const Paragraph = () => {
  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10'>
        <div className='leading-8 text-center'>
            <h1 className='text-white font-[doner] text-5xl'>Hi! I am Taha Hassan</h1>
            <h1 className='text-white font-[doner] text-2xl'>AI/ML Enthusiast & Frontend Developer</h1>
        </div>
    </div>
  )
}

export default Paragraph