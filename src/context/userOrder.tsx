"use client";

import { createContext, useState, ReactNode } from "react";

// Define the shape of the context, including setter functions
interface CartContextType {
  index: string;
  setIndex: (index: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  seats: string;
  setSeats: (seats: string) => void;
  products: any[];
  setProducts: (products: any[]) => void;
}

// Create the context with an initial null value
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state for index, name, email, seats, and products
  const [index, setIndex] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [seats, setSeats] = useState<string>("");
  const [products, setProducts] = useState<any[]>([]);

  return (
    <CartContext.Provider
      value={{
        index,
        setIndex,
        name,
        setName,
        email,
        setEmail,
        seats,
        setSeats,
        products,
        setProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
