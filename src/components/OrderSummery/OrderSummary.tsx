"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CartContext } from "../../context/userOrder"; // Adjust the path as needed

export default function OrderSummary() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const cartContext = useContext(CartContext);

  useEffect(() => {
    console.log("cartContext:", cartContext?.seats?.seatName);
  }, [cartContext]);

  if (!cartContext) {
    return <div>No order summary available</div>;
  }

  const { users, name, numOfSeat ,seats,index} = cartContext;

  const sendOrderToBackend = async () => {
    try {
      const response = await axios.post("/api/user/setUserDetails", {
        users,
      });

      console.log("Order saved successfully:", response.data);
      alert("Order saved successfully!");
    } catch (error) {
      console.error("Error sending order to backend:", error);
      alert("Failed to send order");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/slips/uploadSlips", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setUploadedImage(data.publicId);
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };
  const totalPrice = users.reduce((sum, user) => sum + (user.totalprice || 0), 0);

  return (

    <main className="w-screen  align-middle  flex items-center justify-center   min-h-screen  bg-primary">
 <div className=" py-32">
         <h1 className="text-2xl font-bold mb-4 md:text-5xl py-5 text-secondary ">Order Summary</h1>
      <p className="mt-2 text-secondary">Name: {name}</p>
      <p className="mt-2 text-secondary">Index Num: {index}</p>
      <p className="mt-1 text-secondary">Number of Seats: {numOfSeat}</p>
      <p className="mt-1 text-secondary">Seats: 
 
    <span key={index} className="inline-block mr-2">
       {seats?  seats.seatName:"Not selected"} 
    </span>
  
</p>
      <h3 className="mt-4 text-xl font-semibold text-secondary">Users</h3>
      {users.length > 0 ? (
        <ul className="mt-2">
          {users.map((user, index) => (
            <li
              className="border  rounded-lg p-4 mb-2 bg-gray-50"
              key={index}
            >
              <p className="text-gray-800">Username: {user.username}</p>
              <p className="text-gray-700">Email: {user.email}</p>
              <p className="text-gray-700">Whatsapp: {user.whatsapp}</p>
              <p className="text-gray-700">Department: {user.department}</p>
              <p className="text-gray-700">Food List: {user.foodList.join(", ")}</p>
              <p className="text-gray-700">Food List: {user.totalprice}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-gray-500">No users added yet.</p>
      )}

      
<div className="flex flow-root">
    <h1 className=" text-secondary">Total Rs:{totalPrice}.00</h1>
<input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hides the file input
        onChange={handleFileUpload}
      />
<div className="flex gap-1 justify-between align-middle items-center">
<label
        //   for="custom-input"
          className=" text-sm text-slate-500 h-8 justify-around items-center flex align-middle w-[60%] 
            rounded-md border-0 text-sm font-semibold bg-pink-50
            text-pink-700 hover:bg-pink-100 cursor-pointer"
        >
          Choose file
        </label>
        <button
        onClick={triggerFileInput}
         className="relative cursor-pointer py-1 w-[40%] max-w-50 text-black text-base font-bold nded-full overflow-hidden bg-secondary rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white z-50 hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-amber-500 before:to-amber-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
      >
        Upload Slip
      </button>
</div>
      

</div>
<div className="flex items-end justify-end">
      {uploadedImage && (


        <div className="mt-20 text-center ">
          <h2 className="text-lg font-semibold">Uploaded Image:</h2>
          <img
            ref={imageRef}
            src={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${uploadedImage}`}
            alt="Uploaded"
            className="max-w-full h-auto rounded"
          />
        </div>
      )}

      <button
        onClick={sendOrderToBackend}
         className="relative cursor-pointer py-1 z-0  mt-10 px-10 max-w-50 text-black text-base font-bold nded-full overflow-hidden bg-secondary rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white z-50 hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-amber-500 before:to-amber-400 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
      >
        Place Order
      </button>
      </div>
    </div>
    </main>
   
  );
}
