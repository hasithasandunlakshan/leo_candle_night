import Link from 'next/link'
import React from 'react'
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { Spotlight } from '../ui/Spotlight';
export default function MainNav() {
    const navItems = [
        {
          name: "Home",
          link: "/",
          icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
          name: "Booking",
          link: "/bookseat",
          icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
        },
        {
          name: "Contact",
          link: "/contactus",
          icon: (
            <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
          ),
        },
      ];
  return (
    <div className='bg-primary'  >
           <Spotlight
      className="-top-40 left-0 md:left-60 md:-top-20"
      fill="#d6ab31"
    />


<div
       
        className=
          "flex max-w-[50%] top-0 inset-x-0 mx-auto border border-secondary rounded-full  bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-4  items-center justify-center space-x-4"
      
      
      >
        {navItems.map((navItem: any, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className=
              "relative text-neutral-50 items-center flex space-x-1 dark:hover:text-neutral-300 hover:text-neutral-500"
        
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {/* <button className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full">
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
        </button> */}
      </div>
    </div>
  )
}
