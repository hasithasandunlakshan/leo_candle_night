import React from 'react'
import { HeroHighlight } from '../ui/hero-highlight'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center    p-8">

    

<motion.h1
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  className="text-center text-white  text-3xl sm:text-7xl      w-[90%]"

    >
Stay<span className="font-Qwigley text-secondary text-5xl md:text-8xl "> Connected </span> with Us
</motion.h1>
        <div className="flex flex-col lg:flex-row items-center  justify-center">


          <motion.div  

   className="m-12 w-[100%]  sm:w-[90%] rounded-3xl border border-black">
            <HeroHighlight className="w-full  border border-secondary hover:border-white  transition-all duration-500 rounded-xl">
              <div className="m-5 bg-transparent flex-col flex rounded-full p-2 mb-8"> {/* Added padding and border for better structure */}
                <div className="flex flex-col sm:flex-row w-full  items-center gap-5 mb-6">
                  <Image
                    src="/images/ContactUs/dummy.png" 
                    alt="Description"
                    width={160}  // width in pixels
                    height={160} // height in pixels
                    className="rounded-full object-cover"/>
                  <div className="flex flex-col">
                    <h1 className="py-2  text-xl sm:text-4xl text-white font-bold ">Name</h1>
                  </div>
                </div>
                <p className="text-center sm:text-left leading-7 text-white font-semibold">Director</p>
                <p className="text-center sm:text-left leading-7 text-white ">Position</p>
                <p className="text-sm text-center sm:text-left leading-7 text-slate-300">text@gmail.com</p>
              </div>
            </HeroHighlight>
            </motion.div>

            <motion.div  className="m-12 w-[100%] sm:w-[90%] rounded-3xl border border-black duration-700">
            <HeroHighlight className="w-full border border-secondary hover:border-white  transition-all rounded-xl">
            <div className="m-5 bg-transparent flex-col flex rounded-full p-2 mb-8"> {/* Added padding and border for better structure */}
                <div className="flex flex-col sm:flex-row w-full  items-center gap-5 mb-6">
                  <Image
                    src="/images/ContactUs/dummy.png" 
                    alt="Description"
                    width={160}  // width in pixels
                    height={160} // height in pixels
                    className="rounded-full object-cover"/>
                  <div className="flex flex-col">
                    <h1 className="py-2  text-xl sm:text-4xl text-white font-bold ">Name</h1>
                  </div>
                </div>
                <p className="text-center sm:text-left leading-7 text-white font-semibold">Director</p>
                <p className="text-center sm:text-left leading-7 text-white ">Position</p>
                <p className="text-sm text-center sm:text-left leading-7 text-slate-300">text@gmail.com</p>
              </div>
            </HeroHighlight>
            </motion.div>


            <motion.div  className="m-12 w-[100%] sm:w-[90%] rounded-3xl border border-black duration-700">
            <HeroHighlight className="w-full border border-secondary hover:border-white  transition-all rounded-xl">
            <div className="m-5 bg-transparent flex-col flex rounded-full p-2 mb-8"> {/* Added padding and border for better structure */}
                <div className="flex flex-col sm:flex-row w-full  items-center gap-5 mb-6">
                  <Image
                    src="/images/ContactUs/dummy.png" 
                    alt="Description"
                    width={160}  // width in pixels
                    height={160} // height in pixels
                    className="rounded-full object-cover"/>
                  <div className="flex flex-col">
                    <h1 className="py-2  text-xl sm:text-4xl text-white font-bold ">Name</h1>
                  </div>
                </div>
                <p className="text-center sm:text-left leading-7 text-white font-semibold">Director</p>
                <p className="text-center sm:text-left leading-7 text-white ">Position</p>
                <p className="text-sm text-center sm:text-left leading-7 text-slate-300">text@gmail.com</p>
              </div>
            </HeroHighlight>
            </motion.div>
    </div>
    </div>

     )
}
