import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mail.utils";
// import puppeteer from "puppeteer";
// import path from "path";
// import fs from "fs";

connect();


interface User {
  _id: string;
  username: string;
  email: string;
  whatsapp: string;
  department: string;
  batch: string;
  foodList: string[];
  totalPrice: number;
  seatNumber: string;
  imageURL: string;
  isApproved: boolean;
  index: string;
}


export async function POST(request: NextRequest) {
  try {
    const { index, numOfSeat, seats, orderDetails } = await request.json();

    if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return NextResponse.json({ message: "Invalid order details" }, { status: 400 });
    }

    const newOrder = new User({
      index,
      numOfSeat,
      seats,
      users: orderDetails.map((user) => ({
        ...user,
        isApproved: user.isApproved || false,
      })),
      createdAt: new Date(),
    });

    await newOrder.save();

    const user = { ...orderDetails[0], index }; // Include the index field here
    if (user?.email) {
      const sender = { name: "Celestia'24", address: "chamindusathsara28@gmail.com" };
      const subject = "Order placed successfully";
      const message = `
        Dear ${user.username},

        Your order has been successfully placed!

        Here are your order details:
        - Name: ${user.username}
        - Index: ${user.index}
        - Department: ${user.department}
        - Batch: ${user.batch}
        - Food List: ${user.foodList.join(", ")}
        - Total Price: $${user.totalPrice}
        - Seat Number: ${user.seatNumber}

        Thank you for choosing Celestia'24. We look forward to seeing you at the event!

        Best regards,
        The Celestia'24 Team
      `;

      const recipients = [{ name: user.username, address: user.email }];

      try {
        await sendEmail({
          sender,
          recipients,
          subject,
          message,
        });
        console.log("Email sent successfully");
      } catch (err) {
        console.error("Email sending failed:", err);
        alert('case')
      }
    }

    return NextResponse.json({
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error adding order:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
