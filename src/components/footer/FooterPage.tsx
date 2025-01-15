import React from "react";
import { IconBrandFacebook, IconBrandWhatsapp, IconBrandInstagram, IconBrandLinkedin } from "@tabler/icons-react";

export default function Footer() {
  const socialLinks = [
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="h-8 w-8 text-neutral-500 hover:text-blue-600 dark:text-neutral-300 transition duration-300" />,
      href: "https://www.facebook.com",
    },
    {
      title: "WhatsApp",
      icon: <IconBrandWhatsapp className="h-8 w-8 text-neutral-500 hover:text-green-500 dark:text-neutral-300 transition duration-300" />,
      href: "https://www.whatsapp.com",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-8 w-8 text-neutral-500 hover:text-pink-600 dark:text-neutral-300 transition duration-300" />,
      href: "https://www.instagram.com",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-8 w-8 text-neutral-500 hover:text-blue-500 dark:text-neutral-300 transition duration-300" />,
      href: "https://www.linkedin.com",
    },
  ];

  const quickLinks = [
    { title: "Home", href: "/" },
    { title: "Book", href: "/bookseat" },
    { title: "Orders", href: "/orderdetails" },
  ];

  return (
    <footer className="bg-gradient-to-r from-gray-800 via-black to-gray-900 text-white py-12 px-6 font-sans tracking-wide">
      <div className="text-center mb-6">
        <img className="h-20 mx-auto mb-4" src="/images/LeoLogSet.png" alt="Leo logo" />
        <h6 className="text-lg font-semibold">Stay connected with us: </h6>
      </div>

      <ul className="flex justify-center gap-8 my-6">
        {socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.title}>
              {link.icon}
            </a>
          </li>
        ))}
      </ul>

      {/* <div className="text-center mt-8">
        <h6 className="text-lg font-semibold mb-4">Quick Links</h6>
        <ul className="flex justify-center gap-6 text-sm">
          {quickLinks.map((link, index) => (
            <li key={index}>
              <a href={link.href} className="text-gray-400 hover:text-secondary transition duration-300">
                {link.title}
              </a>
            </li>
          ))}
        </ul>
      </div> */}

      {/* New Contact Information Section */}
      <div className="text-center mt-8">
        <h6 className="text-lg font-semibold mb-4">Contact Us</h6>
        <p className="text-sm text-gray-400">Address: Leo Club of University of Moratuwa, Bandaranayaka Mv, Moratuwa, Sri Lanka</p>
        <p className="text-sm text-gray-400">Email: <a href="mailto:contact@leoclubuom.com" className="hover:text-secondary">uomleoclub@gmail.com</a></p>
        <p className="text-sm text-gray-400">Phone: <a href="tel:+94123456789" className="hover:text-secondary">+94 70216 2942</a></p>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-secondary">&copy; 2024 Leo Club UOM. All rights reserved.</p>
      </div>
    </footer>
  );
}
