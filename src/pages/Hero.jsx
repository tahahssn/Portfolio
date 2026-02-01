import React from 'react'
import Video from '../components/home/Video'
import Paragraph from '../components/home/Paragraph'
import Title from '../components/home/Title'

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Paragraph/>
      <Title/>
      <Video/>
    </div>
  )
}

export default Home