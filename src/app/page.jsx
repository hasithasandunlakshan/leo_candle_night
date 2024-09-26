"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Details from "@/components/Home/Details";
import PreLoader from "@/components/Loading/Loader"; // Adjust import path if necessary
import { motion } from "framer-motion";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  useEffect(() => {
    let scroll;

    if (!isLoading) {
      import("locomotive-scroll").then((locomotiveModule) => {
        scroll = new locomotiveModule.default({
          el: document.querySelector("[data-scroll-container]"),
          smooth: true,
          smoothMobile: true,
          resetNativeScroll: true,
        });
      });
    }

    // Cleanup on component unmount
    return () => {
      if (scroll) scroll.destroy(); // Make sure the scroll is destroyed on unmount
    };
  }, [isLoading]); // Dependency array to run when loading state changes

  return (
    <main data-scroll-container className="bg-primary relative">
      {isLoading ? (
        <PreLoader /> // Show preloader while loading
      ) : (
        <>
           <motion.div
        initial={{ y: -50 }}     // Starting point
        animate={{  y: 0 }}      // Animate to this position
        transition={{
          duration: 2,                      // Smooth transition duration (seconds)
                    // Easing for smoother motion
          repeat: Infinity,                  // Loop the animation infinitely
          repeatType: "mirror",              // Go back and forth (y: 0 -> y: 50 -> y: 0)
          repeatDelay: 0.5                   // Small delay between each loop
        }}
       className="absolute w-52 z-50 h-40  bottom-1/2 left-0 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-20"></motion.div>
          <motion.div
           initial={{ y: -50 }}     // Starting point
           animate={{  y: 0 }}      // Animate to this position
           transition={{
             duration: 2,                      // Smooth transition duration (seconds)
                       // Easing for smoother motion
             repeat: Infinity,                  // Loop the animation infinitely
             repeatType: "mirror",              // Go back and forth (y: 0 -> y: 50 -> y: 0)
             repeatDelay: 0.5                   // Small delay between each loop
           }}
          className="absolute top-0 right-0  w-52 h-40     sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"></motion.div>
          <Hero />
          <Details />
      
        </>
      )}
    </main>
    
  );
}
