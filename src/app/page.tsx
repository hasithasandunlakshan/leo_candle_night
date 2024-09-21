"use client";
import React, { useEffect, useRef } from "react";
import Hero from "@/components/Home/Hero";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scroll: any;
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;

      if (containerRef.current) {
        scroll = new LocomotiveScroll({
          el: containerRef.current, // Only initialize if containerRef.current exists
          smooth: true,
        });
      }
    })();
    // Cleanup Locomotive Scroll on component unmount
    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} data-scroll-container>
      <Hero />
      <Hero />
      <Hero />
      <Hero />
    </div>
  );
}
