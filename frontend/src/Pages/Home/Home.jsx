import React from 'react'
import Sidebar from '../../Components/Home/Sidebar'
import MessagePanel from '../../Components/Home/MessagePanel'

const Home = () => {
  return (
    <>
      <div className='flex items-center w-screen h-dvh '>

        <Sidebar/>
        <MessagePanel/>
      
      </div>
    </>
  )
}

export default Home
