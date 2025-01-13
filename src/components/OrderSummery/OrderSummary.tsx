'use client'
import React, { useContext, useEffect, useState, useRef } from "react";
import { CartContext } from "../../context/userOrder";
import { useRouter } from "next/navigation";
import ProcessingOrder from "../Loading/ProcessingOrder";

export default function OrderSummary() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  
  const imageRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cartContext = useContext(CartContext);
  const router = useRouter();

  if (!cartContext) {
    return <div className="text-white">No order summary available</div>;
  }

  const { users, numOfSeat, seats, index } = cartContext;
  const totalPrice = users.reduce((sum, user) => sum + (user.totalprice || 0), 0);

  interface User {
    department: string;
    whatsapp: string;
    foodList: string[];
    totalprice?: number;
  }

  interface CartContextType {
    users: User[];
    numOfSeat: number;
    seats: { seatNumber: string } | null;
    index: number;
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setImagePreview(fileURL);

    const newFormData = new FormData();
    newFormData.append("file", file);
    setFormData(newFormData);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleOrderSubmission = () => {
    setLoading(true);
    // Simulate order submission process
    setTimeout(() => {
      setLoading(false);
      setShowThankYou(true);
    }, 2000);
  };

  if (loading) return <ProcessingOrder />;

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="bg-gray-900/50 p-8 rounded-2xl backdrop-blur-sm max-w-md w-full">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full mx-auto flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Payment Complete!</h2>
            <p className="text-gray-300 mb-8">Thank you for your order. Your payment has been processed successfully.</p>
            <button
              onClick={() => router.push("/")}
              className="px-8 py-3 bg-secondary text-white rounded-lg font-medium hover:bg-secondary/80 transition-colors"
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
                  <p className="text-gray-400">Number of Seats: <span className="text-white">{numOfSeat}</span></p>
                  <p className="text-gray-400">Food Items: <span className="text-white">{users[-1].foodList.join(", ")}</span></p>
                  
                </div>
              </div>

              <div className="bg-gray-800/50 p-4 rounded-xl">
                <h3 className="text-secondary font-semibold mb-2">User Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-400">Index Number: <span className="text-white">{index}</span></p>
                    <p className="text-gray-400">Department: <span className="text-white">{users[-1].department}</span></p>
                    <p className="text-gray-400">WhatsApp: <span className="text-white">{users[-1].whatsapp}</span></p>
                  </div>
              </div>
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
                      className="max-w-xs rounded-lg border border-gray-700"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
            <button
              onClick={() => router.push("/")}
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