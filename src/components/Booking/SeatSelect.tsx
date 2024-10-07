"use client"
import React, { useState, useEffect, useContext } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"
import { CartContext } from "@/context/userOrder"

export default function SeatSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter();
  const useOrder = useContext(CartContext);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(1); 

  const handleCancel = () => {
    router.push("/")
    setIsOpen(false);
  }

  useEffect(() => {
    setIsOpen(true)
  }, [])

  const handleSeatSelection = (seatNumber: number) => {
    setSelectedSeat(seatNumber);
    useOrder?.setNumOfSeat(seatNumber); 
    // router.push("/bookseat/users");
    console.log("kkkkkkkkkkk",useOrder?.numOfSeat)
 
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>How Many Seats Do You Want?</AlertDialogTitle>
          <AlertDialogDescription>
            Please select the number of seats you want.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Render seat selection buttons */}
        <div className="flex space-x-4 my-4">
          {[1, 2, 3, 4, 5].map((seat) => (
            <button
              key={seat}
              onClick={() => handleSeatSelection(seat)}
              className={`border transition-all duration-500 font-extrabold shadow-inner rounded-md px-4 py-2 
                text-white hover:bg-slate-600 border-black
                ${selectedSeat === seat ? "bg-orange-400" : "bg-red-500"}`}
            >
              {seat}
            </button>
          ))}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
