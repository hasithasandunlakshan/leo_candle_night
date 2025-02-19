import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";
import { NextRequest, NextResponse } from "next/server";

// Disable caching in Vercel
export const dynamic = "force-dynamic"; 
export const revalidate = 0; // Disables revalidation caching

// Connect to the database
connect();

export async function GET(request: NextRequest) {
  try {
    //console.log("Fetching all seats from the database...");

    // Sort by a field, e.g., seatNumber in ascending order
    const seats = await Seat.find({}) .sort({ seatNumber: 1 });
    //console.log("Fetched seats:", seats);

    // Return the response with cache control headers
    return NextResponse.json(
      {
        success: true,
        seats,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        }
      }
    );
  } catch (error) {
    console.error("Error fetching seats:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
