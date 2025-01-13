"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";

export default function Page({ params }: { params: { index: string } }) {
  interface UserDetails {
    _id: string;
    username: string;
    email: string;
    whatsapp: string;
    isApproved: boolean;
    foodList: string[];
  }

  const [userDetails, setUserDetails] = useState<UserDetails[]>([]);
  const [userDetailsSeats, setUserDetailsSeats] = useState<string[]>([]);
  const details = params.index;

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `/api/userDetails/getUserDetails?index=${details}`
        );
        setUserDetails(response.data.users);
        setUserDetailsSeats(response.data.seats);
      } catch (error) {
        console.log(error);
        alert("Cannot fetch data");
      }
    };
    fetchOrderDetails();
  }, [details]);

  const seat = userDetailsSeats[0];

  return (
    <div className="text-white">
      <div className="flex flex-row items-center justify-center">
        <Image
          src="/images/hero.jpg"
          alt="food"
          // layout="fill"
          objectFit="cover"
          className="rounded-lg flex flex-row items-center justify-center"
          height={500}
          width={300}
        />
   
      </div>

      <div className="mt-4">
        {userDetails.map((user) => (
          <div
            key={user._id}
            className="mt-8 p-4 bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="text-lg font-semibold">
              User Name: {user.username}
            </h3>
            <p>Email: {user.email}</p>
            <p>WhatsApp Number: {user.whatsapp}</p>
            <p>
              Is Approved:{" "}
              <span
                className={`font-bold ${
                  user.isApproved ? "text-green-400" : "text-red-400"
                }`}
              >
                {user.isApproved ? "Yes" : "No"}
              </span>
            </p>
            <p>Food List: {user.foodList.join(", ")}</p>
            <p>Seat: {seat}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
