"use client";
import React, { useEffect, useRef, useState } from "react";
import Hero from "@/components/Home/Hero";
import Details from "@/components/Home/Details";
import PreLoader from "@/components/Loading/Loader"; // Adjust import path if necessary
import { motion, useScroll } from "framer-motion";
import ContactPage from "@/components/contact/contactPage";
import Footer from "@/components/footer/FooterPage";

import "locomotive-scroll/dist/locomotive-scroll.css"; // Make sure to import the CSS

import Parallax from "@/components/Home/Parallax";
import { ItemList } from "@/components/Home/ItemList";
import Test from "@/components/Home/Test";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    let locomotiveScroll: any;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      // Bypass TypeScript type error by casting options to 'any'
      locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector(".scroll-container") as HTMLElement, // Target scroll container
        smooth: true,
      } as any); // <--- Cast options to 'any'

      // Mark loading complete
      // setIsLoading(false);
    })();

    // Cleanup LocomotiveScroll on component unmount
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []); // Empty dependency array means this runs once when component mounts

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer on unmount
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

      {/* Main content sections */}
      <Hero />
      <Details />
     
  
      <ContactPage />
      {/* <Parallax/> */}
      <Test/>
      {/* <ItemList/> */}
      <Footer /> {/* Ensure you include the Footer component */}
    </main>
  );
}
