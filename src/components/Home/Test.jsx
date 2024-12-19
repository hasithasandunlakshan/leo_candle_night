import { motion } from "framer-motion";

import { useEffect, useRef, useState } from "react";

// const ShuffleHero = () => {
//   return (
//     <section className="min-w-screen      min-h-screen px-8 py-12  items-center gap-8  mx-auto">
//       {/* <div>
//         <span className="block mb-4 text-xs md:text-sm text-indigo-500 font-medium">
//           Better every day
//         </span>
//         <h3 className="text-4xl md:text-6xl font-semibold">
//           Let's change it up a bit
//         </h3>
//         <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
//           Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
//           error repellat voluptatibus ad.
//         </p>
//         <button className="bg-indigo-500 text-white font-medium py-2 px-4 rounded transition-all hover:bg-indigo-600 active:scale-95">
//           Find a class
//         </button>
//       </div>
//        */}


//       <ShuffleGrid />
   
  
      
//     </section>
//   );
// };

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/food/burger.jpg"
},
  {
    id: 2,
       src: "/food/ice.jpg"},
  {
    id: 3,
    src: "/food/kottu.jpg",
  },
  {
    id: 4,
    src: "/food/burger.jpg"
  },


  {
    id: 5,
    src: "/food/nood.jpg"
},
  {
    id: 6,
       src: "/food/burger.jpg"},
  {
    id: 7,
    src: "/food/burger.jpg",
  },
  {
    id: 8,
    src: "/food/nood2.jpg"
  },

  {
    id: 9,
    src: "/food/crab.jpg"
},
  {
    id: 10,
       src: "/food/faluda.jpg"},
  {
    id: 11,
    src: "/food/burger.jpg",
  },
  {
    id: 12,
    src: "/food/burger.jpg"
  },

  {
    id: 13,
    src: "/food/mac.jpg"
},
  {
    id: 14,
       src: "/food/rice.jpg"},
  {
    id: 15,
    src: "/food/pancake.jpg",
  },
  {
    id: 16,
    src: "/food/stoo.jpg"
  },


];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      initial="hide"
      whileInView="show"
      exit="hide"
      variants={introPictureVariants}
      className=" w-full h-full flex "
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center", // Optional: centers the image
      }}
    >  </motion.div>
  ));
};

export const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid   grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
  
    </div>
  );
};
const introPictureVariants= {
  hide: {
      opacity: 0,
    
      x: 0,
  },
  show: {
      opacity: 1,
      x: 0,
      transition: {
          duration: 3,
      },
  },
};

// export default ShuffleHero;