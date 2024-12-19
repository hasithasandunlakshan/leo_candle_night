import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";
import Details from "../Home/Details";
import Gallery from "../Home/Gallery";

export default function VelocityText() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  const skewXRaw = useTransform(scrollVelocity, [-0.5, 0.5], ["15deg", "-15deg"]);
  const skewX = useSpring(skewXRaw, { mass: 3, stiffness: 400, damping: 50 });

  const xRaw = useTransform(scrollYProgress, [0, 5], [0, -4000]);
  const x = useSpring(xRaw, { mass: 3, stiffness: 400, damping: 200 });

  return (

    
    <section ref={targetRef} className="relative bg-transparent">
      {/* <Details/> */}
      <Gallery/>
      <div className="sticky top-0 flex  items-center overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left bg-white text-black whitespace-nowrap text-4xl font-black uppercase leading-tight md:text-5xl"
        >
          Delight in a night of Unforgettable
          {/* <span className="font-Qwigley text-secondary text-4xl md:text-8xl">
            unforgettable
          </span>{" "} */}
          flavors Delight in a night of Unforgettable
          {/* <span className="font-Qwigley text-secondary text-4xl md:text-8xl">
            unforgettable
          </span>{" "} */}
          flavors
          {/* Delight in a night of{" "}
          <span className="font-Qwigley text-secondary text-4xl md:text-8xl">
            unforgettable
          </span>{" "}
          flavors */}
        </motion.p>

        
      </div>


      
    </section>
  );
}
