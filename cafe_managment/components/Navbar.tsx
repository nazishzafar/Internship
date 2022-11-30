import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import {FaBars,FaBackspace} from 'react-icons/fa'
interface props{
  open:Boolean
  setOpen:any
  children:ReactNode
}
function MobileView({open, setOpen}:props){
  return (
    <div className={` flex absolute top-0 left-0 w-screen bg-[#8d6b54] transform ${open?"-translate-y-0":"-translate-y-full"} transition-transform duration-300 ease-in-out`}>
      <Image src="/../public/logo.png"
     width={250}
     height={250}
     alt='logo'
     />
      <div className='flex flex-col justify-between items-center mt-0 lg:flex-row'>
    
        <a className='text-2xl font-semibold text-black my-4' href='/'>Home</a>
        <a className='text-2xl font-semibold text-black  my-4' href='/'>Home</a>
        <a className='text-2xl font-semibold text-black  my-4' href='/'>Home</a>
        <a className='text-2xl font-semibold text-black  my-4' href='/'>Home</a>
        <a className='text-2xl font-semibold text-black  my-4' href='/'>Home</a>
      </div>

    </div>
  )
}

const Navbar = ({children}:props) => {
  const [open ,setOpen]=useState(false);
  return (
    <nav>
      <MobileView open={open} setOpen={setOpen}/>
      <div className='w-full flex justify-end items-center bg-none'>
        <div className='group  z-50 relative w-6 h-6 mt-1 cursor-pointer flex-col justify-between items-center flex' onClick={()=>(setOpen(!open))}>
          <span className={` text-4xl group-hover:text-[#634937] mr-12 mt-0 sm:mr-24 sm:mt-10 cursor-pointer transform transition duration-300 ease-in-out ${open? 'rotate-45 translate-y-2.5 hidden':''}`}><FaBars/></span>
          <span className={` text-4xl group-hover:text-[#634937] mr-12 mt-0 sm:mr-24 sm:mt-10 cursor-pointer transform transition duration-300 ease-in-out ${open? 'w-0 ':'w-full hidden'}`}><FaBackspace/></span>


          {/* <span className={`h-1 w-full bg-black rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open? 'rotate-45 translate-y-2.5':''}`}/>
          <span className={`h-1 w-full bg-black rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open? 'w-0':'w-full'}`}/>
          <span className={`h-1 w-full bg-black rounded-lg group-hover:text-red-500 cursor-pointer transform transition duration-300 ease-in-out ${open? 'rotate-45 -translate-y-2.5':''}`}></span> */}

        </div>

      </div>
      {children}
    </nav>
  )
}

export default Navbar