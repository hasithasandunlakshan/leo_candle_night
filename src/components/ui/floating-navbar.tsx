"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

    const currentScroll = scrollYProgress.get() ?? 0; // Add a fallback in case it's undefined
    const previousScroll = scrollYProgress.getPrevious() ?? 0; // Fallback for previous scroll
   
    let direction = currentScroll - previousScroll;

    if (isAtBottom()) {
      setVisible(false); // Hide navbar at the bottom
    } else if (currentScroll < 0.05) {
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
  const currentpath=usePathname();
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 1, y: -100 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex overflow-hidden justify-around items-center  w-[100%] sm:w-[80%] md:w-[50%] fixed top-10 inset-x-0 mx-auto border  border-white/[0.2] rounded-full bg-black hover:border-amber-400   z-[40] pr-2  py-2  ",
            className
          )}
        >
          {navItems.map((navItem, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                `${currentpath==navItem.link?" group border-transparent -translate-y-1 sm:border-b-secondary transition-all duration-500 shadow-2xl shadow-transparent":"border-transparent"} rounded-3xl border-b-2    px-2 text-neutral-50 text-8xl items-center flex   hover:text-amber-300 hover:scale-105 hover:shadow-slate-100  hover:z-30 transition-all duration-300 `
              )}
            >
              <span className=" flex   items-center flex-col sm:hidden">{navItem.icon} 
                
                 <p className=" group-hover:flex text-justify hover:shadow-inner text-xs">{navItem.name}</p>
                </span>
              <span className="hidden cursor-pointer sm:flex text-lg">{navItem.name}</span>
            </Link>

          ))}
          
        </motion.div>
      )}
    </AnimatePresence>
  );
};
