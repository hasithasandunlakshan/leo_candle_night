"use client";

import { createContext, useState, ReactNode } from "react";

// Define the initial state
const initialState = {
  users: [],
  name: '',
  numOfSeat: 1,
  seats: [],
};

interface CartContextType {
  users: any[];
  setUsers: (users: any[]) => void;
  seats: any[];
  setSeats: (seats: any[]) => void;
  numOfSeat: number;
  setNumOfSeat: (numOfSeat: number) => void;
  name: string;
  setName: (name: string) => void;
  addUser: (user: any) => void;
  resetOrder: () => void;
}

// Create the context with an initial null value
export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [name, setName] = useState<string>(initialState.name);
  const [users, setUsers] = useState<any[]>(initialState.users);
  const [seats, setSeats] = useState<any[]>(initialState.seats);
  const [numOfSeat, setNumOfSeat] = useState<number>(initialState.numOfSeat);

  // Reset function to revert all values back to initial state
  const resetOrder = () => {
    setName(initialState.name);
    setUsers(initialState.users);
    setSeats(initialState.seats);
    setNumOfSeat(initialState.numOfSeat);
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
        seats,
        setSeats,
        numOfSeat,
        setNumOfSeat,
        name,
        setName,
        addUser,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
