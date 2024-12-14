"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "@/context/userOrder";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { string } from "zod";

// Define the Seat type

const seatsdemo=[
  { "seatNumber": 1, "isBooked": false, "seatName": "Seat-1" },
  { "seatNumber": 2, "isBooked": true, "seatName": "Seat-2" },
  { "seatNumber": 3, "isBooked": false, "seatName": "Seat-3" },
  { "seatNumber": 4, "isBooked": false, "seatName": "Seat-4" },
  { "seatNumber": 5, "isBooked": false, "seatName": "Seat-5" },
  { "seatNumber": 6, "isBooked": false, "seatName": "Seat-6" },
  { "seatNumber": 7, "isBooked": false, "seatName": "Seat-7" },
  { "seatNumber": 8, "isBooked": false, "seatName": "Seat-8" },
  { "seatNumber": 9, "isBooked": false, "seatName": "Seat-9" },
  { "seatNumber": 10, "isBooked": false, "seatName": "Seat-10" }
]

type Seat = {

  seatNumber: number;
  isBooked: boolean;
  seatName:string;
};

export default function BookSeats() {
  const [seats, setSeats] = useState<Seat[]>(seatsdemo); // Ensure it's always an array
  const [selectedSeats, setSelectedSeats] = useState<Seat|null>(null);
  const [loadingSeats, setLoadingSeats] = useState<boolean>(false); // Loading state for fetching seats
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false); // Loading state for submitting booking
  const useOrder = useContext(CartContext);
  const router = useRouter();

  // useEffect(() => {
  //   // Fetch seats from the API
  //   async function fetchSeats() {
  //     setLoadingSeats(true); // Start loading
  //     try {
  //       const response = await axios.get("/api/seats/getSeats");
  //       setSeats(response.data.seats || []); // Ensure data is being set to an array
  //       console.log("Seats fetched:", response.data.seats);
  //     } catch (error) {
  //       console.error("Error fetching seats:", error);
  //     } finally {
  //       setLoadingSeats(false); // Stop loading
  //     }
  //   }
  //   fetchSeats();
  // }, []);

  // Handle seat selection with CartContext
  const toggleSeatSelection = (seat: Seat) => {
    // if (selectedSeats.includes(seatNumber)) {
    //   setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
  
   
   
        if (useOrder) {
          setSelectedSeats(seat)
          alert(`Are you sure`);
        } else {
          alert(`You can only select up to  seats.`);
        }
      
    }
  ;

  // Handle booking submission
  const handleBookSeats = async () => {
    if (selectedSeats ===null) return;

    setLoadingSubmit(true); // Start loading on submit
    try {
      // await axios.post("/api/seats/bookSeats", { seatNumbers: selectedSeats });
      alert("Seats booked successfully!");
       // Clear selected seats
       useOrder?.setSeats(selectedSeats);
      // Re-fetch updated seats
      // const response = await axios.get("/api/seats/getSeats");
      setSelectedSeats(null);
      // setSeats(response.data.seats || []);
      // useOrder?.setSeats(selectedSeats);

      router.push("/bookseat/users");
    } catch (error) {
      console.error("Error booking seats:", error);
    } finally {
      setLoadingSubmit(false); // Stop loading after submit
    }
  };

  return (
    <div className="bg-primary min-h-screen w-[80%] justify-center flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 md:text-7xl py-5 text-secondary">
        Book Your Seats
      </h1>

      {loadingSeats ? (
        <p className="text-white text-2xl">Loading seats...</p> // Show loading message while fetching seats
      ) : (
        <div className="grid grid-cols-4 sm:grid-cols-8 w-[80%] md:grid-cols-10 lg:grid-cols-12 gap-2">
          {seats.map((seat) => (
            <div
              key={seat.seatNumber}
              className={`border rounded-lg p-1 text-center transition ${
                seat.isBooked
                  ? "bg-red-500 text-white"
                  : selectedSeats?.seatNumber===seat.seatNumber
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() =>
                !seat.isBooked && toggleSeatSelection(seat)
              }
            >
              {seat.seatNumber}
            </div>
          ))}
        </div>
      )}

      <motion.button
        onClick={handleBookSeats}
        disabled={loadingSubmit} // Disable button while submitting
        className={`cursor-pointer py-1 my-10 px-14 text-base font-bold overflow-hidden rounded-full transition ${
          loadingSubmit
            ? "bg-gray-400 text-white cursor-not-allowed" // Styling for disabled state
            : "hover:text-white hover:bg-primary text-black bg-secondary"
        }`}
      >
        {loadingSubmit ? "Booking seats..." : "Next"}
      </motion.button>
    </div>
  );
}
