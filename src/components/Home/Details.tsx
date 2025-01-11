import { HoverEffect } from "../ui/card-hover-effect";
import { CgCalendarDates } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { MdAccessTime } from "react-icons/md";
import { motion } from 'framer-motion';
export default function Details() {
  return (
    <div className=' min-h-screen   items-center flex justify-center  flex-col h-full'>
      <motion.div className="flex w-[90%] mb-5 gap-3 items-start justify-start"
       initial={{ opacity: 0, scale: 0.99, }}
       whileInView={{ opacity: 1, scale: 1  }}
       transition={{ duration: 1,bounce: 0.25 }}
        viewport={{ once: true }}
        >
        <h1 className="text-center  text-3xl text-white md:text-6xl">
          Organized By the
          <span className="mx-5 font-Qwigley text-5xl md:text-8xl  text-secondary">
            Leo Club
          </span>
          of University Of Moratuwa
        </h1>
      </motion.div>
    <div className="max-w-5xl mx-auto px-8">



      <HoverEffect items={projects} />
    </div>
    </div>
  );
}
export const projects = [
  {
    title: "Date",
    description:
      "Octomber 30",
    icon:  <CgCalendarDates/>
    

  },
  {
    title: "Location ",
    description:
      "Old Gymnasium",

    icon:<FaLocationDot/>

  },
  {
    title: "Time",
    description:
      "6.00 P.M. Onwards",
      icon:<MdAccessTime/>

  },

];
