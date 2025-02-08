"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import { Check, X, User, Mail, Phone, MapPin, Clock } from "lucide-react";

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
  
    if (!userDetails || userDetails.length === 0) {
      return (
        <div className="max-w-4xl mx-auto px-4 py-32">
        <div className="h-20 sm:h-40  rounded-3xl flex items-center justify-center bg-black p-6 relative backdrop-blur-sm">
    <div className="  flex flex-col rounded-2xl ">
    <h1 className="text-3xl sm:text-4xl font-bold text-secondary relative z-10">Ticket Details</h1>

    </div>
  </div>

          <div className="mt-8 p-6 bg-gray-800 rounded-xl text-center">
            <p className="text-white text-lg">No order details available</p>
          </div>
        </div>
      );
    }
  
    return (
   
  
      <div className="max-w-4xl mx-auto px-4 py-32">
        {/* Header Section with Gradient */}
        <div className=" rounded-2xl overflow-hidden shadow-xl">
  <div className="h-20 sm:h-40 flex items-center justify-center p-6 relative backdrop-blur-sm">
    <div className="absolute inset-0 bg-black"></div>
    <h1 className="text-3xl sm:text-4xl font-bold text-secondary relative z-10">Ticket Details</h1>
  </div>
</div>
 
        {/* Order Details Cards */}
        <div className="mt-8 space-y-6">
          {userDetails.map((user) => (
            <div
              key={user?._id || Math.random()}
              className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-secondary transition-all duration-300"
            >
              {/* Status Badge */}
              <div className="flex justify-end mb-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    user?.isApproved
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-red-500/10 text-red-400'
                  }`}
                >
                  {user?.isApproved ? (
                    <Check className="w-4 h-4 mr-1" />
                  ) : (
                    <X className="w-4 h-4 mr-1" />
                  )}
                  {user?.isApproved ? 'Approved' : 'Pending'}
                </span>
              </div>
  
              {/* User Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-secondary group-hover:bg-blue-500/20 transition-colors duration-300">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="text-white font-medium">{user?.username || 'N/A'}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-secondary group-hover:bg-purple-500/20 transition-colors duration-300">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="text-white font-medium">{user?.email || 'N/A'}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-secondary group-hover:bg-blue-500/20 transition-colors duration-300">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">WhatsApp</p>
                      <p className="text-white font-medium">{user?.whatsapp || 'N/A'}</p>
                    </div>
                  </div>
                </div>
  
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <div className="p-2 rounded-lg bg-purple-500/10 text-secondary group-hover:bg-purple-500/20 transition-colors duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Seat Number</p>
                      <p className="text-white font-medium">{seat}</p>
                    </div>
                  </div>
  
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-secondary group-hover:bg-blue-500/20 transition-colors duration-300">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Food Items</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {(user?.foodList || []).map((food, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary/50 text-secondary rounded-md text-sm hover:bg-purple-500/20 transition-colors duration-300"
                          >
                            {food}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    
    );
  };
 


