
import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Slips from "@/models/slipsModel";

// Ensure MongoDB is connected
connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all images from the 'Slips' collection
    const images = await Slips.find({}).sort({ createdAt: -1 }); // Sort by creation date (optional)
    
    return NextResponse.json({ images }, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch images:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}