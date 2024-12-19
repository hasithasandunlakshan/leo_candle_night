"use client"
import React from 'react'

import { motion } from 'framer-motion';
interface text{

    text:string
}
export default function Button({text}:text) {
  return (
    <motion.div
    initial={{ y: 10,opacity:0 }}
    whileTap={{ scale: 0.9 }}
        animate={{y:0,opacity:1}}
    transition={{  delay: 0.3,
      duration: 0.8,
      ease: "easeInOut"}}
    className="flex flex-wrap justify-center mt-8 gap-6">
    <a className="relative" href="#">
    <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-white"></span>
    <span className="fold-bold text-lg relative gap-3 flex-row h-full w-full rounded border-2 border-black bg-secondary px-3 py-1  font-bold text-black transition duration-700 flex  hover:bg-black hover:text-gray-50">{text} </span>
    </a>
    {/* <a href="#" className="relative">
      
    </a>
    {/* <a href="#" className="relative">
        <span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-gray-700"></span>
        <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-black px-3 py-1 text-base font-bold text-white transition duration-100 hover:bg-gray-900 hover:text-yellow-500">elevated button filled</span>
    </a> */}
</motion.div>
  )
}