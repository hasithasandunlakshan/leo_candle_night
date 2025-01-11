import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Extract order details from the request body
    const { index, numOfSeat, seats, orderDetails } = await request.json();

    // Validate input
    if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return NextResponse.json({ message: "Invalid order details" }, { status: 400 });
    }

    // Create a new order document
    const newOrder = new User({
      index,
      numOfSeat,
      seats,
      users: orderDetails,  // Store all user-related data in an array
      createdAt: new Date(),
    });

    // Save to MongoDB
    await newOrder.save();

    // Return success response
    return NextResponse.json({
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error: any) {
    console.error("Error adding order:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
