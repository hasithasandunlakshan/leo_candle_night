import React from 'react'
import { HeroHighlight } from '../ui/hero-highlight'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Person {
  name: string;
  role: string;
  email: string;
  image: string;
}

const ContactCard = ({ person }: { person: Person }) => (
  <motion.div 
    className="w-full rounded-3xl border border-black"
    whileHover={{ scale: 1.02 }}
    initial={{ scale: 1 }}
    transition={{ 
      type: "tween", // Changed from spring to tween for smoother motion
      duration: 0.5, // Longer duration
      ease: "easeInOut" // Smooth easing function
    }}
  >
    <HeroHighlight className="w-full h-full border border-secondary transition-all duration-700 rounded-3xl">
      <div className="m-5 bg-transparent flex-col flex p-2 mb-8">
        <div className="flex flex-col sm:flex-row w-full items-center gap-5 mb-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ 
              type: "tween",
              duration: 0.5,
              ease: "easeInOut"
            }}
          >
            <Image
              src={person.image}
              alt={`${person.name}'s photo`}
              width={160}
              height={160}
              className="rounded-full object-cover"
            />
          </motion.div>
          <div className="flex flex-col flex-1">
            <h1 className="py-2 text-xl sm:text-4xl text-white font-bold text-center sm:text-left">
              {person.name}
            </h1>
            <p className="leading-7 text-white font-semibold text-center sm:text-left">
              {person.role}
            </p>
            <p className="text-sm leading-7 text-slate-300 text-center sm:text-left">
              {person.email}
            </p>
          </div>
        </div>
      </div>
    </HeroHighlight>
  </motion.div>
)

export default function ContactPage() {
  const teamMembers = [
    {
      name: "Darshika Prabhashwara",
      role: "President",
      email: "darshikaprabhashwara@gmail.com",
      image: "/images/ContactUs/1.jpg"
    },
    {
      name: "Hasitha Dhananjaya",
      role: "Vice President",
      email: "hasithadhananjaya2020@gmail.com",
      image: "/images/ContactUs/2.jpg"
    },
    {
      name: "Suvini Nisansala",
      role: "Director of Peace, Religeous & Cultural affairs",
      email: "suvininiyagama2002@gmail.com",
      image: "/images/ContactUs/3.jpg"
    },
    {
      name: "Sanjalee Dasanayaka",
      role: "Chairman",
      email: "sanjaleedassanayake56@gmail.com",
      image: "/images/ContactUs/4.jpg"
    },
    
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-secondary text-7xl sm:text-8xl lg:pt-20 px-4 pt-20 font-Qwigley max-w-[90%] mx-auto mb-8"
      >
        Stay Connected With Us
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl">
        {teamMembers.map((person, index) => (
          <ContactCard key={index} person={person} />
        ))}
      </div>
    </div>
  )
}