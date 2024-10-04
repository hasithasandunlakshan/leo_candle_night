"use client";

import { createContext, useState, ReactNode } from "react";

// Define the shape of the context, including setter functions
interface CartContextType {
 
  users: any[];
  setUsers: (products: any[]) => void;
  numOfSeat:number;
  setNumOfSeat: (numOfSeat:number) => void;
  name: string;
  setName: (department: string) => void;
  addUser:(user:any)=>void;
 
}

// Create the context with an initial null value
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [name, setName] = useState<string>("");

  const [users, setUsers] = useState<any[]>([]);

  const [numOfSeat,setNumOfSeat] = useState<number>(0);
  

  const addUser = (user:any) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  return (
    <CartContext.Provider
      value={{
      users,
      setUsers,
      name,setName,
numOfSeat,setNumOfSeat,addUser
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
