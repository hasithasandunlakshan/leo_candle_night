"use client";

import { useRouter } from "next/navigation";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";
import { useState } from "react";

export default function OrderForm() {
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");

  const placeholders = [
   "Add your index","Get your Ticket Details"
  ];

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
    <div className="h-[40rem] flex flex-col justify-center items-center px-4">





      <div className="flex bg-black py-10 items-center justify-center align-middle px-10 rounded-xl my-10">
      <h2 className=" text-xl text-center sm:text-5xl font-semibold text-secondary ">
      Get your ticket Details
      </h2>

      </div>

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
        
      
      />
     
    </div>
  );
}