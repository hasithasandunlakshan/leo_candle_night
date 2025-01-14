"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CartContext } from "../../context/userOrder"; // Adjust the path as needed
import { useRouter } from "next/navigation";
import ProcessingOrder from "../Loading/ProcessingOrder";
import Image from "next/image";
import { MdDelete } from "react-icons/md";

export default function OrderSummary() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false); // To handle the loading state
  const [showThankYou, setShowThankYou] = useState(true); // To show the "Thank You" message

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

  const { users, name, numOfSeat, seats, index,cartLocal } = cartContext;

  console.log("cartContext user:", users);
  const handleResetAndNavigate = () => {
    if (cartContext?.resetOrder) {
      cartContext.resetOrder(); // Reset the users and other related state
    }
    router.push("/"); // Navigate to the home page
  };
  const handleSeatBoook = async () => {
    const seatNumbers = seats?.seatNumber
    try{
      const response = await axios.post("/api/seats/bookSeats",{ seatNumbers: [seatNumbers] })
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
        seats: seats?.seatNumber,
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




  const totalPrice =cartContext.totalPrice;
  if (loading) {
    return (
     <ProcessingOrder/>
    );
  }


  if (showThankYou) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center flex-col">
      <div className="bg-gray-900/50 p-16 rounded-2xl backdrop-blur-sm max-w-md w-full">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Payment Complete!</h2>
          <p className="text-gray-300 mb-8">Thank you for your order. Your payment has been processed successfully.</p>
          <a href="/orderdetails" className="text-secondary ">VIEW ORDER DETAILS</a>
          <button
            onClick={() => router.push("/")}
            className="px-8 py-2  bg-secondary mt-4 text-white rounded-lg font-medium hover:bg-secondary/80 transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
    
    );
  }
  return (
    <div className="min-h-screen bg-primary py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-3xl mx-auto">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
        <h1 className="text-7xl font-bold text-secondary mb-10 mt-10 text-center">Order Summary</h1>
        
        {/* Order Details */}
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/50 p-4 rounded-xl">
              <h3 className="text-secondary font-semibold mb-2">Order Information</h3>
              <div className="space-y-2">
                <p className="text-gray-400">Seat Number: <span className="text-white">{seats ? seats.seatNumber : "Not selected"}</span></p>
          
          {users.length > 0 && (
  <div className="space-y-2">
    <p className="text-gray-400">
      Index Number: <span className="text-white">{users[users.length - 1].index}</span>
    </p>
    <p className="text-gray-400">
      Food Items: <span className="text-white">{users[users.length - 1].foodList.join(", ")}</span>
    </p>
    <p className="text-gray-400">
      Department: <span className="text-white">{users[users.length - 1].department}</span>
    </p>
    <p className="text-gray-400">
      WhatsApp: <span className="text-white">{users[users.length - 1].whatsapp}</span>
    </p>
  </div>
)}
          
              </div>


            </div>
            <ul>
                           {cartLocal.map((item) => (
                             <li
                               key={item.id}
                               className="flex justify-between my-2 w-full bg-gray-800/80 p-2  rounded-xl text-gray-200 items-center align-middle"
                             >
                               {/* Product Image */}
                               <div className="flex w-[80%] gap-2">
                               <Image
                                 src={item.image}
                                 width={50}
                                 height={20}
                                 alt={item.name}
                                 className="rounded-xl max-h-32"
                               />
                               <span>
                                 {item.name} <br /> RS:   {item.price.toFixed(2)}
                               </span>
                               </div>
                               
                         
                               {/* Remove Button */}
                               {/* <Button
                                 onClick={() => handleRemoveFromCart(item.id)}
                                 variant="outline"
                                 className="ml-2 font-xs bg-red-400"
                               >
                               
                               </Button> */}
                          {/* <MdDelete className=' text-red-600 text-xl cursor-pointer hover:scale-110 transition-all duration-150'   onClick={() => (item.id)}/> */}
                             </li>
                           ))}
                         </ul>
          </div>

          {/* Payment Section */}
          <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-secondary font-semibold">Payment Details</h3>
              <p className="text-2xl font-bold text-white">RS {totalPrice}.00</p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-400">Please upload the payment slip with your index number written on it</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <button
                  onClick={triggerFileInput}
                  className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
                >
                  Upload Slip
                </button>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <p className="text-secondary font-semibold mb-2">Preview</p>
                  <img
                    src={imagePreview}
                    alt="Payment slip preview"
                    className="max-w-xs w-full rounded-lg border border-gray-700"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            onClick={handleResetAndNavigate}
            className="px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            Cancel Order
          </button>
          <button
            onClick={handleOrderSubmission}
            className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
