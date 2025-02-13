// scripts/populateSeats.js
import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";


connect();
async function populateSeats() {
  
  const seats = [];
  const seatNUmbers = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O'];
  for (let i = 0; i <= 14; i++) {
    for(let j = 1; j <= 10; j++){
       seats.push({ seatNumber: `${seatNUmbers[i]}${j}`, isBooked: false });
    }
   
  }

  try {
    // await Seat.insertMany(seats);
    //console.log('Successfully inserted seats into database');
  } catch (error) {
    console.error('Error inserting seats:', error);
  }
}

//populateSeats();
