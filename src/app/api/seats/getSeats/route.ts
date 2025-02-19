import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";
import { NextRequest, NextResponse } from "next/server";

// Disable caching in Vercel
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Connect to MongoDB
connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch only seats that start with A-J (uppercase)
    let seats = await Seat.find({ seatNumber: /^[A-J]\d+/ }).lean(); // Regex to match A-J seats

    // Sort seats naturally (A1, A2, ..., B1, B2, ..., J10)
    seats.sort((a, b) => {
      const letterA = a.seatNumber.charAt(0); // Extract row letter
      const letterB = b.seatNumber.charAt(0);
      const numA = parseInt(a.seatNumber.substring(1)); // Extract number
      const numB = parseInt(b.seatNumber.substring(1));

      if (letterA !== letterB) {
        return letterA.localeCompare(letterB); // Sort by letter first
      }
      return numA - numB; // Then sort by number
    });

    // Return the sorted response with cache control
    return NextResponse.json(
      { success: true, seats },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
          Pragma: "no-cache",
          Expires: "0",
          "Surrogate-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching seats:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
