"use client"
import React, { useEffect, useState } from 'react';

export default function ImageGallery() {
  const [images, setImages] = useState<{ public_id: string; url: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/slips/showSlips');  // Make sure to match your API route
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images', error);
      }
    };

    fetchImages();
  }, []);

  const handleDownload = (url: string, public_id: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `${public_id}.jpg`; // Filename for the downloaded image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      })
      .catch((error) => {
        console.error('Failed to download image', error);
      });
  };

  return (
    <div className="image-gallery">
      <h1>Image Gallery</h1>
      <div className="images">
        {images.map((image) => (
          <div key={image.public_id} style={{ marginBottom: '20px' }}>
            <img
              src={image.url}
              alt={image.public_id}
              style={{ maxWidth: '300px', height: 'auto', display: 'block', marginBottom: '10px' }}
            />
            <button
              onClick={() => handleDownload(image.url, image.public_id)}
              className="download-button"
            >
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
