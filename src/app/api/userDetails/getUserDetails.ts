import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// Establish database connection
connect();

export async function GET(request: NextRequest) {
  try {
    // Fetch all teachers from the database
    const user = await User.find({});

    // Return the teachers as a JSON response
    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    // Handle errors and return appropriate response
    return NextResponse.json({ error}, { status: 500 });
  }
}