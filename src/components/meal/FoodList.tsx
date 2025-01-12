import React, { useState } from "react";
import FoodCard from "./FoodCard";
import { Button } from "../ui/button";
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
}

// Define the different food categories
const foods: FoodItem[] = [
  { id: 1, name: "Pizza", price: 9.99 },
  { id: 2, name: "Burger", price: 5.99 },
  { id: 3, name: "Sushi", price: 12.99 },
  { id: 4, name: "Pasta", price: 7.99 },
  { id: 5, name: "Salad", price: 4.99 },
];

const drinks: FoodItem[] = [
  { id: 6, name: "Coke", price: 1.99 },
  { id: 7, name: "Water", price: 0.99 },
  { id: 8, name: "Lemonade", price: 2.49 },
];

const desserts: FoodItem[] = [
  { id: 9, name: "Ice Cream", price: 3.99 },
  { id: 10, name: "Cake", price: 4.99 },
  { id: 11, name: "Brownie", price: 2.99 },
];

interface FoodListProps {
  FinalFood: (cart: FoodItem[]) => void;
}

const FoodList: React.FC<FoodListProps> = ({ FinalFood }) => {
  const [cart, setCart] = useState<FoodItem[]>([]);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const handleAddToCart = (food: FoodItem) => {
    setSelectedFood(food);
    setShowToast(true);
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
            <FoodCard
              key={dessert.id}
              food={dessert}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="right-10 bg-secondary text-white hover:bg-primary hover:text-white top-10 fixed"
              >
                Confirm
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Cart Items</SheetTitle>
                <SheetDescription>
                  Review your selected items below.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                {cart.length === 0 ? (
                  <div className="text-gray-500">Your cart is empty.</div>
                ) : (
                  <ul>
                    {cart.map((item) => (
                      <li key={item.id} className="flex justify-between text-gray-700">
                        <span>
                          {item.name} - ${item.price.toFixed(2)}
                        </span>
                        <Button
                          onClick={() => handleRemoveFromCart(item.id)}
                          variant="outline"
                          className="ml-2"
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
                <Button onClick={handleConfirm} className="bg-secondary text-white">
                  Confirm Cart
                </Button>
                <SheetClose asChild>
                  <Button type="button" className="bg-secondary text-white">Close</Button>
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
