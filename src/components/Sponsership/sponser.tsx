import Image from 'next/image';
import { motion } from 'framer-motion'



const sponsors = [
  { name: 'Bronze Sponsorship', image: '/images/sponser/saththu2.jpg' }
];

const Sponsor = () => {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center text-center rounded-2xl shadow-xl">
      {/* Animated Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 70 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="my-10 text-3xl md:text-5xl lg:text-6xl font-semibold text-white  tracking-widest drop-shadow-lg"
      >
        Our Sponsors
      </motion.h2>
      
      <div className="w-full mb-6 flex flex-col items-center">
      {/* <motion.h3
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl md:text-3xl text-gray-400 font-semibold mb-8 uppercase tracking-wider shadow-md"
        >
          Bronze Sponsorship
        </motion.h3> */}
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-6"
            >
            {sponsors.map((sponsor, index) => (
                <div
                key={index}
                className="p-3  bg-gray-900  rounded-3xl shadow-sm flex flex-col items-center transform transition duration-1000 hover:scale-105 hover:border-yellow-500 hover:shadow-black"
                >
                <Image
                    src={sponsor.image}
                    alt={sponsor.name}
                    width={350}
                    height={250}
                    className="rounded-md shadow-md"
                />
                <p className="font-bold mt-4 text-lg md:text-2xl uppercase tracking-wider text-gray-300 drop-shadow-md">
                    {sponsor.name}
                </p>
                </div>
            ))}
            </motion.div>
      </div>
    </div>
  );
};

export default Sponsor;