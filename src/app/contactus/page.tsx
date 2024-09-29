"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../../components/ui/hero-highlight";
import ContactPage from "../../components/contact/contactPage"
import Particles from "react-tsparticles";
export default function HeroHighlightDemo() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary">
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

     <ContactPage/>


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
          className="absolute  bottom-0  left-0  w-52 h-40     sm:w-72 sm:h-72 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full filter blur-3xl opacity-30"></motion.div>
<Particles/>
    </div>
  );
}
