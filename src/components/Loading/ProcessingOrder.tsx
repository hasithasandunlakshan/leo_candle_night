import React from 'react';

export default function ProcessingOrder() { // Capitalized the function name
  return (
    <div className="text-center flex-col align-middle flex min-h-screen absolute w-screen z-50 bg-primary max-h-screen   items-center justify-center">
      <div
        className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
      ></div>
      <h2 className="text-white  mt-4">DO NOT GO BACK</h2>
      <h2 className="text-white mt-4">ORDER IS PROCESSING</h2>
    </div>
  );
}