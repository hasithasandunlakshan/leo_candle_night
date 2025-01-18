import React from 'react';
import { motion } from 'framer-motion';
interface FoodCardProps {
  food: {
    id: number;
    name: string;
    price: number;
    image: string; // Add image property
  };
  onAddToCart: (food: { id: number; name: string; price: number; image: string }) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }} // Initial animation state
      whileInView={{ opacity: 1, y: 0 }}  // Final animation state
      transition={{ duration: 2, ease: "easeInOut" }} // Animation timing
     viewport={{once:true}}
      className="w-64  h-72 bg-gray-700/40 m-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <div >
        <img
          src={food.image} // Use the image property here
          alt={food.name}
          className="h-40 w-full object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-64">
          <p className="text-lg font-bold text-secondary truncate block capitalize">{food.name}</p>
          <p className="text-md  text-secondary/70 cursor-auto">Rs:{food.price.toFixed(2)}</p>
          <div className="flex w-full justify-center items-center">
            <button
              onClick={() => onAddToCart(food)}
              className="bg-transparent text-white border border-white px-4 py-2 mt-2 w-full rounded-md  hover:bg-primary transition duration-200"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard;
