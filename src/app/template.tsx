"use client";

import { useEffect } from "react";
import { animatePageIn, animatePageOut } from "../lib/animations";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn();
   
  }, []);
  const description2 = `Celestia'24`;
  return (
    
    <div>
      <div
        id="transition-element"
        className="w-screen h-screen justify-center items-center flex  bg-black  z-50 fixed top-0 left-0"
      >

        <h1 className="text-secondary  font-Allura text-6xl sm:text-7xl  md:text-8xl">Celestia&apos;25</h1>
         {/* <TextGenerateEffect words={description2} className='text-secondary  font-Allura text-6xl sm:text-7xl  md:text-8xl font-bold' duration={2} /> */}


      </div>
      {children}
    </div>
  );
}