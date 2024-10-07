import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';
import { connect } from "@/dbConfig/dbConfig";
import Slips from "@/models/slipsModel";

// Ensure MongoDB is connected
connect();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface cloudinaryUploadResult {
  public_id: string;
  secure_url: string; // Include the URL field
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: "File not found" }, { status: 400 });
    }

    // Convert the file into a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload the file to Cloudinary
    const result = await new Promise<cloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'nextjs' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as cloudinaryUploadResult);
          }
        }
      );
      uploadStream.end(buffer);
    });

    // Create a new document in the `Slips` collection (MongoDB)
    const newSlip = new Slips({
      publicId: result.public_id,
      imageUrl: result.secure_url, // Store the Cloudinary image URL
      createdAt: new Date(),
    });

    // Save the document to MongoDB
    await newSlip.save();

    // Return the secure URL to the client
    return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
  } catch (error) {
    console.error("Image upload failed:", error);
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
  }
}
