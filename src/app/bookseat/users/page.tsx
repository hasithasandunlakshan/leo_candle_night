"use client"
import React, { useContext } from 'react';
import { CartContext } from '@/context/userOrder';
import Users from '@/components/Booking/Users';
import OrderSummary from '@/components/OrderSummery/OrderSummary';

export default function Page() {

  return (
    <div className=' flex bg-transparent w-screen min-h-screen  justify-center overflow-hidden'>
 
     <Users/>
    




    </div>
  );
}
