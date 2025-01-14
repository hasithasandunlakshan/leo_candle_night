"use client";
// components/Loading.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = [ "Celestia'25", "where", "culture" ,"meet","elegance"];

const Loading: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 700); // Change words every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex absolute z-50 w-screen top-0 justify-center items-center h-screen bg-black ">
      <div className="text-4xl flex justify-center items-center text-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 ,ease: "easeInOut"}}


            
            className="absolute text-center font-Allura text-4xl md:text-7xl  flex justify-center items-center"
          >
            {words[currentWordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Loading;
