"use client";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/userOrder";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";


///////
////////
//////////
/////////////
//////////
////////
//me tika hasitha dapu dummy data. me tika ain karala data kiyala thiyana eken seats tika ganin.
const tables = "ABCDEFGHIJKLMNOP".split(""); // Tables from A to P
const seatsPerTable = 10;

// Generate seat data grouped by table
const seatsdemo = tables.map((table) =>
  Array.from({ length: seatsPerTable }, (_, index) => ({
    isBooked: false, // Default to false
    seatNumber: `${table}${index + 1}`, // Seat name: TableLetter + SeatNumber
  }))
);



export default function BookSeats() {
  const [seats, setSeats] = useState(seatsdemo);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const useOrder = useContext(CartContext);
  const router = useRouter();
    const [data, setData] = useState(null);///////////////////////////////////////////////menna mekata enne seat tika

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/seats/getSeats');
      const result = await res.json();
      setData(result);
      console.log(result);
    }
    fetchData();
  }, []);

  const toggleSeatSelection = (seat: any) => {
    if (useOrder) {
      setSelectedSeat(seat);
      alert(`Are you sure?`);
    }
  };



  const handleBookSeats = async () => {
    if (selectedSeat === null) return;

    setLoadingSubmit(true);
    try {
      alert("Seats booked successfully!");
      useOrder?.setSeats(selectedSeat);
      setSelectedSeat(null);
      router.push("/bookseat/users");
    } catch (error) {
      console.error("Error booking seats:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };




  return (
    <div className="bg-primary min-h-screen w-[100%] justify-center flex flex-col items-center">



      <h1 className="text-2xl font-bold mb-4 md:text-7xl pt-10 text-secondary ">
        Book Your Seats
      </h1>

      <div className="w-full flex justify-center items-center mt-4">
        <Image
          src="/images/arrange.png"
          alt="Top Image"
          width={1400}
          height={600}
          unoptimized
          className="rounded-lg shadow-md"
        />
      </div>

      <h2 className="text-xl items-left justify-start mt-4 text-white">
      When booking your seat, the seat is the combination of the table letter and the seat number.
      </h2>
      <h3 className="text-xl items-left mt-4 mb-4 text-gray-400">
      
        Ex - If you want to book seat 1 in table A, select A1</h3>

        <div className="w-full px-4">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {seats.map((tableSeats, tableIndex) => (
      <div key={tableIndex} className="mb-8">
        {/* Table Heading */}
        <h2 className="text-2xl font-bold text-white mb-4 text-center">
          Table {tables[tableIndex]} {/* Dynamically display the table name */}
        </h2>

        {/* Seats under the table */}
        <div className="flex justify-center flex-wrap gap-2">
          {tableSeats.map((seat) => (
            <div
              key={seat.seatNumber}
              className={`border rounded-lg p-1 text-center w-16 transition ${
                seat.isBooked
                  ? "bg-red-500 text-white"
                  : selectedSeat?.seatNumber === seat.seatNumber
                  ? "bg-green-500 text-white"
                  : "bg-primary hover:bg-secondary text-white"
              }`}
              onClick={() => !seat.isBooked && toggleSeatSelection(seat)}
            >
              <Image
                src="/images/seat.png"
                alt="Seat Icon"
                width={30}
                height={30}
                className="mx-auto mb-1"
              />
              {seat.seatNumber}
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>



      <motion.button
        onClick={handleBookSeats}
        disabled={loadingSubmit}
        className={`cursor-pointer py-1 my-10 px-14 text-base font-bold overflow-hidden rounded-full transition ${
          loadingSubmit
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "border hover:text-white hover:bg-secondary text-white bg-primary border-white"
        }`}
      >
        {loadingSubmit ? "Booking seats..." : "Next"}
      </motion.button>
    </div>
  );
}
