

import React from 'react';

interface FoodCardProps {
  food: {
    id: number;
    name: string;
    price: number;
  };
  onAddToCart: (food: { id: number; name: string; price: number }) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, onAddToCart }) => {
  return (
 

      <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <a href="#">
            <img src="https://images.unsplash.com/photo-1649261191606-cb2496e97eee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NDR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt="Product" className="h-80 w-72 object-cover rounded-t-xl" />
            <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">Brand</span>
                <p className="text-lg font-bold text-black truncate block capitalize">{food.name}</p>
                <div className="flex items-center">
                    <p className="text-lg font-semibold text-black cursor-auto my-3">Rs:{food.price.toFixed(2)}</p>
                  
                   


                        <button
        onClick={() => onAddToCart(food)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add to Cart
      </button>
                </div>
            </div>
        </a>
    </div>
  
  );
};

export default FoodCard;






