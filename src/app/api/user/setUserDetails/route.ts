import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/utils/mail.utils";
import chromium from "@sparticuz/chromium-min";
import puppeteer from "puppeteer-core";

// Ensure database connection
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
  let browser = null;
  try {
    // Configure browser for serverless environment
    browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath(),
      headless: true
    });

    const page = await browser.newPage();

    const content = `
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 40px;
        }
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }
        h1 {
          color: #f59e0b;
          text-align: center;
          margin-bottom: 20px;
        }
        h2 {
          color: #ef4444;
          text-align: center;
          margin-bottom: 30px;
        }
        .details {
          border: 1px solid #374151;
          padding: 20px;
          border-radius: 8px;
          background-color: #111827;
          color: white;
        }
        .label {
          font-weight: bold;
          color: #f59e0b;
        }
        footer {
          text-align: center;
          margin-top: 30px;
          font-style: italic;
          color: #9ca3af;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Celestia'24</h1>
        <h2>A Candlelight Dinner Party</h2>
        <div class="details">
          <p><span class="label">Name:</span> ${user.username}</p>
          <p><span class="label">Index:</span> ${user.index}</p>
          <p><span class="label">Department:</span> ${user.department}</p>
          <p><span class="label">Batch:</span> ${user.batch}</p>
          <p><span class="label">Food List:</span> ${user.foodList.join(", ")}</p>
          <p><span class="label">Total Price:</span> $${user.totalPrice}</p>
          <p><span class="label">Seat Number:</span> ${user.seatNumber}</p>
        </div>
        <footer>
          Organized by the Leo Club of the University of Moratuwa<br>
          © 2024 Leo Club UOM. All rights reserved.
        </footer>
      </div>
    </body>
    </html>
    `;

    await page.setContent(content);
    const pdf = await page.pdf({ 
      format: "a4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px"
      }
    });

    await browser.close();
    return pdf;
  } catch (error) {
    if (browser) await browser.close();
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { index, numOfSeat, seats, orderDetails } = await request.json();

    // Validate input
    if (!orderDetails || !Array.isArray(orderDetails) || orderDetails.length === 0) {
      return NextResponse.json({ 
        error: "Invalid order details" 
      }, { 
        status: 400 
      });
    }

    // Create and save order
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

    // Generate and send PDF
    const user = { ...orderDetails[0], index };
    if (user?.email) {
      try {
        const pdfBuffer = await generatePDF(user);

        await sendEmail({
          sender: { 
            name: "Celestia'24", 
            address: "chamindusathsara28@gmail.com" 
          },
          recipients: [{ 
            name: user.username, 
            address: user.email 
          }],
          subject: "Order placed successfully",
          message: `Dear ${user.username}, your order has been successfully placed! Please find your order details attached.`,
          attachments: [
            {
              filename: `${user.username}_order_details.pdf`,
              content: pdfBuffer.toString("base64"),
              encoding: "base64",
            },
          ],
        });
      } catch (emailError) {
        console.error("Error sending email:", emailError);
        // Continue even if email fails
      }
    }

    return NextResponse.json({
      message: "Order saved successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An unexpected error occurred" },
      { status: 500 }
    );
  }
}