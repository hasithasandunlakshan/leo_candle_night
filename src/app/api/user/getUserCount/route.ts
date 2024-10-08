import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

// Establish database connection
connect();

export async function GET(request: NextRequest) {
  try {
    const count = await User.countDocuments({});
    console.log('Total number of users:', count);

    return NextResponse.json({
      success: true,
      count,
    });
  } catch (error) {

    return NextResponse.json({ error}, { status: 500 });
  }
}

