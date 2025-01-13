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
  batch: string;
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
      const sender = { name: "Celestia'24", address: process.env.EMAIL_SENDER as string };
      const subject = "Order Placed Successfully";
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

      await sendEmail({ sender, recipients, subject, message });
    }

    return NextResponse.json({ message: "Order saved successfully", order: newOrder });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
