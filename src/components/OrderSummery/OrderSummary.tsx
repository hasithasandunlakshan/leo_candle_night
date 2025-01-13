"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CartContext } from "../../context/userOrder"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import ProcessingOrder from "../Loading/ProcessingOrder";

export default function OrderSummary() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false); // To handle the loading state
  const [showThankYou, setShowThankYou] = useState(false); // To show the "Thank You" message

  const [formData, setFormData] = useState<FormData | null>(null);  // Declare formData as a state

  const cartContext = useContext(CartContext);
  const router = useRouter();
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
  
      const response = await axios.post("/api/slips/uploadSlips", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the correct content type
        },
      });
  
      if (response.status === 200) {
        console.log("Image uploaded successfully");
        alert("Image uploaded successfully");
      }
  
      const data = response.data; // Directly access response.data
      console.log("Upload response data:", data);
  
      if (data && data.publicId && data.imageUrl) {
        setUploadedImage(data.imageUrl); // Save the uploaded image URL
        console.log("Image uploaded successfully, publicId:", data.publicId);
        return data.imageUrl; // Return the uploaded image URL
      } else {
        console.error("Invalid response structure:", data);
        alert("Failed to upload image: Invalid response structure.");
        return null;
      }
    } catch (error: any) {
      console.error("Error uploading image:", error.message || error);
      alert("Failed to upload image. Please try again later.");
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
    setLoading(true); // Start loading
    try {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        await sendOrderToBackend(imageUrl);
        await handleSeatBoook();
        cartContext.resetOrder();
        setShowThankYou(true); // Show the Thank You message
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const totalPrice = users.reduce((sum, user) => sum + (user.totalprice || 0), 0);
  if (loading) {
    return (
     <ProcessingOrder/>
    );
  }


  if (showThankYou) {
    return (
      <div className="h-screen flex items-center align-middle justify-center">
      <div className="p-6  md:mx-auto">
        <svg viewBox="0 0 24 24" className="w-16 h-16 mx-auto my-6 text-green-600">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>
        <div className="text-center">
            <h3 className="text-base font-semibold text-center text-gray-100 md:text-2xl">Payment Done!</h3>
            <p className="my-2 text-gray-600">Thank you for completing your secure online payment.</p>
            <p> Have a great day!  </p>
            <button
              onClick={()=>router.push("/")}
            className="relative cursor-pointer py-1 mt-10 px-10 max-w-50 text-gray-300 text-base font-bold rounded-lg overflow-hidden bg-transparent border border-white transition-all duration-400 ease-in-out hover:scale-105 hover:text-white"
          >
            GO BACK
          </button>
        </div>
    </div>
  </div>
    
    );
  }
  return (
    <main className="w-screen align-middle flex items-center justify-center flex-col min-h-screen py-32">
       {/* <h1 className="text-2xl   mb-4 md:text-5xl py-5">Order Summary</h1> */}
      <div className=" border-gray-50 border rounded-xl p-10  w-[90%] text-slate-400">
       
      <div className="p-4">
  {/* <p className="mt-2 gap-5 flex min-h-[3rem]">
    Name: <span className="text-white">{name}</span>
  </p> */}
  <p className="mt-2  flex flex-col">
    Index Num: <span className="text-white">{index} </span>
  </p>
  <p className="mt-2  flex  flex-col">
    Number of Seats: <span className="text-white">{numOfSeat}</span>
  </p>
  <p className="mt-2  flex  flex-col">
    Seat Number:{" "}
    <span key={index} className="inline-block mr-2 text-white">
      {seats ? seats.seatNumber : "Not selected"}
    </span>
  </p>

  {users.length === 1 ? (
    <ul className="text-slate-400">
      {users.map((user, index) => (
        <li className="mt-4" key={index}>
          <p className="mt-2  flex  flex-col">
            Email:{" "}
            <span className="text-white">{user.department}</span>
          </p>
         
         <p className="mt-2  flex  flex-col">
            Whatsapp: <span className="text-white">{user.whatsapp}</span>
          </p>
        <p className="mt-2  flex  flex-col">
            Food List:{" "}
            <span className="text-white">{user.foodList.join(", ")}</span>
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="mt-2 text-gray-500">No users added yet.</p>
  )}
</div>

        <div className="flex flow-root font-bold  mt-10">
         
          <h1 className="mt-2 gap-10 flex">
          Total Price:{" "}
          <span className="text-white">RS:{totalPrice}.00 </span>
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

        <div className="flex  justify-between flex-col md:flex-row">
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
              onClick={handleOrderSubmission}
            className="relative cursor-pointer py-1 mt-10 px-10 max-w-50 text-gray-300 text-base font-bold rounded-lg overflow-hidden bg-transparent border border-white transition-all duration-400 ease-in-out hover:scale-105 hover:text-white"
          >
          CANCEL
          </button>
          <button
              onClick={handleOrderSubmission}
            className="relative cursor-pointer py-1 mt-10 px-10 max-w-50 text-gray-300 text-base font-bold rounded-lg overflow-hidden bg-transparent border border-white transition-all duration-400 ease-in-out hover:scale-105 hover:text-white"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
}