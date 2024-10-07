import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";
import { NextRequest, NextResponse } from "next/server";

// Connect to the database
connect();

export async function GET(request) {
  try {
    console.log('Fetching all seats');
    // Fetch all seats from the database
    const seats = await Seat.find({});
    console.log(seats);
    
    // Return the seats data
    return NextResponse.json({
      success: true,
      data: seats, // Rename "seats" to "data" for consistency
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching seats:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch seats' }, { status: 400 });
  }
}
