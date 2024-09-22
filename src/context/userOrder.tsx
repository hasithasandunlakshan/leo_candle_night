"use client";
import { createContext, useState, ReactNode } from "react";

// Define the shape of the context
interface CartContextType {
  index: string;
  name: string;
  email: string;
  seats: string;
  products: any[];
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
    <CartContext.Provider value={{ index, name, email, seats, products }}>
      {children}
    </CartContext.Provider>
  );
};
