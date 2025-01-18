"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["Celestia'25", "Where", "Culture", "Meet", "Elegance"];

const Loading = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: {
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    center: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.1,
        ease: [0.4, 0.0, 0.2, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.1,
        ease: [0.4, 0.0, 0.2, 1]
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50  w-screen items-center flex justify-center bg-primary">
      <div className="relative h-24 w-full  place-content-center flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute  -translate-x-1/2 w-full  text-center text-4xl md:text-7xl text-secondary"
            style={{ fontFamily: "'Allura', cursive" }}
          >
            {words[currentWordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Loading;