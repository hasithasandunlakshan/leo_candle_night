import React from 'react';

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
    <div className="w-64 border border-secondary h-72 bg-white m-2 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img
          src={food.image} // Use the image property here
          alt={food.name}
          className="h-40 w-full object-cover rounded-t-xl"
        />
        <div className="px-4 py-3 w-64">
          <p className="text-lg font-bold text-black truncate block capitalize">{food.name}</p>
          <p className="text-lg font-semibold text-black cursor-auto">Rs:{food.price.toFixed(2)}</p>
          <div className="flex w-full justify-center items-center">
            <button
              onClick={() => onAddToCart(food)}
              className="hover:bg-secondary text-white px-4 py-2 w-full rounded-md bg-primary transition duration-200"
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
