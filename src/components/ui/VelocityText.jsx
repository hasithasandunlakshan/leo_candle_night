import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";
import Details from "../Home/Details";

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
      <Details/>
      <div className="sticky top-0 flex  items-center overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className="origin-bottom-left from-black via-gray-900 to-black bg-black text-white whitespace-nowrap text-5xl font-black uppercase leading-tight md:text-7xl"
        >
          Delight in a night of{" "}
          <span className="font-Qwigley text-secondary text-4xl md:text-8xl">
            unforgettable
          </span>{" "}
          flavors
          Delight in a night of{" "}
          <span className="font-Qwigley text-secondary text-4xl md:text-8xl">
            unforgettable
          </span>{" "}
          flavors
        </motion.p>
      </div>
    </section>
  );
}
