import React from 'react'
import Backdrop from '../components/home/Backdrop'

const Home = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Backdrop/>
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <h1 className="text-6xl font-bold">Home Page</h1>
      </div>
    </div>
  )
}

export default Home