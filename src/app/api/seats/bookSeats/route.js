import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function POST(request) {
  try {
    // Parse the request body to get seat numbers
    const { seatNumbers } = await request.json(); // Extract seatNumbers from the request body

    // Update the seat bookings in the database
    await Seat.updateMany(
      { seatNumber: { $in: seatNumbers } }, // Find seats with matching seatNumbers
      { $set: { isBooked: true } } // Set isBooked to true
    );

    // Return success response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error booking seats:", error);
    // Return error response
    return NextResponse.json({ success: false, message: "Booking failed" }, { status: 400 });
  }
}