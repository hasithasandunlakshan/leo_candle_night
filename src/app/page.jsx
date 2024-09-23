"use client";
import React, { useEffect, useRef } from "react";
import Hero from "@/components/Home/Hero";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Details from "@/components/Home/Details";
import { UserDetails } from "@/components/Booking/UserDetails";

export default function Page() {
  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
        let scroll = new locomotiveModule.default({
            el: document.querySelector("[data-scroll-container]"),
            smooth: true,
            smoothMobile: true,
            resetNativeScroll: true,
         });
      
         scroll.destroy();  //<-- DOESN'T WORK OR IDK

         setTimeout(function () {
             scroll.init();
         }, 400);
     });
 });

  

  return (
    <div  data-scroll-container   className="  bg-primary">

       
      <Hero />
    <Details/>

    </div>
  );
}
