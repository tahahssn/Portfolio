import React from 'react'
import Backdrop from '../components/home/Backdrop'
import Video from '../components/home/Video'
import Paragraph from '../components/home/Paragraph'
import Home3d from '../components/models/Home3d'
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