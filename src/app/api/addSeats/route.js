// scripts/populateSeats.js
import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";


connect();
async function populateSeats() {
  
  const seats = [];
  for (let i = 1; i <= 150; i++) {
    seats.push({ seatNumber: `S${i}`, isBooked: false });
  }

  try {
    await Seat.insertMany(seats);
    console.log('Successfully inserted seats into database');
  } catch (error) {
    console.error('Error inserting seats:', error);
  }
}

populateSeats();
