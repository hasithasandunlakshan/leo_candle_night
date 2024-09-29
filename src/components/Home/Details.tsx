import React from 'react';
import { PinContainer } from '../ui/3d-pin';
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { motion } from 'framer-motion';
import { TypewriterEffectSmooth } from '../ui/typewriter-effect'; // Importing the typewriter effect

export default function Details() {
  const wordsDate = [
    { text: "October 30", className: 'text-secondary animate-pulse text-2xl font-bold' }
  ];

  const wordsVenue = [
    { text: "Old Gymnasium", className: 'text-secondary animate-pulse text-2xl font-bold' }
  ];

  const wordsTime = [
    { text: "6.00 P.M. Onwards", className: 'text-secondary animate-pulse text-2xl font-bold' }
  ];

  return (
    <div className='   items-center flex justify-center  flex-col min-h-screen'>
      <motion.div className="flex w-[70%] mb-10 gap-3 items-center justify-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}>
        <h1 className="text-center text-3xl text-white md:text-6xl">
          Organized By the
          <span className="mx-5 font-Allura text-4xl md:text-8xl font-bold text-secondary">
            Leo Club
          </span>
          of University Of Moratuwa
        </h1>
      </motion.div>

      {/* <div className="absolute w-52 h-40 bottom-8 left-0 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute top-0 right-0 w-52 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"></div> */}

      <div className="flex justify-center items-center container flex-col lg:flex-row">
        <PinContainer title="Date">
          <div className="flex basis-full items-center justify-center flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] sm:w-[15rem] h-[15rem]">
            <h3 className="max-w-xs flex !pb-2 !m-0 font-bold gap-2 text-3xl text-slate-100">
              <CgCalendarDates className='text-4xl' />
              Date
            </h3>
      <h1 className=' text-secondary animate-pulse text-2xl font-bold'>October 30</h1>
          </div>
        </PinContainer>

        <PinContainer title="Venue">
          <div className="flex items-center justify-center basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] sm:w-[15rem] h-[15rem]">
            <h3 className="max-w-xs flex !pb-2 !m-0 font-bold gap-2 text-3xl text-slate-100">
              <FaLocationDot className='text-4xl' />
              Venue
            </h3>
            {/* <TypewriterEffectSmooth words={wordsVenue} cursorClassName='hidden' /> */}
            <h1 className=' text-secondary animate-pulse text-2xl font-bold'>Old Gymnasium</h1>
          </div>
        </PinContainer>

        <PinContainer title="Time">
          <div className="flex items-center justify-center basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[15rem] sm:w-[15rem] h-[15rem]">
            <h3 className="max-w-xs flex !pb-2 !m-0 font-bold gap-2 text-3xl text-slate-100">
              <MdAccessTime className='text-4xl' />
              Time
            </h3>
            <h1 className=' text-secondary animate-pulse text-2xl font-bold'>6.00 PM Onwards</h1>
            {/* <TypewriterEffectSmooth words={wordsTime} cursorClassName='hidden' /> */}
          </div>
        </PinContainer>
      </div>
    </div>
  );
}
