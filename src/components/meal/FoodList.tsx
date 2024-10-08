
import React, { useState } from 'react';
import FoodCard from './FoodCard';
import { Button } from '../ui/button';

const foods = [
  { id: 1, name: 'Pizza', price: 9.99 },
  { id: 2, name: 'Burger', price: 5.99 },
  { id: 3, name: 'Sushi', price: 12.99 },
  { id: 4, name: 'Pasta', price: 7.99 },
  { id: 5, name: 'Salad', price: 4.99 },
];



interface FoodListProps {
  

    // onSelectFood: (food: { id: number; name: string; price: number }) => void 

    FinalFood:(cart:any)=>void
  }
 

  
const FoodList:React.FC<FoodListProps> = ({ FinalFood }) => {
  const [cart, setCart] = useState<any[]>([]);
  const handleAddToCart = (food: { id: number; name: string; price: number }) => {
    setCart((prevCart) => [...prevCart,food]);
    alert(`${food.name} added to cart!`);
  };

  const handleConfirm = () => {
    console.log("cartr",cart)
    FinalFood(cart); // Pass selected food items to the parent component
  };
  return (
    <div className="flex flex-wrap justify-center ">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
      ))}
      {/* <h2 className="mt-4 text-xl font-bold">Cart Items:</h2>
      <ul className="mt-2">
        {cart.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item.name} - ${item.price.toFixed(2)}
          </li>
        ))}
      </ul> */}


      <Button onClick={handleConfirm} className=' bg-white text-black'>Confirm</Button>
    </div>
  );
};

export default FoodList;
