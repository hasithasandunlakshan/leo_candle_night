"use client";
import React, { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Details from "@/components/Home/Details";
import PreLoader from "@/components/Loading/Loader"; // Adjust import path if necessary

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 3 seconds
    }, 1000);

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
          smartphone: {
            smooth: true,
            lerp: 0.1
          },
          tablet: {
            smooth: true,
          },
        });
        console.log("Locomotive Scroll initialized:", scroll);
      });
    }

    // Cleanup on component unmount
    return () => {
      if (scroll) scroll.destroy(); // Make sure the scroll is destroyed on unmount
    };
  }, [isLoading]); // Dependency array to run when loading state changes

  return (
    <main data-scroll-container  className="bg-primary">
      {isLoading ? (
        <PreLoader /> // Show preloader while loading
      ) : (
        <>
          <Hero />
          <Details />
        </>
      )}
    </main>
  );
}
