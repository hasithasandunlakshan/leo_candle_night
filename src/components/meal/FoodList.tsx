
"use client"
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

  { id: 1, name: 'Lamprais', price: 750, image: '/images/meals/Lamprais.jpg' },
  { id: 2, name: 'Chicken Kottu', price: 650, image: '/images/meals/chickenkottu.jpg' },
  { id: 3, name: 'Vegetable Kottu', price: 550, image: '/images/meals/vegikootu.jpg' },
  { id: 4, name: 'Cheese Kottu', price: 950, image: '/images/meals/cheesekottu.jpg' },
  { id: 5, name: 'Dosa & Curries', price: 350, image: '/images/meals/dosa.jpg' },
  { id: 6, name: 'Chicken Biriyani', price: 900, image: '/images/meals/chickenbiriyani.jpg' },
  { id: 7, name: 'Nasi Goreng', price: 900, image: '/images/meals/nasiguran.jpg' },
  { id: 8, name: 'Ramen', price: 800, image: '/images/meals/ramen.jpg' },
  { id: 9, name: 'Pasta', price: 900, image: '/images/meals/pasta.jpg' },
  { id: 10, name: 'Naan', price: 650, image: '/images/meals/naan.jpg' },
];

const drinks: FoodItem[] = [
  { id: 11, name: 'Falooda', price: 320, image: '/images/meals/falooda.jpg' },
  { id: 12, name: 'Chocolate Milkshake', price: 350, image: '/images/meals/milkshake.jpg' },
  { id: 13, name: 'Coke', price: 200, image: '/images/meals/coke.jpg' },
  { id: 14, name: 'Sprite', price: 150, image: '/images/meals/sprite.jpg' },
  { id: 15, name: 'Welcome Drink', price: 200, image: '/images/meals/welcomedrink.jpg' },
  { id: 16, name: 'Fruit Juice', price: 200, image: '/images/meals/juice.jpeg' },
];

const desserts: FoodItem[] = [
  { id: 17, name: 'Biscuit Pudding', price: 200, image: '/images/meals/pudding.jpg' },
  { id: 18, name: 'Vanilla Ice Cream', price: 180, image: '/images/meals/vice.jpg' },
  { id: 19, name: 'Chocolate Ice Cream', price: 200, image: '/images/meals/cice.jpg' },
  { id: 20, name: 'Kesari', price: 300, image: '/images/meals/kesari.jpg' },
];






interface FoodListProps {
  FinalFood: (cart: FoodItem[]) => void;
}

const FoodList: React.FC<FoodListProps> = ({ FinalFood }) => {
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const handleAddToCart = (food: FoodItem) => {
    if (!cart.some((item) => item.id === food.id)) {
      setSelectedFood(food);
      setShowToast(true);
    } else {
      alert('Item already in the cart');
    }
  };

  const confirmAddToCart = (confirm: boolean) => {
    if (confirm && selectedFood) {
      setCart((prevCart) => [...prevCart, selectedFood]);
    }
    setShowToast(false);
    setSelectedFood(null);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleConfirm = () => {
    console.log("cart", cart);
    FinalFood(cart);
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className="relative flex min-h-screen w-screen justify-center align-middle">
      {/* Blur Background */}
      {showToast && <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"></div>}

      <div className="flex flex-col w-full justify-center items-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:text-7xl py-0 text-secondary my-10">
          Food
        </h2>
        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold md:text-7xl py-0 text-secondary my-10">
          Drinks
        </h2>
        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle">
          {drinks.map((drink) => (
            <FoodCard key={drink.id} food={drink} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:text-7xl py-0 text-secondary my-10">
          Desserts
        </h2>
        <div className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle">
          {desserts.map((dessert) => (
            <FoodCard key={dessert.id} food={dessert} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Sheet to show the cart items */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className='right-10 bg-secondary hover:bg-primary top-10 fixed'>
              Confirm
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className='font-bold'>Cart Items</SheetTitle>
              <SheetDescription>Review your selected items below.</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              {cart.length === 0 ? (
                <div className="text-black-500 font-bold">Your cart is empty.</div>
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
                <Button type="button" className="bg-secondary text-white">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Toast Confirmation */}
        {showToast && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary border border-secondary p-6 rounded-lg shadow-lg z-20 w-[90%] sm:w-[50%]">
            <h3 className="text-xl font-semibold text-white mb-4 text-center">
              Add {selectedFood?.name} to the cart?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => confirmAddToCart(true)}
                className="bg-secondary text-white border border-radius-4"
              >
                Yes
              </Button>
              <Button
                onClick={() => confirmAddToCart(false)}
                className="bg-secondary text-white"
              >
                No
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodList;
