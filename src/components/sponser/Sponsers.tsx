import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Sponsors() {
  const partners = [
    {
      name: 'Digital Media Partner',
      imageSrc: '/ContactUs/chamindu.jpg', // Replace with actual image paths
      link: '/link-to-digital-media-partner',
    },
    {
      name: 'Print Media Partner 1',
      imageSrc: '/ContactUs/chamindu.jpg',
      link: '/link-to-print-media-partner1',
    },
    {
      name: 'Print Media Partner 2',
      imageSrc: '/ContactUs/chamindu.jpg',
      link: '/link-to-print-media-partner2',
    },
    {
      name: 'Knowledge Partner',
      imageSrc: '/ContactUs/chamindu.jpg',
      link: '/link-to-knowledge-partner',
    },
  ]

  return (
    <div className="px-4 py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Our Partners</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {partners.map((partner, index) => (
          <Link href={partner.link} key={index} className="text-center">
            <div className="relative w-full h-56 bg-gray-100 flex items-center justify-center">
              <Image
                src={partner.imageSrc}
                alt={partner.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{partner.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
