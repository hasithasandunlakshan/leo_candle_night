"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: { name: string; link: string; icon?: JSX.Element }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  let scrollTimeout: NodeJS.Timeout;

  // Function to check if the user has scrolled to the bottom of the page
  const isAtBottom = () => {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight;
  };

  // Handle scroll logic
  const handleScroll = () => {
    clearTimeout(scrollTimeout);

    let direction = scrollYProgress.get() - scrollYProgress.getPrevious();

    if (isAtBottom()) {
      setVisible(false); // Hide navbar at the bottom
    } else if (scrollYProgress.get() < 0.05) {
      setVisible(true); // Show when near the top
    } else {
      setVisible(direction < 0); // Show when scrolling up, hide when scrolling down
    }

    // If the user stops scrolling for 300ms, show the navbar
    scrollTimeout = setTimeout(() => {
      setVisible(true);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex items-center shadow-lg shadow-sky-700 md:w-[50%] fixed top-10 inset-x-0 mx-auto border  border-white/[0.2] rounded-full bg-black hover:border-amber-400   z-[5000] pr-2 pl-8 py-2 justify-center space-x-4",
            className
          )}
        >
          {navItems.map((navItem: any, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative  text-neutral-50 items-center flex space-x-1  hover:text-amber-300 hover:scale-105 transition-all duration-300 "
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
