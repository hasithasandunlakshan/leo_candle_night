import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
connect();

export async function GET(request: NextRequest) {
  try {
    const index = request.nextUrl.searchParams.get('index');
   
    const users = await User.find({index}).select("users seats");
    
    return NextResponse.json({
      users: users.map(user => user.users[0]),
      seats: users.map(user => user.seats[0]),

    });
  } catch (error) {
    return NextResponse.json({ error}, { status: 500 });
  }
}