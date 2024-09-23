"use client";
import React, { useEffect, useRef } from "react";
import Hero from "@/components/Home/Hero";
import "locomotive-scroll/dist/locomotive-scroll.css";
import LocomotiveScroll from 'locomotive-scroll';
import Details from "@/components/Home/Details";
import { UserDetails } from "@/components/Booking/UserDetails";
interface ExtendedInstanceOptions extends LocomotiveScroll.InstanceOptions {
  smoothMobile?: boolean;
}

export default function Page() {
  useEffect(() => {
    let scroll: any;

    import("locomotive-scroll").then((locomotiveModule) => {
        scroll = new locomotiveModule.default({
            el: document.querySelector("[data-scroll-container]") as HTMLElement,
            smooth: true,
            smoothMobile: false,
            resetNativeScroll: true,
        });
    });

    // `useEffect`'s cleanup phase
    return () => {
        if (scroll) scroll.destroy();
    };
}, []); // Make sure to include the dependency array

  

  return (
    <div  data-scroll-container   className="  bg-primary">

       
      <Hero />
    <Details/>

    </div>
  );
}
