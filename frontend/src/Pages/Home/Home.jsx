import React from 'react'
import Sidebar from '../../Components/Home/Sidebar'
import MessagePanel from '../../Components/Home/MessagePanel'

const Home = () => {
  return (
    <>
      <div className='flex items-center gap-1  w-screen h-dvh p-3 shadow-lg  '>

        <Sidebar/>
        <MessagePanel/>
      
      </div>
    </>
  )
}

export default Home
