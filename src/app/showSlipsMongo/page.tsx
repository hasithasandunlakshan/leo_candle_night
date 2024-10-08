// pages/slips.tsx
"use client";

import React, { useEffect, useState } from 'react';

interface Image {
  publicId: string;
  imageUrl: string;
  createdAt: string;
}

export default function SlipsPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/slips/getSlipsMongo');
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images); // Set the fetched images
      } catch (error) {
        console.error(error);
        alert('Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return <p>Loading images...</p>;
  }

  return (
    <div className="slips-page">
      <h1>All Uploaded Images</h1>
      <div className="image-grid">
        {images.map((image) => (
          <div key={image.publicId} className="image-card">
            <img
              src={image.imageUrl}
              alt="Uploaded Image"
              style={{ maxWidth: '300px', height: 'auto' }}
            />
            <p>Uploaded on: {new Date(image.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
