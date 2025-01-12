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
  FinalFood: (cart: FoodItem[]) => void;
}

const FoodList: React.FC<FoodListProps> = ({ FinalFood }) => {
  const [cart, setCart] = useState<{ item: FoodItem; quantity: number }[]>([]);

  const handleAddToCart = (food: FoodItem) => {
    const existingItemIndex = cart.findIndex(item => item.item.id === food.id);
    if (existingItemIndex >= 0) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart((prevCart) => [...prevCart, { item: food, quantity: 1 }]);
    }
    alert(`${food.name} added to cart!`);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(item => item.item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    const updatedCart = cart.map(item =>
      item.item.id === id ? { ...item, quantity } : item
    );
    setCart(updatedCart);
  };

  const handleConfirm = () => {
    console.log("cart", cart);
    FinalFood(cart.map(item => item.item)); // Pass selected food items to the parent component
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.item.price * item.quantity,
    0
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="flex flex-col w-full max-w-7xl p-4">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Food</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Drinks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {drinks.map((drink) => (
            <FoodCard key={drink.id} food={drink} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-800">Desserts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {desserts.map((dessert) => (
            <FoodCard key={dessert.id} food={dessert} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="fixed top-4 right-4 bg-green-600 text-white hover:bg-green-700">
              Confirm
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
            <SheetTitle className="font-bold">Cart Items</SheetTitle>

              <SheetDescription>Review your selected items below.</SheetDescription>
            </SheetHeader>
            <div className="py-4">
              {cart.length === 0 ? (
                <div className="text-gray-500 text-center font-bold">Your cart is empty.</div>
              ) : (
                <ul>
                  {cart.map((item) => (
                    <li key={item.item.id} className="flex justify-between items-center text-gray-700 mb-2">
                      <span>{item.item.name} - Rs {item.item.price.toFixed(2)}</span>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(item.item.id, Number(e.target.value))
                        }
                        className="w-12 text-center border rounded-md p-1"
                      />
                      <Button
                        onClick={() => handleRemoveFromCart(item.item.id)}
                        variant="outline"
                        className="ml-1 bg-red-500 text-white hover:bg-red-600 px-2 py-1 text-xs"

                      >
                        Remove
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <div className="font-bold text-lg mt-4">
                  Total: Rs {totalPrice.toFixed(2)}
                </div>
              )}
            </div>
            <SheetFooter>
              <Button onClick={handleConfirm} className="bg-green-600 text-white hover:bg-blue-700">
                Confirm Cart
              </Button>
              <SheetClose asChild>
                <Button type="button" className="ml-2">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default FoodList;
