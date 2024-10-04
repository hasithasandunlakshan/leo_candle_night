"use client";
import { CartContext } from "@/context/userOrder";
import React, { useContext, useState } from "react";

export function Availableseats() {
  // Create an array of seat numbers from 1 to 50
  const seatNumbers = Array.from({ length: 50 }, (_, index) => index + 1);
  

  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
const useOrder=useContext(CartContext);

  const toggleSeat = (seat: number) => {
    if (selectedSeats.includes(seat)) {
   
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      
      if(useOrder){
        if (selectedSeats.length < useOrder?.numOfSeat) {
          setSelectedSeats([...selectedSeats, seat]);
        }
        else {
          alert(`You can only select up to ${useOrder?.numOfSeat} seats.`);
        }
      }
      
       else {
        alert("Refresh");
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Available Seats</h2>
      <div className="grid grid-cols-10 gap-4">
        {seatNumbers.map((seat) => (
          <div
            key={seat}
            className={`border rounded-lg p-2 text-center transition ${
              selectedSeats.includes(seat)
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() => toggleSeat(seat)}
          >
            {seat}
          </div>
        ))}
      </div>
    
    </div>
  );
}
