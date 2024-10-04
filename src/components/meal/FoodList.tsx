
import React, { useState } from 'react';
import FoodCard from './FoodCard';

const foods = [
  { id: 1, name: 'Pizza', price: 9.99 },
  { id: 2, name: 'Burger', price: 5.99 },
  { id: 3, name: 'Sushi', price: 12.99 },
  { id: 4, name: 'Pasta', price: 7.99 },
  { id: 5, name: 'Salad', price: 4.99 },
];



interface FoodListProps {
    // food: {
    //   id: number;
    //   name: string;
    //   price: number;
    // };
    // onAddToCart: (food: { id: number; name: string; price: number }) => void;

    onSelectFood: (food: { id: number; name: string; price: number }) => void 


  }

  
const FoodList:React.FC<FoodListProps> = ({ onSelectFood }) => {
  const [cart, setCart] = useState<any[]>([]);
  const handleAddToCart = (food: { id: number; name: string; price: number }) => {
    setCart((prevCart) => [...prevCart,food]);
    alert(`${food.name} added to cart!`);
  };

  return (
    <div className="flex flex-wrap justify-center ">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
      ))}
      <h2 className="mt-4 text-xl font-bold">Cart Items:</h2>
      <ul className="mt-2">
        {cart.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FoodList;
