import React from 'react'

const Video = () => {
  return (
    <div className='h-full w-full'>
        <video className='h-full w-full object-cover' aria-hidden="true" autoPlay loop muted src="../../../video4.mp4"></video>
    </div>
  )
}

export default Video