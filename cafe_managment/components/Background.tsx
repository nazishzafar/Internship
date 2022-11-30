import React, { ReactNode } from 'react'
import Navbar from './Navbar'

const Background = () => {
  return (
    <div>
    <div className='w-full h-screen  lg:bg-cover bg-contain bg-no-repeat bg-fixed custom-img '>
      <Navbar></Navbar>
    </div>


  
   
    </div>
  )
}

export default Background