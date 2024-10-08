import React from "react";
import { IconBrandFacebook, IconBrandWhatsapp, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react"; // Import new icons

export default function Footer() {
  const links = [
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="h-full w-full text-neutral-500 hover:text-blue-600 dark:text-neutral-300" />,
      href: "https://www.facebook.com", // Facebook URL
    },
    {
      title: "WhatsApp",
      icon: <IconBrandWhatsapp className="h-full w-full text-neutral-500 hover:text-green-500 dark:text-neutral-300" />,
      href: "https://www.whatsapp.com", // WhatsApp URL
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full text-neutral-500 hover:text-pink-600 dark:text-neutral-300" />,
      href: "https://www.instagram.com", // Instagram URL
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 hover:text-blue-500 dark:text-neutral-300" />,
      href: "https://www.linkedin.com", // LinkedIn URL
    },
  ];

  return (
    <footer className="relative bg-black text-white py-12 px-4 font-sans tracking-wide sm">

      <div className="items-center">
        <img className="h-20 max-w-x mx-auto" src="/images/LeoLogSet.png" alt="leo logo" />
      </div>

      <div>
        <div className="relative z-10 text-center">
          <h6 className="text-base">Stay connected with us:</h6>

          <ul className="flex flex-wrap justify-center gap-x-8 gap-4 my-8 mt-4">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.href} className="text-xl">
                  {link.icon}
                </a>
              </li>
            ))}
          </ul>

        </div>
      </div>
      <p className="text-black bg-yellow-500 text-bold text-center">&copy; 2024 Leo Club UOM All rights reserved.</p>


      
    </footer>
  );
}
