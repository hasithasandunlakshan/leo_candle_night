"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useRef } from "react";

const Footer = () => {
  const ref = useRef(null);

  return (
    <footer className="bg-black  bg-opacity-25  rounded-t-3xl shadow-2xl shadow-sky-600 text-white py-8 mt-auto ">
      <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-between px-6 md:px-20">
        {/* Contact Section */}
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-lg md:text-xl mb-4 font-bold">Contact Us</h3>
          <p className="mb-2 font-bold text-sm md:text-base">
            Email:{" "}
            <Link href="mailto:uomleoclub@gmail.com" passHref>
              <span className="text-white cursor-pointer">uomleoclub@gmail.com</span>
            </Link>
          </p>
          <p className="mb-2 font-bold text-sm md:text-base">
            Phone:{" "}
            <a
              href="https://wa.me/94702162942"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              0702162942
            </a>
          </p>
          <p className="text-sm md:text-base">
            <b>Address:</b> Leo Club of University of Moratuwa,
            <br />
            Bandaranayake Mv,
            <br />
            Moratuwa,
            <br />
            Sri Lanka
          </p>
        </div>

        {/* Follow Us Section */}
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-lg md:text-xl mb-4 font-bold">Follow Us</h3>
          <ul className="flex space-x-4 mb-4">
            <li>
              <a
                href="https://web.facebook.com/UOMLEOS/?_rdc=1&_rdr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a
                href="https://x.com/i/flow/login?redirect_after_login=%2FUomLeos"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/uomleos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/uomleos/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl text-gray-400 hover:text-gray-200 transition"
              >
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
          <div className="mt-4 -ml-1.5">
            <Image src="/images/LeoLogSet.png" alt="Logo" width={300} height={400} className="mx-auto md:mx-0" />
          </div>
          {/* Developer Section */}
        <div className="w-full">
          <p className="text-lg md:text-base font-bold">Designed & Developed By</p>
          <a href="https://wa.me/94707704556" target="_blank" rel="noopener noreferrer" className="block my-2">
            <Image
              src="/images/companylogo.png"
              alt="Company Logo"
              width={100}
              height={50}
              className="-mt-4 -ml-5"
            />
          </a>
          
          
        </div>
        </div>

        
      </div>

      <div className="bg-secondary text-black text-center py-2 mt-4 text-sm md:text-base">
        <p>&copy; UoMLeos 2025, All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
