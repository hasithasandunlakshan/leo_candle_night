
import React from 'react'
import { motion } from 'framer-motion'

export default function Gallery() {
  return (
    
    <div className="flex flex-col justify-center w-screen  items-center ">
        <div className=" flex flex-col my-5  items-center justify-center">
        <motion.h1
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  className="text-center text-white  text-3xl sm:text-7xl    mb-10  w-[90%]"

    >
  Delight in a night of <span className="font-Qwigley text-secondary text-5xl md:text-8xl ">unforgettable </span> flavors
</motion.h1>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 w-[80%] gap-4">
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/burger.jpg" alt="/food/burger.jpg" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/mac.jpg" alt="" />
        </div>
        <div className=' mt-10'>
            <img className="h-auto max-w-full rounded-lg " src="/food/stoo.jpg" alt="" />
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/crab.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/nood.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/pancake.jpg" alt="" />
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/nood2.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/biri.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/rice.jpg" alt="" />
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/kottu.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/ice.jpg" alt="" />
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="/food/faluda.jpg" alt="" />
        </div>
    </div>
</div>

    </div>
    
  )
}