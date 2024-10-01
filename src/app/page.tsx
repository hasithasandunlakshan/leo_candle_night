"use client";
import React, { useEffect, useRef, useState } from "react";
import Hero from "@/components/Home/Hero";
import Details from "@/components/Home/Details";
import PreLoader from "@/components/Loading/Loader"; // Adjust import path if necessary
import { motion, useScroll } from "framer-motion";

import Footer from "@/components/footer/FooterPage";

import "locomotive-scroll/dist/locomotive-scroll.css"; // Make sure to import the CSS

import Parallax from "@/components/Home/Parallax";
import Test from "@/components/Test/Test";
import Details2 from "@/components/Home/Details2";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let locomotiveScroll: any;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      // Bypass TypeScript type error by casting options to 'any'
      locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector(".scroll-container") as HTMLElement, 
        smooth: true,
      } as any);

    })();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []); 

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer); 
  }, []);


  
  if (isLoading) {
    return <PreLoader />;
  }

  return (
    
    <main  className="bg-primary  scroll-container relative scroll-smooth">
      {/* Animated background circles */}
      <motion.div
        initial={{ y: -50 }} // Starting point
        animate={{ y: 0 }} // Animate to this position
        transition={{
          duration: 2, // Smooth transition duration (seconds)
          repeat: Infinity, // Loop the animation infinitely
          repeatType: "mirror", // Go back and forth (y: 0 -> y: 50 -> y: 0)
          repeatDelay: 0.5, // Small delay between each loop
        }}
        className="absolute w-52 z-50 h-40 bottom-1/2 left-0 sm:w-96 sm:h-96 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-20"
      ></motion.div>

      <motion.div
        initial={{ y: -50 }} // Starting point
        animate={{ y: 0 }} // Animate to this position
        transition={{
          duration: 2, // Smooth transition duration (seconds)
          repeat: Infinity, // Loop the animation infinitely
          repeatType: "mirror", // Go back and forth (y: 0 -> y: 50 -> y: 0)
          repeatDelay: 0.5, // Small delay between each loop
        }}
        className="absolute top-0 right-0 w-52 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"
      ></motion.div>

   
      <Hero />
      {/* <Details /> */}
     <Details2/>
  
      
      <Test/>
      {/* <Parallax/> */}
      <Footer /> {/* Ensure you include the Footer component */}
    </main>
  );
}
