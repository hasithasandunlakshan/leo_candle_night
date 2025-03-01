"use client";
import React, { useState, useEffect, useContext } from "react";
import FoodCard from "./FoodCard";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
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
import Image from "next/image";
import { CartContext } from "@/context/userOrder";


interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;    
}

const drinks: FoodItem[] = [
  // { id: 1, name: "Welcome Drink", price: 200, image: "/images/meals/welcomedrink.jpg", description: "" },
  { id: 2, name: "Falooda", price: 300, image: "/images/meals/falooda.jpg", description: "" },
  { id: 3, name: "Chocolate Milkshake", price: 350, image: "/images/meals/milkshake.jpeg", description: "" },
  { id: 4, name: "Coke", price: 200, image: "/images/meals/coke.jpg", description: "" },
  { id: 5, name: "Sprite", price: 200, image: "/images/meals/sprite.jpg", description: "" },
];

const foods: FoodItem[] = [
  { id: 6, name: "Chicken Lamprais", price: 750, image: "/images/meals/Lamprais.jpg", description: "Served with lentil curry,potato curry ,egg plant pickle ,chillipaste ,papadam" },
  { id: 7, name: "Fish Lamprais", price: 750, image: "/images/meals/fishlamp.jpg", description: "Served with lentil curry,potato curry ,egg plant pickle ,chillipaste ,papadam" },
  { id: 8, name: "Chicken Kottu", price: 650, image: "/images/meals/chickenkottu.jpg", description: "" },
  { id: 9, name: "Vegetable Kottu", price: 550, image: "/images/meals/vegikootu.jpg", description: "" },
  { id: 10, name: "Cheese Kottu", price: 950, image: "/images/meals/cheesekottu.jpg", description: "" },
  { id: 11, name: "Idiappam(15pcs)", price: 375, image: "/images/meals/indiappa.jpg", description: "" },

  { id: 12, name: "Dosa(2pcs) with Chicken Curry", price: 700, image: "/images/meals/dosa.jpg", description: "" },
  { id: 13, name: "Dosa(2pcs) with Fish Curry", price: 700, image: "/images/meals/dosa.jpg", description: "" },
  { id: 15, name: "Dosa(2pcs) with Sambaru", price: 700, image: "/images/meals/dosa.jpg", description: "" },
  { id: 14, name: "Chicken Biriyani", price: 900, image: "/images/meals/Chickenbiriyani.jpg", description: "Served with raita and a boiled egg" },
  { id: 16, name: "Mutton Biriyani", price: 1150, image: "/images/meals/muttonbiriyani.jpg", description: "Served with raita and a boiled egg" },
  { id: 18, name: "Nasi Goreng", price: 900, image: "/images/meals/nasiguran.jpg", description: "" },
  { id: 17, name: "Sausage Pizza(3 slices)", price: 850, image: "/images/meals/saupizza.jpg", description: "" },
  { id: 19, name: "Pizza(2 pics)", price: 1100, image: "/images/meals/pizza.jpg", description: "with chicken mini sub (6inch) " },
  { id: 20, name: "Pasta", price: 900, image: "/images/meals/pasta.jpg", description: "" },
  { id: 21, name: "Naan(2pcs)", price: 800, image: "/images/meals/naan.jpg", description: "Served with butter chicken and lentilcurry" },
];

const desserts: FoodItem[] = [
  { id: 22, name: "Biscuit Pudding", price: 250, image: "/images/meals/pudding.jpg", description: "" },
  { id: 23, name: "Vanilla Ice Cream", price: 150, image: "/images/meals/vice.jpg", description: "" },
  { id: 24, name: "Chocolate Ice Cream", price: 170, image: "/images/meals/cice.jpg", description: "" },
  { id: 25, name: "Kesari", price: 350, image: "/images/meals/kesari.jpg", description: "" },
  { id: 26, name: "Kaum", price: 90, image: "/images/meals/Kaum.jpg", description: "" },
  { id: 27, name: "Kokis", price: 40, image: "/images/meals/Kokis.jpg", description: "" },
  { id: 28, name: "Kiri Pani", price: 200, image: "/images/meals/KiriPani.jpg", description: "" },
  { id: 29, name: "Watalappan", price: 200, image: "/images/meals/wat.jpeg", description: "" },
];

interface FoodListProps {
  FinalFood: (cart: FoodItem[]) => void;
}

const FoodList: React.FC<FoodListProps> = ({ FinalFood }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartContext is not provided!");
  }

  const { cartLocal, addToCart, removeFromCart } = cartContext;
  const [cart, setCart] = useState<FoodItem[]>(cartLocal);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isCartButtonVisible, setIsCartButtonVisible] = useState<boolean>(true);


  const handleAddToCart = (food: FoodItem) => {
    if (!cart.some((item) => item.id === food.id)) {
      setSelectedFood(food);
      addToCart(food);
      setShowToast(true);
    } else {
      alert("Item already in the cart");
    }
  };

  const confirmAddToCart = (confirm: boolean) => {
    if (confirm && selectedFood) {
      setCart((prevCart) => [...prevCart, selectedFood]);
    }
    setShowToast(false);
    setSelectedFood(null);
    setIsSheetOpen(true);
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    removeFromCart(id);
  };

  const handleConfirm = () => {
    FinalFood(cartLocal);
    setIsSheetOpen(false);
    setIsCartButtonVisible(true); // Show the cart button after purchase
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (isSheetOpen) {
      setIsCartButtonVisible(false); // Hide the cart button when sheet is open
    }
  }, [isSheetOpen]);

  return (

    <div className="flex w-full z-0 justify-center">
      {/* Blur Background */}


      {showToast && <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-10"></div>}

      <div className="flex flex-col w-full justify-center items-center">
        {/* Foods */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:text-7xl pt-10 text-secondary my-10">
          Food Items
        </h2>
        <div className="grid-cols-1 place-content-center place-items-center sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onAddToCart={handleAddToCart} />
          ))}
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold md:text-7xl py-0 text-secondary my-10 mt-20">
          Drinks
        </h2>
        <div className="grid-cols-1 place-content-center place-items-center  sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle">
          {drinks
            .filter((drink) => drink.id !== 15)
            .map((drink) => (
              <FoodCard key={drink.id} food={drink} onAddToCart={handleAddToCart} />
            ))}
        </div>

        {/* Desserts */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 md:text-7xl py-0 text-secondary my-10">
          Desserts
        </h2>
        <div className="grid-cols-1 place-content-center place-items-center sm:grid-cols-2 lg:grid-cols-4 w-[90%] grid justify-center align-middle">
          {desserts.map((dessert) => (
            <FoodCard key={dessert.id} food={dessert} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {/* Cart Sheet */}
        <Sheet open={isSheetOpen} onOpenChange={(open) => {
          setIsSheetOpen(open);
          setIsCartButtonVisible(!open); // Toggle cart button visibility based on sheet state
        }}>
          {isCartButtonVisible && (
            <SheetTrigger asChild>
              <div className="fixed right-5 top-20 z-50 text-center">
                <button className="bg-primary border-2 border-white text-secondary p-3 rounded-full hover:bg-white hover:text-primary relative">
                  <BsCart4 size={24} />
                </button>
                <p className="mt-1 text-sm text-white">CART</p>
              </div>
            </SheetTrigger>
          )}
          <SheetContent className="bg-primary bg-opacity-85">
            <SheetHeader>
              <SheetTitle className="font-bold text-secondary text-2xl">Cart Items</SheetTitle>
              <SheetDescription>Review your selected items below.</SheetDescription>
<SheetDescription>
  If you want to add more items to cart select &quot;Continue&quot;. If you are done choosing food Items please select &quot;Purchase&quot;.
</SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4 ">
              
                              {/* <li
                    className="flex justify-between my-2 w-full bg-gray-800/80 p-2 rounded-xl text-sm sm:text-lg text-gray-200 items-center align-middle"
                  >
                    <div className="flex w-[80%] gap-2">
                      <Image
                        src="/images/meals/welcomedrink.jpg"
                        width={50}
                        height={20}
                        alt="Welcome"
                        className="rounded-xl max-h-32"
                      />
                      <span>
                        Welcome Drink <br /> RS: 0.00
                      </span>
                    </div>
                    <MdDelete
                      className="text-red-600 text-xl cursor-pointer hover:scale-110 transition-all duration-150"
                      onClick={() => handleRemoveFromCart(0)} // Set a dummy ID (0) since item.id is removed
                    />
                  </li> */}
                  {/* <li
                    className="flex justify-between my-2 w-full bg-gray-800/80 p-2 rounded-xl text-sm sm:text-lg text-gray-200 items-center align-middle"
                  >
                    <div className="flex w-[80%] gap-2">
                      <Image
                        src="/images/meals/entry.jpg"
                        width={50}
                        height={20}
                        alt="Welcome"
                        className="rounded-xl max-h-32"
                      />
                      <span>
                        Entrace Fee <br /> RS: 0.00
                      </span>
                    </div>
                    <MdDelete
                      className="text-red-600 text-xl cursor-pointer hover:scale-110 transition-all duration-150"
                      onClick={() => handleRemoveFromCart(0)} // Set a dummy ID (0) since item.id is removed
                    />
                  </li> */}



              {cart.length === 0 ? (
                <div className="text-black-500 font-bold">Your cart is empty.</div>
              ) : (
                <ul className="max-h-72 overflow-y-scroll">
                  
                  {cart.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between my-2 w-full   bg-gray-800/80 p-2 rounded-xl text-sm sm:text-lg text-gray-200 items-center align-middle"
                    >
                      
                      <div className="flex w-[80%] gap-2">
                        <Image
                          src={item.image}
                          width={50}
                          height={20}
                          alt={item.name}
                          className="rounded-xl max-h-32"
                        />
                        <span>
                          {item.name} <br /> RS: {item.price.toFixed(2)}
                        </span>
                      </div>
                      <MdDelete
                        className="text-red-600 text-xl cursor-pointer hover:scale-110 transition-all duration-150"
                        onClick={() => handleRemoveFromCart(item.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            {cart.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm text-gray-300 flex justify-between items-center">
            <span>Welcome Drink</span>
            <span className="text-secondary">Free</span>
          </div>
          <div className="text-sm text-gray-300 flex justify-between items-center">
            <span>Entrance</span>
            <span className="text-secondary">Free</span>
          </div>
          <div className="font-bold text-white">
            Total: RS {totalPrice.toFixed(2)}
          </div>
        </div>
      )}
            </div>
            <SheetFooter>
              <Button onClick={handleConfirm} className="text-secondary">
                Confirm Cart
              </Button>
              <SheetClose asChild>
                <Button type="button" className="text-white mb-2 sm:mb-0">
                  Select More
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