"use client"
import Availableseats from '@/components/Booking/AvailableSeats';
import SeatSelect from '@/components/Booking/SeatSelect'
import { UserDetails } from '@/components/Booking/UserDetails'
import Users from '@/components/Booking/Users';
import FoodList from '@/components/meal/FoodList';
import { CartContext } from '@/context/userOrder';

import React, { useContext, useEffect } from 'react'

export default function Page() {
  
const useOrder=useContext(CartContext);


  return (
    <>
     <SeatSelect/> 
  
     <Availableseats/>
 
   
    </>
  )
}
