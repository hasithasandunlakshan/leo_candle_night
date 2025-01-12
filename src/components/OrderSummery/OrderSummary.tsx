"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CartContext } from "../../context/userOrder"; // Adjust the path as needed

export default function OrderSummary() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const [formData, setFormData] = useState<FormData | null>(null);  // Declare formData as a state

  const cartContext = useContext(CartContext);

  useEffect(() => {
    console.log("cartContext:", cartContext);
  }, [cartContext]);

  if (!cartContext) {
    return <div>No order summary available</div>;
  }

  console.log("cartContext:", cartContext);

  const { users, name, numOfSeat, seats, index } = cartContext;

  console.log("cartContext user:", users);
  const handleSeatBoook = async () => {
    const seatNumbers = 'S2'//meka ain karanna ona
    try{
      const response = await axios.post("/api/seats/bookSeats",{seatNumbers})
      if(response.status === 200){
        alert("seat booked successfully")
      }
    }catch(error){
      console.error("Error sending order to backend:", error);
      alert("Failed to add seat");
    }
  }
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setImagePreview(fileURL);

    const newFormData = new FormData();
    newFormData.append("file", file);
    setFormData(newFormData);  // Update the global formData state
  };

  const uploadImage = async (): Promise<string | null> => {
    try {
      if (!formData) {
        alert("No file selected for upload.");
        return null;
      }

      const response = await fetch("/api/slips/uploadSlips", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Upload response data:", data);  // Log the full response data
      if (data && data.publicId && data.imageUrl) {
        setUploadedImage(data.imageUrl); // Save the uploaded image URL
        console.log("Image uploaded successfully, publicId:", data.publicId);
        return data.imageUrl; // You can now use publicId if needed
      } else {
        console.error("publicId not found in the response:", data);
        return null;
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload image");
      return null;
    }
  };

  const sendOrderToBackend = async (imageUrl: string | null) => {
    if (!imageUrl) {
      alert("Image URL is missing. Please upload the image again.");
      console.log("No image URL, cannot send order");
      return;
    }

    try {
      const orderDetails = users.map((user) => ({
        username: user.username,
        email: user.email,
        whatsapp: user.whatsapp,
        department: user.department,
        foodList: user.foodList,
        totalPrice: user.totalprice,
        batch: user.batch,
        faculty: user.faculty,
        seatNumber: user.seatNumber,
        imageURL: imageUrl, // Pass the uploaded image URL
        isApproved: user.isApproved || false,
      }));

      const data = {
        index,
        numOfSeat,
        seats: seats?.seatNumber ?? "Not selected",
        orderDetails,
      };
      
      const response = await axios.post("/api/user/setUserDetails", data);
      console.log("Order saved successfully:", response.data);
      alert("Order saved successfully!");
    } catch (error) {
      console.error("Error sending order to backend:", error);
      alert("Failed to send order");
    }
  };

  

  const handleOrderSubmission = async () => {
    uploadImage();
    console.log("Starting order submission...");
    const imageUrl = await uploadImage();
    console.log("Image URL:", imageUrl);
    if (imageUrl) {
      await sendOrderToBackend(imageUrl);
    }
    handleSeatBoook();


  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const totalPrice = users.reduce((sum, user) => sum + (user.totalprice || 0), 0);

  return (
    <main className="w-screen align-middle flex items-center justify-center flex-col min-h-screen py-32">
       {/* <h1 className="text-2xl   mb-4 md:text-5xl py-5">Order Summary</h1> */}
      <div className=" border-gray-50 border rounded-xl p-10  w-[90%] text-slate-400">
       
      <p className="mt-2 gap-10 flex">
  Name: <span className="text-white">{name}</span>
</p>
<p className="mt-2 gap-10 flex ">
  Index Num: <span className="text-white">{index}</span>
</p>
<p className="mt-2 gap-10 flex">
  Number of Seats: <span className="text-white ">{numOfSeat}</span>
</p>
<p className="mt-2 gap-10 flex">
  Seat Number:{" "}
  <span key={index} className="inline-block mr-2 text-white">
    {seats ? seats.seatNumber : "Not selected"}
  </span>
</p>

{users.length === 1 ? (
  <ul className="text-slate-400">
    {users.map((user, index) => (
      <li className="" key={index}>
        <p className="mt-2 gap-10 flex">
          Email: <span className="text-white">{user.email}</span>
        </p>
        <p className="mt-2 gap-10 flex">
          Whatsapp: <span className="text-white">{user.whatsapp}</span>
        </p>
        <p className="mt-2 gap-10 flex">
          Department:{" "}
          <span className="text-white">{user.department}</span>
        </p>
        <p className="mt-2 gap-10 flex">
          Food List:{" "}
          <span className="text-white">
            {user.foodList.join(", ")}
          </span>
        </p>
      </li>
    ))}
  </ul>
) : (
  <p className="mt-2 text-gray-500">No users added yet.</p>
)}

        <div className="flex flow-root font-bold  mt-10">
          <h1 className="text-gray-300">Total Price Rs:     </h1>
          <h1 className="mt-2 gap-10 flex">
          Total Price:{" "}
          <span className="text-white">RS: {totalPrice}.00 </span>
        </h1>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }} // Hides the file input
            onChange={handleFileUpload}
          />
          <div className="flex md:gap-10 gap-5 my-3 md:flex-row flex-col items-start">
            <label
              className="text-sm text-slate-500 h-8 justify-around items-center flex w-[64] rounded-md border-0  font-semibold   cursor-pointer"
            >
            Please upload the slip and write the Index on the slip
            </label>
            <button
              onClick={triggerFileInput}
              className="relative cursor-pointer py-1 w-52 border   text-base font-bold rounded-lg overflow-hidden text-primary bg-white transition-all duration-400 ease-in-out hover:scale-105 hover:bg-primary hover:text-white"
            >
            Choose file
            </button>
          </div>
        </div>

        {imagePreview && (
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Slip Preview:</h2>
            <img
              src={imagePreview}
              alt="Preview"
              className="max-w-64 h-auto rounded mt-3"
            />
          </div>
        )}

        <div className="flex items-end justify-end">
          {/* {uploadedImage && (
            <div className="mt-20 text-center">
              <h2 className="text-lg font-semibold">Uploaded Image:</h2>
              <img
                ref={imageRef}
                src={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${uploadedImage}`}
                alt="Uploaded"
                className="max-w-64 h-auto rounded"
              />
            </div>
          )} */}
          
          <button
            onClick={() => { 
             
              handleOrderSubmission()
              
            }}
            className="relative cursor-pointer py-1 mt-10 px-10 max-w-50 text-gray-300 text-base font-bold rounded-lg overflow-hidden bg-transparent border border-white transition-all duration-400 ease-in-out hover:scale-105 hover:text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}