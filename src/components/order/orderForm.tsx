"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      router.push(`/orderdetails/${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
      <div className=" shadow-lg rounded-lg w-full max-w-lg p-8 border border-secondary">
        <h1 className="text-3xl font-bold text-secondary text-center mb-6">
        Retrieve Your Ticket Information
        </h1>

        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Enter your NIC"
            value={inputValue}
            onChange={handleChange}
            className="bg-gray-100 w-full px-4 py-3 border border-[#d3c2a3] rounded-lg text-[#6b4f34] focus:outline-none focus:ring-2 focus:ring-[#a58464]"
            required
          />

          <button
            type="submit"
            className="w-full text-white py-3 rounded-lg font-semibold hover:bg-secondary transition duration-200 border-2 border-secondary"
          >
            Submit
          </button>
        </form>

        <div className="mt-6 text-center text-white">
          <p>
          Kindly enter your NIC number to access your ticket details. Ensure the information provided is
accurate for a smooth experience.
          </p>
        </div>
      </div>
    </div>
  );
}
