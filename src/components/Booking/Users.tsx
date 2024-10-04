import React, { useContext, useState } from 'react';
import { CartContext } from '@/context/userOrder';
import { UserDetails } from './UserDetails';

export default function Users() {
  const useOrder = useContext(CartContext); // This should work now
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const seatArray = Array.from({ length: useOrder?.numOfSeat || 0 }, (_, i) => i + 1);


  const handleUserConfirmation = () => {

    setCurrentUserIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      {seatArray.map((seat, index) => (
        index === currentUserIndex ? (
          <UserDetails key={seat} onConfirm={handleUserConfirmation} />
        ) : null
      ))}
    </div>
  );
}
