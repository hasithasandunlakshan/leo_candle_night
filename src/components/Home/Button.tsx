"use client"
import React from 'react'

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
interface ButtonProps {
  text: string;
  router: string;
}

export default function Button({ text, router: route }: ButtonProps) {
  const router = useRouter();


  return (




/* From Uiverse.io by ParasSalunke */ 

<motion.div  
  onClick={() => router.push(route)}     
  initial={{ y: 10, opacity: 0 }}     
  whileTap={{ scale: 0.9 }}         
  animate={{ y: 0, opacity: 1 }}     
  transition={{  
    delay: 0.3,       
    duration: 0.8,       
    ease: "easeInOut"
  }}     
  className="flex flex-wrap relative group justify-center mt-8 gap-6"
>   
  <motion.button 
    whileHover={{ 
      scale: 1.05,
      boxShadow: "0 0 20px rgba(0, 100, 255, 0.2)"
    }}
    transition={{
      type: "spring",
      stiffness: 400,
      damping: 10
    }}
    className="px-4 py-2 backdrop-blur-sm border border-secondary/70 text-secondary mx-auto 
               text-center rounded-xl relative mt-4 overflow-hidden group"
  >             
    <motion.span className="relative z-10 group-hover:text-white transition-colors duration-200">
    Reserve Your Spot →
    </motion.span>
    
    <motion.div 
      className="absolute inset-0 bg-secondary/10 -z-10"
      initial={{ x: "-100%" }}
      whileHover={{ x: 0 }}
      transition={{ duration: 0.3 }}
    />
             
    <div className="absolute inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto 
                    from-transparent via-blue-100 to-transparent" />           
  </motion.button>   
</motion.div>

  )
}