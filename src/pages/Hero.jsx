import React from 'react'
import Paragraph from '../components/home/Paragraph'
import Title from '../components/home/Title'
import Backdrop from '../components/home/Backdrop'

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Paragraph/>
      <Title/>
      <Backdrop/>
    </div>
  )
}

export default Home