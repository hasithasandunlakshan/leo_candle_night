"use client";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/context/userOrder";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";

export default function BookSeats() {
  const [seats, setSeats] = useState<any[][]>([]); // Seat layout by table
  const [selectedSeat, setSelectedSeat] = useState<any>(null); // Selected seat
  const [loading, setLoading] = useState<boolean>(true); // API loading state
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false); // Booking loading state
  const [showToast, setShowToast] = useState<boolean>(false); // Toast visibility state
  const useOrder = useContext(CartContext); // Context for seat selection
  const router = useRouter();

  /** 🛠️ Fetch Seat Data from API **/
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/seats/getSeats");
        if (!res.ok) {
          throw new Error(`Failed to fetch seats: ${res.status}`);
        }

        const result = await res.json();
        console.log("Fetched seats:", result);

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
      setShowToast(true); // Show the toast
      setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
    }
  };

  const handleBookSeats = async () => {
    if (!selectedSeat) {
      alert("Please select a seat before proceeding.");
      return;
    }

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

  return (
    <div className="bg-primary min-h-screen w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 mt-24 md:text-7xl pt-10 text-secondary">
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

      <h2 className="text-xl mt-4 text-white">
        When booking your seat, the seat is the combination of the table letter
        and the seat number.
      </h2>
      <h3 className="text-xl mt-4 mb-4 text-gray-400">
        Ex - If you want to book seat 1 in table A, select A1
      </h3>

      {/* 🌀 Loading State */}
      {loading ? (
        <div className="text-white text-2xl mt-10">Loading seats...</div>
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
                      className={`border rounded-lg p-1 text-center w-16 transition ${
                        seat.isBooked
                          ? "bg-red-500 text-white" // Booked seats in red
                          : selectedSeat?.seatNumber === seat.seatNumber
                          ? "bg-green-500 text-white" // Selected seat in green
                          : "bg-primary hover:bg-secondary text-white"
                      }`}
                      onClick={() => toggleSeatSelection(seat)}
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
      )}

      {/* 🚀 Next Button */}
      <motion.button
        onClick={handleBookSeats}
        disabled={loadingSubmit}
        className={`cursor-pointer py-1 my-10 px-14 text-base font-bold rounded-full transition ${
          loadingSubmit
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "border hover:text-white hover:bg-secondary text-white bg-primary border-white"
        }`}
      >
        {loadingSubmit ? "Booking seats..." : "Next"}
      </motion.button>

      {/* 🛑 Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-primary rounded-lg border-secondary border p-3 shadow-lg">
          <div className="flex flex-row">
            <div className="px-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 1792 1792"
                fill= "#d5a000"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
              </svg>
            </div>
            <div className="ml-2 mr-6">
              <span className="font-semibold text-secondary">Seat Selected!</span>
              <span className="block text-white">
              Seat {selectedSeat?.seatNumber} selected. Click &quot;Next&quot; to continue.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
