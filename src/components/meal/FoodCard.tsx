import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"

interface FoodCardProps {
  food: {
    id: number;
    name: string;
    price: number;
    image: string;
    description: string;
  };
  onAddToCart: (food: { id: number; name: string; price: number; image: string; description: string }) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 2, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="w-72 h-96 items-center flex justify-center  bg-gray-700/40 m-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
    >
      <div>
        <img
          src={food.image}
          alt={food.name}
          className="h-48  w-64 object-cover rounded-xl"
        />
        <div className="px-4 py-3 w-64">
          <p className="text-lg font-bold text-secondary block capitalize">
            {food.name}
          </p>
          
          {/* <p className="text-md text-secondary/70 cursor-auto">
            Rs:{food.price.toFixed(2)}
          </p> */}
          
          <div className="flex flex-col w-full gap-2">
            <Dialog >
              <DialogTrigger className="bg-transparent text-white border border-white px-4 py-2 mt-1 w-full rounded-md hover:bg-black transition duration-200">
                View Details
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-secondary">
                    {food.name}
                  </DialogTitle>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={food.image}
                    alt={food.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
             
                  
                    <div className="space-y-4">
                    <p className="text-lg font-semibold text-secondary">
                      Price: Rs  {food.price.toFixed(2)}
                    </p>
                    {food.description && food.description.length > 1 && (
                      <div>
                        <h3 className="text-md font-semibold mb-2 text-secondary">
                          Details:
                        </h3>
                        <p className="text-sm text-white/80">
                          {food.description}
                        </p>
                      </div>
                    )}
                
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={() => onAddToCart(food)}
              className="bg-transparent text-white border border-white px-4 py-2 w-full rounded-md hover:bg-primary transition duration-200"
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