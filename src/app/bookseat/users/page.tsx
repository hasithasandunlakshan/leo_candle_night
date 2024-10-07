"use client"
import React, { useContext } from 'react';
import { CartContext } from '@/context/userOrder';
import Users from '@/components/Booking/Users';
import OrderSummary from '@/components/OrderSummery/OrderSummary';

export default function Page() {
  const useOrder = useContext(CartContext); // Make sure CartContext is defined and imported correctly

  return (
    <div>
 
     <Users/>
    




    </div>
  );
}
