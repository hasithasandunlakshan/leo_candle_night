"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight";
import ContactPage from "../../components/contact/contactPage";
import Footer from "@/components/footer/FooterPage";
import { useEffect, useState } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css"; // Make sure to import the CSS

export default function HeroHighlightDemo() {
 
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
   
    })();

    // Cleanup LocomotiveScroll on component unmount
    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="bg-primary   scroll-container relative scroll-smooth">
      {/* Top animation */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 0.5,
        }}
        className="absolute top-0 right-0 w-52 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"
      ></motion.div>

      {/* Contact page content */}
      <ContactPage />

      {/* Bottom animation */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
          repeatDelay: 0.5,
        }}
        className="absolute bottom-0 left-0 w-52 h-40 sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"
      ></motion.div>

      {/* Footer content */}
      <Footer />
    </div>
  );
}
