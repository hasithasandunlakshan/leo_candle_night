"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero";

import PreLoader from "@/components/Loading/Loader"; // Adjust import path if necessary

import VelocityText from "@/components/ui/VelocityText";
import Footer from "@/components/footer/FooterPage";

import "locomotive-scroll/dist/locomotive-scroll.css"; // Make sure to import the CSS

import Details from "@/components/Home/Details";
import Lenis from '@studio-freight/lenis'
import ContactPage from "@/components/contact/contactPage";
//import { Sponsers } from "@/components/sponser/CarouselSize";
import Sponsor from "@/components/Sponsership/sponser";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

 
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.2, // Scroll smoothing value
      wheelMultiplier: 1, // Adjust scroll speed
    });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4900);

    return () => clearTimeout(timer); 
  }, []);


  
  if (isLoading) {
    return <PreLoader />;
  }

  return (
    
    <main  className="    relative">

      <Hero />
     <Details/>
    <VelocityText/>
    
    {/*<Sponsers/> */}
    <Sponsor/>
    <ContactPage/>
    <Footer /> 
    </main>
  );
}