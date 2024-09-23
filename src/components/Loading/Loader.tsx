import React from 'react';

export default function PreLoader() { // Capitalized the function name
  return (
    <div className="text-center flex-col align-middle flex min-h-screen bg-primary   items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"
      ></div>
      <h2 className="text-white font-bold mt-4">Loading...</h2>
    </div>
  );
}
