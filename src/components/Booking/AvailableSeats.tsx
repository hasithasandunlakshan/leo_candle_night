"use client";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/userOrder";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import axios from "axios";

export default function BookSeats() {
  const [seats, setSeats] = useState<any[][]>([]);
  const [selectedSeat, setSelectedSeat] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);
  const useOrder = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("/api/seats/getSeats");
        if (res.status !== 200) {
          console.error("Failed to fetch seat data:", res.statusText);
          alert("Failed to fetch seat data. Please try again.");
        }
        const result = await res.data;
        const tables: any[][] = [];
        for (let i = 0; i < result.seats.length; i += 10) {
          tables.push(result.seats.slice(i, i + 10));
        }
        setSeats(tables);
      } catch (error) {
        console.error("Error fetching seat data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const toggleSeatSelection = (seat: any) => {
    if (!seat.isBooked) {
      setSelectedSeat(seat);
      setShowToast(true);
    }
  };

  const handleConfirm = () => {
    setLoadingSubmit(true);
    try {
      useOrder?.setSeats(selectedSeat);
      router.push("/bookseat/users");
    } catch (error) {
      console.error("Error booking seat:", error);
      alert("Failed to book seat. Please try again.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCancel = () => {
    setSelectedSeat(null);
    setShowToast(false);
  };

  return (
    <div className="bg-transparent min-h-screen w-full flex flex-col items-center relative">
      <h1 className="text-2xl font-bold mb-4 mt-24 md:text-7xl pt-10 text-secondary">
        Book Your Seats
      </h1>

      <div className="sm:w-[70%] w-[90%]  flex justify-center items-center mt-4">
        <Image
          src="/images/arrange.png"
          alt="Top Image"
          width={1400}
          height={600}
          unoptimized
          className="rounded-lg shadow-md h-[80%]"
        />
      </div>

      <h2 className="text-xl mt-4 text-white mx-6">
        When booking your seat, the seat is the combination of the table letter
        and the seat number.
      </h2>
      <h3 className="sm:text-xl text-md mx-6 mt-4 mb-4 text-gray-400">
        Ex - If you want to book seat 1 in table A, select A1
      </h3>

      {loading ? (
       <div className="text-center flex-col align-middle flex bg-primary max-h-screen   items-center justify-center">
       <div
         className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
       ></div>
       <h2 className="text-white  mt-4">Loading Seats</h2>
     
     </div>
      ) : (
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {seats.map((tableSeats, tableIndex) => (
              <div key={tableIndex} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">
                  Table {String.fromCharCode(65 + tableIndex)}
                </h2>
                <div className="flex justify-center flex-wrap gap-2">
                  {tableSeats.map((seat) => (
                    <div
                      key={seat._id}
                      className={`border cursor-pointer rounded-lg p-1 text-center  w-12 transition ${
                        seat.isBooked
                          ? "bg-red-500 text-white"
                          : selectedSeat?.seatNumber === seat.seatNumber
                          ? "bg-green-500 text-white"
                          : "bg-primary hover:bg-secondary text-white"
                      }`}
                      onClick={() => toggleSeatSelection(seat)}
                    >
                      <Image
                        src="/images/seat.png"
                        alt="Seat Icon"
                        width={30}
                        height={30}
                        className="mx-auto  w-4 mb-1"
                      />
                      {seat.seatNumber}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showToast && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
              onClick={handleCancel}
            />
            {/* Toast */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed top-1/3 left-1/8 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-primary rounded-lg border-secondary border p-6 shadow-lg w-180">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 1792 1792"
                      fill="#d5a000"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                    </svg>
                    <span className="text-secondary font-semibold">
                      Seat Selected!
                    </span>
                  </div>
                  <span className="text-white mt-2">
                    Seat {selectedSeat?.seatNumber} selected. Confirm your booking?
                  </span>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm bg-primary rounded text-white hover:bg-secondary focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-secondary  focus:outline-none"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
