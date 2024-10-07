"use client";
import React, { useState, useRef } from 'react';

export default function UploadPage() {
  const [uploadedImage, setUploadedImage] = useState<String | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/slips/uploadSlips', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUploadedImage(data.publicId); // Assuming data.publicId holds the Cloudinary image URL or ID
    } catch (error) {
      console.error(error);
      alert('Failed to upload image');
    }
  };

  

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="upload-page">
      <h1>Upload and Download Image</h1>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}  // Hides the file input
        onChange={handleFileUpload}
      />

      <button onClick={triggerFileInput} className="upload-button">
        Upload Image
      </button>

      {uploadedImage && (
        <>
          <div className="image-preview">
            <h2>Uploaded Image:</h2>
            <img
              ref={imageRef}
              src={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/${uploadedImage}`}
              alt="Uploaded"
              style={{ maxWidth: '300px', height: 'auto' }}
            />
          </div>
        </>
      )}
    </div>
  );
}
