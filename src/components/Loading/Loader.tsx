"use client";
// components/Loading.tsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const words = ["2024", "Candle night", "organized by Leo Club", "University of Moratuwa"];

const Loading: React.FC = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 500); // Change words every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-black ">
      <div className="text-2xl flex justify-center items-center font-bold text-secondary">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.1 }}
            className="absolute text-center font-Allura text-4xl  flex justify-center items-center"
          >
            {words[currentWordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Loading;
