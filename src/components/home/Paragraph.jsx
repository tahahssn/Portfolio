import { div } from 'framer-motion/client'
import React from 'react'
import Herobutton from '../home/Herobutton'

const Paragraph = () => {
  return (
    <div className='absolute bottom-6 right-10 z-20 w-80'>
          <p className='text-white font-[doner] text-xs tracking-widest mb-1'>Software engineering student passionate about AI & Machine Learning, with frontend development experience, building impactful, data-driven, and well-designed solutions.</p>
          <h1 className='text-white font-[Dangerous] text-sm tracking-widest mb-2'>Move people, not just screens.</h1>
          <Herobutton/>
    </div>
  )
}

export default Paragraph