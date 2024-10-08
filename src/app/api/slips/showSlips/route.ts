import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

// Define the type for the image resource
interface ImageResource {
  public_id: string;
  url: string;
}

export async function GET() {
  // Check for environment variables
  if (!process.env.CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: 'Missing Cloudinary configuration' }, { status: 500 });
  }

  try {
    const result = await cloudinary.api.resources({
      type: 'upload',      // Only get uploaded resources
      prefix: 'nextjs/',   // Specify folder name if you have a folder structure
      max_results: 100,    // Adjust the number of results as needed
    });

    // Map the result to the desired format
    const images: ImageResource[] = result.resources.map((resource: any) => ({
      public_id: resource.public_id,
      url: resource.secure_url,
    }));

    return NextResponse.json(images, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch images', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
}
