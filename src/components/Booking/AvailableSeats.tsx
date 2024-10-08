"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "@/context/userOrder";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Define the Seat type
type Seat = {
  seatNumber: number;
  isBooked: boolean;
};

export default function BookSeats() {
  const [seats, setSeats] = useState<Seat[]>([]); // Ensure it's always an array
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const useOrder = useContext(CartContext);
  const router = useRouter();
  const useorder=useContext(CartContext);

  useEffect(() => {
    // Fetch seats from the API
    async function fetchSeats() {
      try {
        const response = await axios.get("/api/seats/getSeats");
        setSeats(response.data.seats || []); // Ensure data is being set to an array
        console.log("Seats fetched:", response.data.seats);
      } catch (error) {
        console.error("Error fetching seats:", error);
      }
    }
    fetchSeats();
  }, []);

  // Handle seat selection with CartContext
  const toggleSeatSelection = (seatNumber: number) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else {
      if (useOrder) {
        if (selectedSeats.length < useOrder.numOfSeat) {
          setSelectedSeats([...selectedSeats, seatNumber]);
        
        } else {
          alert(`You can only select up to ${useOrder.numOfSeat} seats.`);
        }
      } else {
        alert("Refresh");
      }
    }
  };

  // Handle booking submission
  const handleBookSeats = async () => {
    if (selectedSeats.length === 0) return;
    try {
      await axios.post("/api/seats/bookSeats", { seatNumbers: selectedSeats });
      alert("Seats booked successfully!");
      setSelectedSeats([]); // Clear selected seats
      // Re-fetch updated seats
      const response = await axios.get("/api/seats/getSeats");
      setSeats(response.data.seats || []);
      useOrder?.setSeats(selectedSeats);
    // Ensure response data is set to an array
      router.push("/bookseat/users");
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  return (
    <div className=" bg-primary w-screen min-h-screen justify-center flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 md:text-7xl py-5 text-secondary ">Book Your Seats</h1>
      <div className=" grid grid-cols-4 sm:grid-cols-8  md:grid-cols-10 lg:grid-cols-12 gap-2">
        {seats?.map((seat, key) => (

          <div
            key={seat.seatNumber}
            className={`border rounded-lg p-2 text-center transition ${
              seat.isBooked
                ? "bg-red-500 text-white"
                : selectedSeats.includes(seat.seatNumber)
                ? "bg-green-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            onClick={() =>
              !seat.isBooked && toggleSeatSelection(seat.seatNumber)
            }
          >
            {seat.seatNumber}
          </div>
        ))}
 
      </div>
    

      <motion.button  onClick={handleBookSeats}

  className="relative cursor-pointer py-1 mt-10 px-10 max-w-50 text-black text-base font-bold nded-full overflow-hidden bg-secondary rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white z-50 hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-amber-500 before:to-amber-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
 Next
</motion.button>

    
    </div>
  );
}
