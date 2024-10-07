"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "@/context/userOrder";
import { useRouter } from "next/navigation";

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
      setSeats(response.data.seats || []); // Ensure response data is set to an array
      router.push("/bookseat/users");
    } catch (error) {
      console.error("Error booking seats:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">Book Your Seats</h1>
      <div className="seat-grid">
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
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleBookSeats}
        disabled={selectedSeats.length === 0}
      >
        Book Selected Seats
      </button>
      <style jsx>{`
        .seat-grid {
          display: grid;
          grid-template-columns: repeat(10, 50px); /* Adjust for 10 columns */
          gap: 10px;
          margin: 20px 0;
        }
      `}</style>
    </div>
  );
}
