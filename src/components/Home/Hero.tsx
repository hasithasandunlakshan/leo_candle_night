"use client";
import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Particles from "../Particle";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import Button from "./Button";

export default function Hero() {
  const router = useRouter();
  const description = `Experience the magical world with us!!`;
  const description2 = `Celestia'24`;

  // For parallax effect
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 600], ["0%", "40%"]); // Adjust values for parallax
 

  return (
    <div className="min-h-screen z-0 w-full flex items-center justify-center bg-transparent relative overflow-hidden">
      {/* Parallax Image */}
      <motion.div
        style={{
          backgroundImage: "url('/images/11.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: imageY,
         
        }}
<<<<<<< HEAD
        className="top-0 right-0 left-0 bottom-0 opacity-60 -z-50 absolute min-h-[100vh] w-screen"
=======
        className="top-0 hidden lg:flex right-0 left-0 bottom-0 opacity-50 -z-50 absolute min-h-[100vh] w-screen"
      ></motion.div>



<motion.div
        style={{
          backgroundImage: "url('/images/hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: imageY,
         
        }}
        className="top-0 right-0 left-0 bottom-0 lg:hidden opacity-10 -z-50 absolute min-h-[100vh] w-screen"
>>>>>>> 505d5b05e8b54583da8a646ffa63dc8145842fbd
      ></motion.div>

      <div className="justify-start container items-start">
        <div className="flex flex-col w-[100%] lg:w-[60%] items-center lg:items-start py-32">
          <TextGenerateEffect
            words={description}
            className="text-gray-300 font-bold text-center sm:text-left text-xl sm:text-2xl"
            duration={1}
          />
          <TextGenerateEffect
            words={description2}
            className="text-secondary -mb-10 font-Qwigley text-7xl sm:text-8xl md:text-9xl"
            duration={1}
          />
          <motion.p
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="text-gray-400 w-[100%] justify-center lg:justify-start mt-6 text-center  lg:text-left"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            ipsa sit placeat earum error tempore tenetur iusto ipsum facilis!
            Praesentium nulla natus atque corrupti dolorem dolor cupiditate,
            aliquam quia enim! Lorem ipsum dolor sit amet consectetur
            adipisicing elit. 
          </motion.p>

          <Button text="BOOK TICKET" />
        </div>
        <div className="md:flex hidden lg:ml-20 items-center justify-center align-middle">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            {/* <Image
              src={"/images/113.jpeg"}
              width={500}
              height={40}
              alt="candle"
              className="rounded-2xl"
            /> */}
          </motion.div>
        </div>
      </div>

      <Particles />
    </div>
  );
}