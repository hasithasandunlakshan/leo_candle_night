import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

import { InfiniteSliderResponsive } from "../Gallery/Gallery";

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

    
    <section ref={targetRef} className="relative h-full bg-transparent">

    <InfiniteSliderResponsive/>
      <div className="sticky my-20 top-0 flex  items-center overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left bg-transparent text-white whitespace-nowrap text-4xl font-black uppercase leading-tight md:text-5xl"
        >
          Delight in a night of Unforgettable

          <span className=" text-secondary"> flavors </span>Delight in a night of Unforgettable
          
          <span className=" text-secondary"> flavors </span>



          
        </motion.p>

        
      </div>


      
    </section>
  );
}
