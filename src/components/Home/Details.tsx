import React from 'react'
import { PinContainer } from '../ui/3d-pin'
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { motion

 } from 'framer-motion';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect';
export default function Details() {
  const words = [
    {
      text: "Old",
      className:'text-secondary   animate-pulse text-2xl font-bold',
      
    },
    {
      text: "Gymnasium",
      className:'text-secondary animate-pulse text-2xl font-bold'
    },]


    const words1 = [
      {
        text: "October 30",
        className:'text-secondary animate-pulse text-2xl font-bold',
        
      }
  ]


  const words3 = [
    {
      text: "6.00 P.M. Onwards",
      className:'text-secondary text-2xl animate-pulse font-bold',
      
    },
 ]
  return (
    <div  className='     bg-transparent relative items-center flex justify-center  h-full flex-col min-h-screen ' >

<motion.div className="flex w-[70%]  mb-10   gap-3 items-center justify-center"

initial={{ opacity: 0, y: 100 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 1}}
>
<h1 className="text-center text-3xl  text-white md:text-6xl ">
  Organized By the  
  <span className="mx-5 font-Allura text-4xl  md:text-8xl font-bold text-secondary">
    Leo Club
  </span>
  of University Of Moratuwa
</h1>

</motion.div>

     
 <div className="absolute w-52 h-40 bottom-8  left-0 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-20"></div>
       <div className="absolute top-0 right-0  w-52 h-40     sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"></div>

<div className="flex justify-center items-center  container flex-col align-middle    lg:flex-row ">


      <PinContainer 
        title=" Octomber 30"
      
      >
        <div className="flex basis-full  flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] sm:w-[15rem] h-[15rem]  ">
          <h3 className="max-w-xs flex   !pb-2 !m-0 font-bold gap-2   text-3xl  text-slate-100">

          <CgCalendarDates   className=' text-4xl'/>  
         Date 
          </h3>

          <TypewriterEffectSmooth words={words1} cursorClassName=' hidden' />
        </div>
      </PinContainer>
      
      <PinContainer 
        title="Old Gymnasium"
      
      >
             <div className="flex basis-full  flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] sm:w-[15rem] h-[15rem]  ">
          <h3 className="max-w-xs flex  !pb-2 !m-0 font-bold  gap-2 text-3xl  text-slate-100">

          <FaLocationDot   className=' text-4xl'/>  
         Venue 
          </h3>

          <TypewriterEffectSmooth words={words} cursorClassName=' hidden' />
        </div>
      </PinContainer>
      <PinContainer 
        title="6.00 P.M. Onwards"
      
      >
        <div className="flex basis-full  flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] sm:w-[15rem] h-[15rem]  ">
          <h3 className="max-w-xs flex  !pb-2 !m-0 font-bold  gap-2 font-bold   text-3xl text-slate-100">

          <MdAccessTime   className=' text-4xl'/>  
         Time
          </h3>

          <TypewriterEffectSmooth words={words3} cursorClassName=' hidden' />
        </div>
      </PinContainer>


</div>
   
    </div>
  )
}
