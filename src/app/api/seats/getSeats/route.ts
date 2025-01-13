import { connect } from "@/dbConfig/dbConfig";
import Seat from "@/models/seatModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function GET(request: NextRequest) {
  try {
    console.log("Fetching all seats");
    const seats = await Seat.find({});
    console.log("Fetched seats:", seats);

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
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
