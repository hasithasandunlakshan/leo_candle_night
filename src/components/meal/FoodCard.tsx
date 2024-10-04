
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
    <div className="bg-white shadow-md rounded-md p-4 m-2">
      <h2 className="text-lg font-bold">{food.name}</h2>
      <p className="text-gray-600">${food.price.toFixed(2)}</p>
      <button
        onClick={() => onAddToCart(food)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default FoodCard;
