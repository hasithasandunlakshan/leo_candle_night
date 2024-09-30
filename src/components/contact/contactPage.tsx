import React from 'react'
import { HeroHighlight } from '../ui/hero-highlight'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ContactPage() {
  return (
    <div className="flex flex-col min-w-screen bg-primary  justify-center  min-h-screen items-center">
      <h1 className="text-justify text-secondary text-5xl sm:text-8xl pt-28 font-Qwigley">Stay Connected With Us </h1>
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="m-12 w-[70%] sm:w-[90%] rounded-3xl border border-black hover:scale-105 duration-700">
            <HeroHighlight className="w-full border border-secondary rounded-xl">
              <div className="m-5 bg-transparent flex-col flex rounded-full p-2 mb-8"> {/* Added padding and border for better structure */}
                <div className="flex flex-col sm:flex-row w-full  items-center gap-5 mb-6">
                  <Image
                    src="/ContactUs/chamindu.jpg" 
                    alt="Description"
                    width={160}  // width in pixels
                    height={160} // height in pixels
                    className="rounded-full object-cover"/>
                  <div className="flex flex-col">
                    <h1 className="py-2 text-xl sm:text-4xl text-white font-bold ">Chamindu Sathsara</h1>
                  </div>
                </div>
                <p className="text-center sm:text-left leading-7 text-white font-semibold">Director</p>
                <p className="text-center sm:text-left leading-7 text-white ">Computer Science & Engineering Undergraduate</p>
                <p className="text-sm text-center sm:text-left leading-7 text-slate-300">chamindusathsara.22@gmail.com</p>
              </div>
            </HeroHighlight>
            </div>

            <div className="m-12 w-[70%] sm:w-[90%] rounded-3xl border border-black hover:scale-105 duration-700">
            <HeroHighlight className="w-full border border-secondary rounded-xl">
              <div className="m-5 bg-transparent flex-col flex rounded-full p-2 mb-8"> {/* Added padding and border for better structure */}
                <div className="flex flex-col sm:flex-row w-full  items-center gap-5 mb-6">
                  <Image
                    src="/ContactUs/chamindu.jpg" 
                    alt="Description"
                    width={160}  // width in pixels
                    height={160} // height in pixels
                    className="rounded-full object-cover"/>
                  <div className="flex flex-col">
                    <h1 className="py-2 text-xl sm:text-4xl text-white font-bold ">Chamindu Sathsara</h1>
                  </div>
                </div>
                <p className="text-center sm:text-left leading-7 text-white font-semibold">Director</p>
                <p className="text-center sm:text-left leading-7 text-white ">Computer Science & Engineering Undergraduate</p>
                <p className="text-sm text-center sm:text-left leading-7 text-slate-300">chamindusathsara.22@gmail.com</p>
              </div>
            </HeroHighlight>
            </div>
    </div>
    </div>


     )
}
