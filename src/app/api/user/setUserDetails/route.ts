import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mail.utils";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda"; // For serverless-compatible Chromium

connect();

// Define types for the user object
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

async function generatePDF(user: User): Promise<Buffer> {
  // Launch Puppeteer with serverless-friendly options
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath,
    headless: true,
  });
  const page = await browser.newPage();

  const content = `
  <html lang="en">
  <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  </head>
  <body class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center">
    <div class="bg-gray-800 text-white rounded-lg shadow-xl p-8 max-w-lg w-full">
      <h1 class="text-3xl font-bold text-yellow-400 text-center mb-4">Celestia'24</h1>
      <h2 class="text-xl font-semibold text-red-400 text-center mb-6">A Candlelight Dinner Party</h2>
      <div class="border border-gray-600 rounded-lg p-6 bg-gray-900 shadow-md">
        <p class="text-lg mb-3"><span class="font-semibold text-yellow-400">Name:</span> ${user.username}</p>
        <p class="text-lg mb-3"><span class="font-semibold text-yellow-400">Index:</span> ${user.index}</p>
        <p class="text-lg mb-3"><span class="font-semibold text-yellow-400">Department:</span> ${user.department}</p>
        <p class="text-lg mb-3"><span class="font-semibold text-yellow-400">Batch:</span> ${user.batch}</p>
        <p class="text-lg mb-3"><span class="font-semibold text-yellow-400">Food List:</span> ${user.foodList.join(", ")}</p>
        <p class="text-lg mb-3"><span class="font-semibold text-yellow-400">Total Price:</span> $${user.totalPrice}</p>
        <p class="text-lg"><span class="font-semibold text-yellow-400">Seat Number:</span> ${user.seatNumber}</p>
      </div>
      <footer class="mt-6 text-center text-sm text-gray-400 italic">
        Organized by the Leo Club of the University of Moratuwa<br />
        &copy; 2024 Leo Club UOM. All rights reserved.
      </footer>
    </div>
  </body>
  </html>
  `;

  await page.setContent(content);
  const pdfBuffer = await page.pdf({ format: "a4", printBackground: true });

  await browser.close();
  return pdfBuffer;
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
      const pdfBuffer = await generatePDF(user);

      const sender = { name: "Celestia'24", address: "chamindusathsara28@gmail.com" };
      const subject = "Order placed successfully";
      const message = `Dear ${user.username}, your order has been successfully placed! Please find your order details attached.`;
      const recipients = [{ name: user.username, address: user.email }];

      await sendEmail({
        sender,
        recipients,
        subject,
        message,
        attachments: [
          {
            filename: `${user.username}_order_details.pdf`,
            content: pdfBuffer.toString("base64"),
            encoding: "base64",
          },
        ],
      });
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
