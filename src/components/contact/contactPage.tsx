import React from 'react'
import { HeroHighlight } from '../ui/hero-highlight'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { FaSquareWhatsapp } from "react-icons/fa6";
interface Person {
  name: string;
  role: string;
  email: string;
  image: string;
  contact:string;
}

const ContactCard = ({ person, index }: { person: Person; index: number }) => (
  <motion.div
    className="w-full rounded-3xl border border-black"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ 
      opacity: 1, 
      y: 0 
    }}
    transition={{
      duration: 0.6,
      delay: index * 0.2,
      ease: "easeOut"
    }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.02 }}
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
            <p className="text-sm leading-7 text-slate-300 text-center sm:text-left flex items-center gap-2">


            <a
      href={`https://wa.me/${person.contact.replace(/\D/g, "")}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-slate-500 hover:text-secondary"
    >
      <FaSquareWhatsapp size={20} />
    </a>
              
    {person.contact}
   
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
      image: "/images/ContactUs/1.jpg",
      contact:'0789084354'

    },
    {
      name: "Hasitha Dhananjaya",
      role: "Vice President",
      email: "hasithadhananjaya2020@gmail.com",
      image: "/images/ContactUs/2.jpg",
      contact:'0763183081'
    },
    {
      name: "Suvini Nisansala",
      role: "Director of Peace, Religeous & Cultural affairs",
      email: "suvininiyagama2002@gmail.com",
      image: "/images/ContactUs/3.jpg",
      contact:'0766863345'
    },
    {
      name: "Sanjalee Dasanayaka",
      role: "Chairman",
      email: "sanjaleedassanayake56@gmail.com",
      image: "/images/ContactUs/4.jpg",
      contact:'0782871199'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center my-6 text-3xl font-medium text-white md:text-6xl"
      >
        Stay
        <span className="mx-3 font-Qwigley text-5xl md:text-8xl text-secondary">
          Connected
        </span>
        With Us
      </motion.h1>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl"
      >
        {teamMembers.map((person, index) => (
          <ContactCard key={index} person={person} index={index} />
        ))}
      </motion.div>
    </div>
  )
}