import React from 'react'
import { HeroHighlight } from '../ui/hero-highlight'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ContactPage() {
  const contacts = [
    {
      name: "Darshika Pathirana",
      role: "Director",
      position: "Position",
      email: "text@gmail.com",
      image: "/images/ContactUs/1.jpg"
    },
    {
      name: "Hasitha Dananjaya",
      role: "Director",
      position: "Position",
      email: "text@gmail.com",
      image: "/images/ContactUs/2.jpg"
    },
    {
      name: "Hiruni Liyanage",
      role: "Director",
      position: "Position",
      email: "text@gmail.com",
      image: "/images/ContactUs/3.jpg"
    }
  ];

  return (
    <div className="flex flex-col items-center p-8 pb-36 mx-8">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-white text-3xl sm:text-7xl mb-12"
      >
        Stay<span className="font-Qwigley text-secondary text-5xl md:text-8xl"> Connected </span> with Us
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.05,
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-full"
          >
            <HeroHighlight className="w-full border-2 border-secondary hover:border-secondary transition-all duration-300 rounded-3xl group">
              <div className="m-5 bg-transparent flex-col flex p-2">
                <div className="flex flex-col sm:flex-row items-center gap-5">
                  <div className="flex-shrink-0">
                    <Image
                      src={contact.image}
                      alt="Description"
                      width={160}
                      height={160}
                      className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow text-center sm:text-left">
                    <h2 className="py-2 text-lg sm:text-3xl text-white font-bold pb-6">
                      {contact.name}
                    </h2>
                    <p className="leading-7 text-white font-semibold">
                      {contact.role}
                    </p>
                    <p className="leading-7 text-white">
                      {contact.position}
                    </p>
                    <p className="text-sm leading-7 text-slate-300">
                      {contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </HeroHighlight>
          </motion.div>
        ))}
      </div>
    </div>
  );
}