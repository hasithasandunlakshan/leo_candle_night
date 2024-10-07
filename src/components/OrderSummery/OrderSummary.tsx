"use client"
import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/userOrder"; // Adjust the path as needed

export default function OrderSummary() {
  // Access the context using useContext
  const cartContext = useContext(CartContext);

  // Log the cartContext once the component is mounted
  useEffect(() => {
    console.log("cartContext:", cartContext);
  }, [cartContext]);

  // If context is null, handle it gracefully
  if (!cartContext) {
    return <div>No order summary available</div>;
  }

  // Destructure the necessary values from context
  const { users, name, numOfSeat } = cartContext;

  return (
    <div>
      <h2>Order Summary</h2>

      {/* Display the name */}
      {/* <p>Name: {name}</p> */}

      {/* Display the number of seats */}
      <p>Number of Seats: {numOfSeat}</p>

      {/* Display the users (if any) */}
      <h3>Users</h3>
      {users.length > 0 ? (
        <ul>
          {users.map((user, index) => (
            <li className="border-black" key={index}>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Whatsapp: {user.whatsapp}</p>
              <p>Department: {user.department}</p>
              <p>Food List: {user.foodList.join(", ")}</p> 
            </li>
          ))}
        </ul>
      ) : (
        <p>No users added yet.</p>
      )}
    </div>
  );
}
