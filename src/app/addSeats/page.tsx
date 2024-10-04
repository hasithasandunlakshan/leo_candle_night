"use client"
import axios from 'axios';
import React from 'react'

export default function page() {

    const onSave = async () => {
        try {
            const response = await axios.post("/api/addSeats");
            console.log("Added successfully:", response.data);
        } catch (error) {
            console.error("Error saving user details:", error);
            alert("An error occurred while saving user details.");
        }
    };

  return (
    <div>
        <h1>Add Seats</h1>
            <button onClick={onSave}>Save</button>
        
    </div>
  )
}
