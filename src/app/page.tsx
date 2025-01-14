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
import { Sponsers } from "@/components/sponser/CarouselSize";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let locomotiveScroll: any;
  //   (async () => {
  //     const LocomotiveScroll = (await import("locomotive-scroll")).default;

  //     // Bypass TypeScript type error by casting options to 'any'
  //     locomotiveScroll = new LocomotiveScroll({
  //       el: document.querySelector(".scroll-container") as HTMLElement, 
  //       smooth: true,
  //     } as any);

  //   })();

  //   return () => {
  //     if (locomotiveScroll) locomotiveScroll.destroy();
  //   };
  // }, []); 
  useEffect( () => {
    const lenis = new Lenis({
      // Valeur entre 0 et 1
      // Valeur par défaut : 0,1
      // Plus la valeur est faible, plus le scroll sera fluide
      lerp: 0.2, 
      // Valeur par défaut : 1
      // Plus la valeur est haute, plus le défilement sera rapide 
      wheelMultiplier: 1, 
    });
    function raf(time:any) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
},[])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer); 
  }, []);


  
  if (isLoading) {
    return <PreLoader />;
  }

  return (
    
    <main  className="   scroll-container relative scroll-smooth">

      <Hero />
     <Details/>
    <VelocityText/>
    {/*<Sponsers/> */}
    <ContactPage/>
    <Footer /> 
    </main>
  );
}