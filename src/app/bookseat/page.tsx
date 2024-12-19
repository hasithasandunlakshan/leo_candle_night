"use client"
import Availableseats from '@/components/Booking/AvailableSeats';
import Image from 'next/image';
import React from 'react';

export default function Page() {
  return (
    <>
      <div className="flex bg-primary min-h-screen flex-col">
       
        

        {/* Available Seats Component */}
        <Availableseats />
      </div>
    </>
  )
}

