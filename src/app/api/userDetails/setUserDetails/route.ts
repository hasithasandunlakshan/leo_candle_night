import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    
    const reqBody = await request.json();
    console.log("***********************")
    const { username, email, phoneNumber, faculty, indexNumber } = reqBody;
    console.log(reqBody)

    // Check if the paper already exists
    const existUser = await User.findOne({ indexNumber });

    if (existUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const newUser = new User({
        username,
      email,
      phoneNumber,
      faculty,
      indexNumber
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User added successfully",
      success: true,
      savedUser,
    });
  } catch (error: any) {
    console.error("Error adding paper:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
