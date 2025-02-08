import { connect } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mail.utils";

connect();

interface OrderDetails {
  username: string;
  email: string;
  whatsapp: string;
  department: string;
  // batch: string;
  foodList: string[];
  totalPrice: number;
  seatNumber: string;
  isApproved?: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { index, numOfSeat, seats, orderDetails }: { index: string; numOfSeat: number; seats: string[]; orderDetails: OrderDetails[] } = body;

    if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return NextResponse.json({ message: "Invalid order details" }, { status: 400 });
    }

    const newOrder = new UserModel({
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

    const user = { ...orderDetails[0], index };
    if (user?.email) {
      const sender = { name: "Celestia'25", address: process.env.EMAIL_SENDER as string };
      const subject = "Order Placed Successfully";
      const orderDetailsURL = `https://leo-candle-night.vercel.app/orderdetails/${user.index}`;
    
      const message = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background-color: #001f3f; color: white; padding: 20px; border-radius: 10px; border: 2px solid #FFD700;">
      <div style="text-align: center; padding: 20px;">
        <h1 style="font-size: 32px; color: #FFD700; margin: 0;">Celestia 2025</h1>
        <h2 style="font-size: 20px; color: #ffffff; margin: 10px 0;">Order Confirmation</h2>
      </div>
      <div style="background-color: #004080; padding: 20px; border-radius: 8px;">
        <p style="font-size: 18px; color: #FFD700; margin: 8px 0;">Dear <strong>${user.username}</strong>,</p>
        <p style="font-size: 16px; line-height: 1.6; color: #ffffff;">
          Thank you for placing your order with <strong>Celestia 2025</strong>! We’re excited to have you join our special event.
        </p>
        <p style="font-size: 16px; color: #ffffff; line-height: 1.6;">
          You can view your full order details anytime by clicking the button below:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${orderDetailsURL}" style="background-color: #FFD700; color: #001f3f; padding: 10px 20px; text-decoration: none; font-size: 16px; font-weight: bold; border-radius: 5px;">
            View Order Details
          </a>
        </div>
        <p style="font-size: 16px; line-height: 1.6; color: #ffffff;">
          If you have any questions or need assistance, feel free to contact us.
        </p>
        <p style="font-size: 16px; color: #FFD700; margin: 10px 0;">Thank you,</p>
        <p style="font-size: 16px; color: #ffffff; margin: 5px 0;">The Celestia 2024 Team</p>
      </div>
      <div style="text-align: center; background-color: #001f3f; padding: 10px; border-top: 2px solid #FFD700; margin-top: 20px;">
        <p style="font-size: 12px; color: #888888; margin: 5px 0;">Please do not share this email or its contents with anyone.</p>
        <p style="font-size: 12px; color: #888888; margin: 5px 0;">&copy; 2024 Celestia, All Rights Reserved.</p>
      </div>
    </div>
  `;
    
      const recipients = [{ name: user.username, address: user.email }];
    
      await sendEmail({ sender, recipients, subject, message });
    }
    

    return NextResponse.json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
