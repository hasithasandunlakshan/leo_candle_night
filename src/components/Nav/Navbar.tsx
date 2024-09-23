import React from 'react'
import { IconHome, IconMessage, IconUser } from "@tabler/icons-react";
import { FloatingNav } from '../ui/floating-navbar';
import { AiFillPhone } from "react-icons/ai";
import { AiTwotoneBank } from "react-icons/ai";
import { GiMeal } from "react-icons/gi";
import { ImCart } from "react-icons/im";
import { FaHome } from "react-icons/fa";
export default function Navbar() {
    const navItems = [
        {
          name: "Home",
          link: "/",
          icon: <FaHome className='text-xl'/>
        },
        {
          name: "Book",
          link: "/bookseat",
          icon: <GiMeal className='text-xl'/>
        },
        {
          name: "Contact",
          link: "/contactus",
          icon: 
           <AiFillPhone className='text-xl'/>
          ,
        },
        {
          name: "Your Order",
          link: "/orderdetails",
          icon: 
       <ImCart className='text-xl'/>
      
        },
      ];
  return (
    
<>
<FloatingNav navItems={navItems} />
 
</>
  )
}
