"use client";

import { createContext, useState, ReactNode, useMemo } from "react";

// Define the initial state
const initialState = {
  users: [],
  name: '',
  index: '', // Index initialized as an empty string
  numOfSeat: 1,
  seats:  null, // Initial seat configuration
  cartLocal:[]
};
interface FoodItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}
type Seat = {

  seatNumber: number;
  isBooked: boolean;
 
};
interface CartContextType {
  users: any[];
  setUsers: (users: any[]) => void;

  seats: Seat|null;
  setSeats: (name: Seat|null) => void;
  numOfSeat: number;
  setNumOfSeat: (numOfSeat: number) => void;
  name: string;
  setName: (name: string) => void;
  index: string;
  setIndex: (index: string) => void; 
  addUser: (user: any) => void;
  resetOrder: () => void;
  cartLocal: FoodItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (id: number) => void;
  totalPrice: number;
}

// Create the context with an initial null value
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>(initialState.name);
  const [users, setUsers] = useState<any[]>(initialState.users);
  const [seats, setSeats] = useState<Seat|null>(initialState.seats);
  const [numOfSeat, setNumOfSeat] = useState<number>(initialState.numOfSeat);
  const [index, setIndex] = useState<string>(initialState.index); // Add state for index
  const [cartLocal, setCartLocal] = useState<FoodItem[]>(initialState.cartLocal);
  const totalPrice = useMemo(
    () => cartLocal.reduce((total, item) => total + item.price, 0),
    [cartLocal]
  );

  // Reset function to revert all values back to initial state
  const resetOrder = () => {
    setName(initialState.name);
    setUsers(initialState.users);
    setSeats(initialState.seats);
    setNumOfSeat(initialState.numOfSeat);
    setIndex(initialState.index); // Reset index as well
    setCartLocal(initialState.cartLocal)
  };
  const addToCart = (item: FoodItem) => {
    if (!cartLocal.some((cartItem) => cartItem.id === item.id)) {
      setCartLocal((prevCart) => [...prevCart, item]);
    }
  };

  // Remove item from cart
  const removeFromCart = (id: number) => {
    setCartLocal((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Reset the cart
  const resetCart = () => {
    setCartLocal([]);
  };


  // Add a user to the users array
  const addUser = (user: any) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <CartContext.Provider
      value={{
        users,
        setUsers,
        totalPrice,
        seats,
        setSeats,
        numOfSeat,
        setNumOfSeat,
        name,
        setName,
        index,
        setIndex,
        addUser,
        resetOrder,
        cartLocal,
    
        addToCart,
        removeFromCart,
        
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
