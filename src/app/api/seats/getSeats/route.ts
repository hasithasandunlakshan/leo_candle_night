import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching all seats');
      const seats = await Seat.find({});
    return NextResponse.json({
      success: true,
      seats,
    });
  } catch (error) {

    return NextResponse.json({ error}, { status: 500 });
  }
}