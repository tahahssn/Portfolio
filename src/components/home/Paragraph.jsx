import React from 'react'
import Herobutton from '../home/Herobutton'

const Paragraph = () => {
  return (
    <div className='absolute bottom-6 right-10 z-20 w-80 max-md:bottom-4 max-md:right-5 max-md:w-64 max-sm:bottom-3 max-sm:right-1 max-sm:w-36'>
          <p className='text-white font-[doner] text-xs tracking-widest mb-1 max-md:text-[10px] max-sm:text-[8px] max-sm:leading-snug'>Software engineering student passionate about AI & Machine Learning, with frontend development experience, building impactful, data-driven, and well-designed solutions.</p>
          <h1 className='text-white font-[Dangerous] text-sm tracking-widest mb-2 max-md:text-xs max-sm:text-[8px] max-sm:leading-snug'>Move people, not just screens.</h1>
          <Herobutton/>
    </div>
  )
}

export default Paragraph