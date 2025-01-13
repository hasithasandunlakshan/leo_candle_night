import React, { useContext, useState } from 'react';
import { CartContext } from '@/context/userOrder';
import { UserDetails } from './UserDetails';
import OrderSummary from '../OrderSummery/OrderSummary';

export default function Users() {
  const useOrder = useContext(CartContext); // This should work now



  return (
    <div className=' bg-primary w-full min-h-screen  m-0  flex justify-center items-center'>


          <UserDetails />



    </div>
  );
}
