"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { CartContext } from "../../context/userOrder";
import { useRouter } from "next/navigation";
import ProcessingOrder from "../Loading/ProcessingOrder";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export default function OrderSummary() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imagePreviewType, setImagePreviewType] = useState<string | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [showUploadToast, setShowUploadToast] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [showToastCancel, setShowToastCancel] = useState<boolean>(false);
  const cartContext = useContext(CartContext);
  const router = useRouter();

  useEffect(() => {
    //console.log("cartContext:", cartContext);
  }, [cartContext]);

  if (!cartContext) {
    return <div>No order summary available</div>;
  }

  const { users, seats, index, cartLocal } = cartContext;
  const totalPrice = cartContext.totalPrice;

  const handleResetAndNavigate = () => {
    if (cartContext?.resetOrder) {
      cartContext.resetOrder();
      setShowThankYou(true);
    }
    router.push("/");
  };

  const handleSeatBoook = async () => {
    const seatNumbers = seats?.seatNumber;
    try {
      const response = await axios.post("/api/seats/bookSeats", { seatNumbers: [seatNumbers] });
      if (response.status === 200) {
        cartContext.resetOrder();
        setShowThankYou(true);
      }
    } catch (error) {
      console.error("Error sending order to backend:", error);
      alert("Failed to add seat");
    }
  };

  const handleCancel = () => {
    setShowToast(false);
    setShowToastCancel(false);
    setShowUploadToast(false);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreviewType(file.type);
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);
      const newFormData = new FormData();
      newFormData.append("file", file);
      setFormData(newFormData);
    }
  };

  const uploadImage = async (): Promise<string | null> => {
    try {
      if (!formData) {
        alert("No file selected for upload.");
        return null;
      }

      const response = await axios.post("/api/slips/uploadSlips", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        await sendOrderToBackend(response.data.imageUrl);
      }

      const data = response.data;
      if (data && data.publicId && data.imageUrl) {
        setUploadedImage(data.imageUrl);
        return data.imageUrl;
      }
      return null;
    } catch (error: any) {
      console.error("Error uploading image:", error.message || error);
      alert("Failed to upload image. Please try again later.");
      return null;
    }
  };

  const sendOrderToBackend = async (imageUrl: string | null) => {
    if (!imageUrl) {
      alert("Image URL is missing. Please upload the image again.");
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
        seatNumber: user.seatNumber,
        imageURL: imageUrl,
        isApproved: user.isApproved || false,
      }));

      const data = {
        index,
        numOfSeat: cartContext.numOfSeat,
        seats: seats?.seatNumber,
        orderDetails,
      };

      const response = await axios.post("/api/user/setUserDetails", data);
      if (response.status === 200) {
        await handleSeatBoook();
      }
    } catch (error) {
      console.error("Error sending order to backend:", error);
      alert("Failed to send order");
    }
  };

  const handlePlaceOrder = () => {
    if (!imagePreview) {
      setShowUploadToast(true);
    } else {
      setShowToast(true);
    }
  };

  const handleOrderSubmission = async () => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage();
      if (imageUrl) {
        // Order processing handled in uploadImage
      }
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  if (loading) {
    return <ProcessingOrder />;
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
            <a href="/orderdetails" className="text-secondary">VIEW ORDER DETAILS</a>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-2 bg-secondary mt-4 text-white rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }
  else if (!seats || !seats.seatNumber) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-md w-full text-center shadow-xl border border-gray-800">
        <div className="mb-6">
          <svg 
            className="w-16 h-16 mx-auto text-secondary" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M19 13C19 14.6569 17.6569 16 16 16H8C6.34315 16 5 14.6569 5 13M19 13V11C19 9.34315 17.6569 8 16 8H8C6.34315 8 5 9.34315 5 11V13M19 13L19 17C19 18.6569 17.6569 20 16 20H8C6.34315 20 5 18.6569 5 17L5 13M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4Z"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">No Seat Selected</h1>
        <p className="text-gray-400 mb-8">Please select a seat to continue with your order.</p>
        <button 
          onClick={()=>router.push("/bookseat")}
          className="px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/80 transition-colors duration-300 shadow-lg hover:shadow-secondary/20"
        >
          Go Back to Seat Selection
        </button>
      </div>
    </div>
    );
  }
  return (
    <div className="min-h-screen bg-primary py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8">
          <h1 className="md:text-6xl text-4xl font-bold text-secondary mb-10 mt-10 text-center">Order Summary</h1>

          <div className="space-y-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800/50 p-4 rounded-xl">
                <h3 className="text-secondary font-semibold mb-2">Your Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Seat Number: <span className="text-white">{seats ? seats.seatNumber : "Not selected"}</span></p>

                  {users.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-gray-400">NIC Number: <span className="text-white">{users[users.length - 1].index}</span></p>
                      <p className="text-gray-400">Status: <span className="text-white">{users[users.length - 1].department}</span></p>
                      <p className="text-gray-400">WhatsApp: <span className="text-white">{users[users.length - 1].whatsapp}</span></p>
                    </div>
                  )}
                </div>
              </div>

              <ul>
                <h3 className="text-secondary font-semibold mb-2 mt-2">Order Information</h3>
                {cartLocal.map((item) => (
                  <li key={item.id} className="flex justify-between my-2 w-full bg-gray-800/80 p-2 rounded-xl text-gray-200 items-center align-middle">
                    <div className="flex w-[80%] gap-2">
                      <Image
                        src={item.image}
                        width={50}
                        height={20}
                        alt={item.name}
                        className="rounded-xl max-h-32"
                      />
                      <span>
                        {item.name} <br /> RS: {item.price.toFixed(2)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-xl">
            <div className=" bg-gray-800/60 p-4  rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-secondary font-extrabold">Payment Details</h3>
        <p className=""></p>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-300">
        <span className="text-lg font-semibold">Welcome Drink</span>
        <span className="text-xl font-bold text-white">Free</span>
      </div>
      
      <div className="flex justify-between items-center text-sm text-gray-300">
        <span className="text-lg font-semibold">Entrance</span>
        <span className="text-xl font-bold text-white">Free</span>
      </div>
      <div className="flex justify-between items-center text-sm mt-5 text-gray-300">
      <h3 className="text-secondary text-2xl font-extrabold">Total</h3>
        <span className="text-2xl font-bold text-white">RS {totalPrice}.00</span>
      </div>
    </div>


              <div className="space-y-1 my-6 bg-gray-800/60 p-4 rounded-xl">
                <p className="text-sm text-gray-400">Please upload the payment slip with your NIC number written on it</p>
                <p className="text-lg text-white mt-2">Bank Details</p>
                <p className="text-sm text-white">Name - Lakshan Pradeep,</p>
                <p className="text-sm text-white">Account Number - 0090298788</p>
                <p className="text-sm text-white">Bank - BOC</p>
                <p className="text-sm text-white ">Branch - KATUBEDDA CAMPUS [631]</p>
                <div className="flex flex-col sm:flex-row gap-4 my-6 ">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={triggerFileInput}
                    className="px-6 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/80 mt-6 transition-colors"
                  >
                    Upload Slip
                  </button>
                </div>

                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-secondary font-semibold mb-2">Preview</p>
                    {imagePreviewType?.includes("image/") ? (
                      <img
                        src={imagePreview}
                        alt="Payment slip preview"
                        className="max-w-xs w-full rounded-lg border border-gray-700"
                      />
                    ) : (
                      <iframe
                        src={imagePreview}
                        className="max-w-xs w-full rounded-lg border border-gray-700"
                        width="100%"
                        height="500px"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row items-end justify-end gap-2 sm:gap-6 text-md sm:text-lg">
            <div className="text-center">
              <button
                onClick={() => setShowToastCancel(true)}
                className="sm:px-3 px-6 min-w-40 py-2 bg-primary text-white border border-white rounded-lg font-normal hover:bg-secondary/80 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="text-center">
              <button
                onClick={handlePlaceOrder}
                className="sm:px-3 min-w-40 px-6 py-2 bg-primary text-white border border-white rounded-lg font-normal hover:bg-secondary/80 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showUploadToast && (
          <section className="fixed inset-0 flex items-center justify-center z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex justify-center items-center z-50 w-screen"
            >
              <div className="bg-primary rounded-lg border-secondary border p-6 shadow-lg sm:w-96 flex w-[90%]">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 1792 1792"
                      fill="#d5a000"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                    </svg>
                    <span className="text-secondary font-semibold">Upload Required</span>
                  </div>
                  <span className="text-white mt-2">Please upload the payment slip before placing your order.</span>
                  <div className="flex justify-end mt-4 space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-secondary focus:outline-none"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      <AnimatePresence>
      {showToast && (
        <section className="fixed inset-0 flex items-center justify-center z-40">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            // onClick={handleCancel}
          />
          {/* Toast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center items-center z-50 w-screen  "
          >
            <div className="bg-primary rounded-lg border-secondary border p-6 shadow-lg sm:w-96 flex  w-[90%]  ">
              <div className="flex flex-col ">
                <div className="flex items-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 1792 1792"
                    fill="#d5a000"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2"
                  >
                    <path d="M1299 813l-422 422q-19 19-45 19t-45-19l-294-294q-19-19-19-45t19-45l102-102q19-19 45-19t45 19l147 147 275-275q19-19 45-19t45 19l102 102q19 19 19 45t-19 45zm141 83q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z" />
                  </svg>
                  <span className="text-secondary font-semibold">All set!</span>
                </div>
                <span className="text-white mt-2">Place your order?</span>
                <div className="flex justify-end mt-4 space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm bg-primary rounded text-white hover:bg-secondary focus:outline-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleOrderSubmission}
                    className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-secondary focus:outline-none"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      )}
    </AnimatePresence>


    <AnimatePresence>
      {showToastCancel && (
        <section className=" fixed  flex w-screen h-screen items-center justify-center align-middle z-40    inset-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0  bg-black bg-opacity-50 z-10"
            // onClick={handleCancel}
          />
          {/* Toast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="  flex  z-50 w-full  justify-center  items-center"
          >
    <div className="bg-primary rounded-lg border-2 border-red-600 p-8 shadow-lg sm:w-96  w-[90%] max-w-full">
      <div className="flex flex-col">
        <div className="flex items-center">
          <span className="text-red-600 text-xl font-semibold">Are You Sure?</span>
        </div>
        <span className="text-white mt-2 text-sm">Are you sure you want to cancel your order?</span>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={handleCancel}
            className="px-6 py-3 text-sm bg-primary text-white rounded-lg shadow-sm hover:bg-red-600 transition duration-300 focus:outline-none"
          >
            Cancel
          </button>
          <button
            onClick={handleResetAndNavigate}
            className="px-6 py-3 text-sm bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 transition duration-300 focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>

          </motion.div>
        </section >
      )}
    </AnimatePresence>

    </div>
  );
}