import { v2 as cloudinary } from 'cloudinary';
import { error } from 'console';
import { NextRequest, NextResponse } from 'next/server';

    cloudinary.config({ 
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
      api_key: process.env.CLOUDINARY_API_KEY, 
      api_secret: process.env.CLOUDINARY_API_SECRET, 
  });

  interface cloudinaryUploadResult {
    public_id: string;
    [key: string]: any;
  }
  
export async function POST(request: NextRequest) {

  try {
   const formData = await request.formData();
   const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({error: "File not found"},{status: 400});
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes);

    const result = await new Promise<cloudinaryUploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'nextjs' },
        (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as cloudinaryUploadResult);
        }
      })
      uploadStream.end(buffer);
    });

  return NextResponse.json({publicId: result.public_id},{status: 200});  

  } catch (error) {
    console.log("upload image is failed",error);
    return NextResponse.json({error: "File not found"},{status: 500});
  }
}
