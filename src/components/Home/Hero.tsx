"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { Spotlight } from '../ui/Spotlight'
import Particles from '../Particle'
import Image from 'next/image';

import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

import { TextGenerateEffect } from '../ui/text-generate-effect';
import { useRouter } from 'next/navigation';
import  { ShuffleGrid } from './Test';
import Button from './Button';
export default function Hero() {
  const router=useRouter();
  const description = `Experience the magical world with us!!`;
  const description2 = `Celestia'24`;
  const words = [
    {
      text: "Candle ",
      className:'text-secondary  font-Allura text-5xl sm:text-6xl  md:text-8xl font-bold',
      
    },
    {
      text: " Night ",
      className:'text-secondary font-Allura text-5xl sm:text-6xl   md:text-8xl font-bold'
    },]
  return (
   
    <div className="min-h-screen  w-full  flex items-center align-middle justify-center bg-transparent relative overflow-hidden">
    
     
    {/* <Spotlight
      className="-top-40 left-0 md:left-60 md:-top-20"
      fill="#d6ab31"
    /> */}
<div className=" flex  justify-center align-middle  container items-center">
<div className="flex flex-col w-[100%] md:w-1/2  lg:w-[60%] items-center md:items-start py-32">
    {/* <TypewriterEffectSmooth words={words} cursorClassName='hidden' /> */}
    

    <TextGenerateEffect words={description} className='text-gray-300 font-bold  text-center sm:text-left text-xl sm:text-2xl  ' duration={1} />
    <TextGenerateEffect words={description2} className='text-secondary -mb-10  font-Qwigley text-7xl sm:text-8xl  md:text-9xl ' duration={1} />
   
  <motion.p 
 initial={{ y: 10,opacity:0 }}

     animate={{y:0,opacity:1}}
 transition={{  delay: 0.3,
   duration: 0.8,
   ease: "easeInOut"}}
  
  className=' text-gray-500 w-full md:text-justify   text-center'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ipsa sit placeat earum error tempore tenetur iusto ipsum facilis! Praesentium nulla natus atque corrupti dolorem dolor cupiditate, aliquam quia enim!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ipsa sit placeat earum error tempore tenetur iusto ipsum facilis! Praesentium nulla natus atque corrupti dolorem dolor cupiditate, aliquam quia enim!
  </motion.p>

 
{/* <motion.button onClick={()=>router.push("/bookseat")}
 initial={{ opacity: 0,y:50 }}
 whileInView={{ opacity: 1, y:0 }}
 viewport={{ once: true }}
 transition={{ duration: 3}}
  className="relative cursor-pointer py-1 mt-10 px-10 max-w-50 text-black text-base font-bold nded-full overflow-hidden bg-secondary rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white z-50 hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-amber-500 before:to-amber-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Book Ticket
</motion.button> */}

<Button text='Book Ticket'/>
    </div>
    <div className="sm:flex hidden   md:ml-20   items-center  justify-center align-middle">
      <motion.div className="sm:flex hidden"
       initial={{ opacity: 0,y:40  }}
       animate={{ opacity: 1,y:0 }}
       viewport={{ once: true }}
       transition={{  delay: 0.3,
        duration: 0.8,
        ease: "easeInOut"  }}
      >
      <Image src={"/images/candle.png"} width={500} height={40} alt='candle' className=' rounded-2xl'/>
      </motion.div>
 
    </div>

{/* <ShuffleGrid/> */}
</div>


<Particles/>


  </div>

  )
}
