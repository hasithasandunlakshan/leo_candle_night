"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const ref = useRef(null);

  return (
    <footer className="bg-black text-white py-8 mt-auto">
      <div className="container mx-auto flex flex-wrap justify-between px-20">
        {/* Contact Section */}
        <div className="w-full md:w-1/3 p-4">
          <h3 className="text-xl mb-4 font-bold">Contact Us</h3>
          <p className="mb-2 font-bold">
            Email:{" "}
            <Link href="mailto:uomleoclub@gmail.com" passHref>
              <span className="text-blue-400 cursor-pointer">uomleoclub@gmail.com</span>
            </Link>
          </p>
          <p className="mb-2 font-bold">
            Phone:{" "}
            <a href="https://wa.me/94702162942" target="_blank" rel="noopener noreferrer" className="text-blue-400">
              0702162942
            </a>
          </p>
          <p><b>Address:</b> Leo Club of University of Moratuwa,<br/>Bandaranayakae Mv,<br/>Moratuwa,<br/>Sri lanka </p>
        </div>

        

        {/* Social Links Section */}
        <div className="w-full md:w-1/3 p-4">
          <h3 className="text-xl mb-4 font-bold">Follow Us</h3>
          <ul className="flex space-x-4">
            <li>
              <a
                href="https://web.facebook.com/UOMLEOS/?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2FUomLeos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/uomleos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/uomleos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
          <div className="mt-4 ">
            <Image src="/images/LeoLogSet.png" alt="Logo" width={350} height={500} />
          </div>
          
        </div>
        <div className="text-center mt-4">
            <p className="text-white font-bold">Designed & Developed By</p>
            <a href="https://wa.me/94707704556" target="_blank" rel="noopener noreferrer">
              <Image src="/images/companylogo.png" alt="Company Logo" width={200} height={100} />
            </a>
            <p>Email: <Link href="mailto:h4xsolutions@gmail.com"><span className="text-blue-400 cursor-pointer">h4xsolutions@gmail.com</span></Link></p>
            <p>Phone: <a href="https://wa.me/94707704556" className="text-blue-400">070 770 4556</a></p>
          </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-secondary text-black text-center py-1">
        <p>&copy; UoMLeos 2025,All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
