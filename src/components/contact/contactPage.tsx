import React from 'react';
import { HeroHighlight } from '../ui/hero-highlight';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { UserRound, Mail, BadgeCheck } from 'lucide-react';

export default function ContactPage() {
  const contacts = [
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
    }
  ];

  return (
    <div className="flex flex-col items-center p-4 sm:p-8 pb-20 max-w-7xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="text-center text-white text-3xl sm:text-5xl lg:text-7xl mb-8 sm:mb-12"
      >
        Stay<span className="font-Qwigley text-secondary text-4xl sm:text-6xl lg:text-8xl"> Connected </span> with Us
      </motion.h1>

      <div className="w-full space-y-6 my-10 px-4 sm:px-8 md:px-16 lg:px-48">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="w-full"
          >
            <HeroHighlight className="w-full border-2 border-secondary hover:border-secondary transition-all duration-300 rounded-lg sm:rounded-full group">
              <div className="m-3 sm:m-5 bg-transparent flex-col flex p-2">
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                  <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 relative">
                    <Image
                      src={contact.image}
                      alt={`${contact.name}'s photo`}
                      fill
                      className="rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col flex-grow text-center sm:text-left space-y-3">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <UserRound className="w-5 h-5 text-secondary" />
                      <h2 className="text-lg sm:text-xl lg:text-3xl text-white font-bold">
                        {contact.name}
                      </h2>
                    </div>
                    
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <BadgeCheck className="w-5 h-5 text-secondary" />
                      <p className="text-xs sm:text-sm lg:text-base text-white font-semibold">
                        {contact.role}
                      </p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail className="w-5 h-5 text-secondary" />
                      <a 
                        href={`mailto:${contact.email}`}
                        className="text-xs sm:text-sm text-slate-300 hover:text-secondary transition-colors duration-300"
                      >
                        {contact.email}
                      </a>
                    </div>
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
