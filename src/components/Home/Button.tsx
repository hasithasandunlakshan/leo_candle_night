"use client"
import React from 'react'

import { motion } from 'framer-motion';
interface text{

    text:string
}
export default function Button({text}:text) {
  return (
//    
//     <a className="relative" href="#">
//     <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-white"></span>
//     <span className="fold-bold text-lg relative gap-3 flex-row h-full w-full rounded border-2 border-black bg-secondary px-3 py-1  font-bold text-black transition duration-700 flex  hover:bg-black hover:text-gray-50">{text} </span>
//     </a>
//     {/* <a href="#" className="relative">
      
//     </a>
//     {/* <a href="#" className="relative">
//         <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
//         <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-gray-900 hover:text-yellow-500">elevated button filled</span>
//     </a> */}
// </motion.div>



/* From Uiverse.io by ParasSalunke */ 

<motion.div
    initial={{ y: 10,opacity:0 }}
    whileTap={{ scale: 0.9 }}
        animate={{y:0,opacity:1}}
    transition={{  delay: 0.3,
      duration: 0.8,
      ease: "easeInOut"}}
    className="flex flex-wrap relative group justify-center mt-8 gap-6">
    <button
      className="relative inline-block p-px font-semibold leading-6 text-white border border-gray-300  shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
    >
      <span
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-primary to-black p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

      <span className="relative z-10 block px-5 py-2 rounded-xl bg-transparent">
        <div className="relative z-10 flex items-center space-x-2">
          <span className="transition-all duration-500 group-hover:translate-x-1">{text}</span>
          <svg
            className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
            data-slot="icon"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
              fill-rule="evenodd"
            ></path>
          </svg>
        </div>
      </span>
    </button>
  </motion.div>


  )
}