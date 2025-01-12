import React, { useState } from 'react';
import FoodCard from './FoodCard';
import { Button } from '../ui/button';


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Define the FoodItem type
interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;

}

// Define the different food categories
const foods: FoodItem[] = [
  { id: 1, name: 'Lamprais', price: 9.99, image: '/images/meals/Lamprais.jpg' },
  { id: 2, name: 'Chicken Kottu', price: 5.99, image: '/images/meals/chickenkottu.jpg' },
  { id: 3, name: 'Vegitable Kottu', price: 12.99, image: '/images/meals/vegikootu.jpg' },
  { id: 4, name: 'Cheese Kottu', price: 7.99, image: '/images/meals/cheesekottu.jpg' },
  { id: 5, name: 'Dosa & Curries', price: 4.99, image: '/images/meals/dosa.jpg' },
  { id: 6, name: 'Chicken Biriyani', price: 4.99, image: '/images/meals/chickenbiriyani.jpg' },
  { id: 7, name: 'Nasi Goreng', price: 4.99, image: '/images/meals/nasiguran.jpg' },
  { id: 8, name: 'Ramen', price: 4.99, image: '/images/meals/ramen.jpg' },
  { id: 9, name: 'Pasta', price: 4.99, image: '/images/meals/pasta.jpg' },
  { id: 10, name: 'Naan', price: 4.99, image: '/images/meals/naan.jpg' },
];

const drinks: FoodItem[] = [
  { id: 11, name: 'Falooda', price: 1.99, image: '/images/meals/falooda.jpg' },
  { id: 12, name: 'Chocolate Milkshake', price: 1.99, image: '/images/meals/milkshake.jpg' },
  { id: 13, name: 'Coke', price: 1.99, image: '/images/meals/coke.jpg' },
  { id: 14, name: 'Sprite', price: 1.99, image: '/images/meals/sprite.jpg' },
  { id: 15, name: 'Welcome Drink', price: 1.99, image: '/images/meals/welcomedrink.jpg' },
  { id: 16, name: 'Fruit Juice', price: 1.99, image: '/images/meals/juice.jpeg' },

];

const desserts: FoodItem[] = [
  { id: 17, name: 'Biscuit Pudding', price: 1.99, image: '/images/meals/pudding.jpg' },
  { id: 18, name: 'Vanila Ice Cream', price: 1.99, image: '/images/meals/vice.jpg' },
  { id: 19, name: 'Chocolate Ice Cream', price: 1.99, image: '/images/meals/cice.jpg' },
  { id: 20, name: 'Kesari', price: 1.99, image: '/images/meals/kesari.jpg' },
];


interface FoodListProps {
  FinalFood: (cart: FoodItem[]) => void; // Use FoodItem type for cart
}

const FoodList: React.FC<FoodListProps> = ({ FinalFood }) => {
  const [cart, setCart] = useState<FoodItem[]>([]);

  const handleAddToCart = (food: FoodItem) => {
    setCart((prevCart) => [...prevCart, food]);
    alert(`${food.name} added to cart!`);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== id));
  };

  const handleConfirm = () => {
    console.log("cart", cart);
    FinalFood(cart); // Pass selected food items to the parent component
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0); // Calculate total price

  return (
    <div className="flex  min-h-screen w-screen justify-center align-middle">
      <div className=" flex flex-col w-full justify-center items-center">
      <h2 className="text-3xl sm:text-4xl  font-bold mb-4 md:text-7xl py-0 text-secondary my-10">Food</h2>
        {/* Render Food Section */}
        <div className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle'>
          
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Render Drinks Section */}
        <h2 className="text-3xl sm:text-4xl  font-bold  md:text-7xl py-0 text-secondary my-10 ">Drinks</h2>
        <div className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  w-[90%] grid justify-center align-middle'>
        
          {drinks.map((drink) => (
            <FoodCard key={drink.id} food={drink} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Render Desserts Section */}
          <h2 className="text-3xl sm:text-4xl  font-bold mb-4 md:text-7xl py-0 text-secondary my-10 ">Desserts</h2>
        <div className='grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  w-[90%] grid justify-center align-middle'>
          {desserts.map((dessert) => (
            <FoodCard key={dessert.id} food={dessert} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Sheet to show the cart items */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className=' right-10 bg-secondary hover:bg-primary top-10 fixed '>Confirm</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='font-bold'>Cart Items</SheetTitle>
              <SheetDescription>
                Review your selected items below.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {cart.length === 0 ? (
                <div className="text-black-500 font-bold ">Your cart is empty.</div>
              ) : (
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between text-gray-700">
                      <span>{item.name} - ${item.price.toFixed(2)}</span>
                      <Button 
                        onClick={() => handleRemoveFromCart(item.id)} 
                        variant="outline" 
                        className="ml-2 font-xs bg-red-400"
                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <div className="font-bold">
                  Total: ${totalPrice.toFixed(2)}
                </div>
              )}
            </div>
            <SheetFooter>
              <Button onClick={handleConfirm} className="bg-green-500 text-white">
                Confirm Cart
              </Button>
              <SheetClose asChild>
                <Button type="button">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FoodList;
