"use client"
import React from 'react'
import { motion } from 'framer-motion';
import { Spotlight } from '../ui/Spotlight'

import Image from 'next/image';

import { TypewriterEffectSmooth } from '../ui/typewriter-effect';

import { TextGenerateEffect } from '../ui/text-generate-effect';
import { useRouter } from 'next/navigation';
export default function Hero() {
  const router=useRouter();
  const description = `Experience the magical world with us!!`;
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
   
    <div className="min-h-screen  w-full  flex items-center align-middle justify-center bg-gradient-to-br from-primary via-primary to-secondary  relative overflow-hidden">
    {/* <Spotlight
      className="-top-40 left-0 md:left-60 md:-top-20"
      fill="#d6ab31"
    /> */}
<div className="flex justify-center  container items-center">
<div className="flex flex-col w-[90%] md:w-1/2 items-center md:items-start py-32">
    <TypewriterEffectSmooth words={words} cursorClassName='hidden' />
  
    <TextGenerateEffect words={description} className='text-gray-200 text-center sm:text-left text-3xl sm:text-4xl font-bold mb-2' duration={3} />
   
  <motion.p 
   initial={{ opacity: 0, y: 50 }}
   whileInView={{ opacity: 1, y: 0 }}
   viewport={{ once: true }}
   transition={{ duration: 3 }}
  
  className='text-white w-full  text-justify'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ipsa sit placeat earum error tempore tenetur iusto ipsum facilis! Praesentium nulla natus atque corrupti dolorem dolor cupiditate, aliquam quia enim!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ipsa sit placeat earum error tempore tenetur iusto ipsum facilis! Praesentium nulla natus atque corrupti dolorem dolor cupiditate, aliquam quia enim!
  </motion.p>


<motion.button onClick={()=>router.push("/bookseat")}
 initial={{ opacity: 0, }}
 whileInView={{ opacity: 1,  }}
 viewport={{ once: true }}
 transition={{ duration: 10 }}
  className="relative py-1 mt-10 px-10 max-w-50 text-black text-base font-bold nded-full overflow-hidden bg-secondary rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-amber-500 before:to-amber-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Book Ticket
</motion.button>


    </div>
    <div className="sm:flex hidden">
      <div className="sm:flex hidden">
      <Image src={"/images/candle.png"} width={500} height={40} alt='candle' className=' rounded-2xl'/>
      </div>
 
    </div>
</div>

  </div>

  )
}
