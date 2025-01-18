import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link 
      href="/" 
      className=" absolute top-0 right-4 z-30  "
    >
      <div className="flex items-center">
      <img className=" h-8 sm:h-16 opacity-65 mx-auto mb-4" src="/images/LeoLogSet.png" alt="Leo logo" />
      </div>
    </Link>
  );
};

export default Logo;