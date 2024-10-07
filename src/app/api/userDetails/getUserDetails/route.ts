import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connect();

export async function GET(request: NextRequest) {
  try {
    const user = await User.find({});
    return NextResponse.json({
      success: true,
      user,

    });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}