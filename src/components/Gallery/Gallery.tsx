import { InfiniteSlider } from '@/components/ui/infinite-slider';
import { imageList } from '@/constants/Images';
import { motion } from 'framer-motion'
export function InfiniteSliderResponsive() {
  return (
    <main
    className="flex flex-col items-center justify-center min-h-screen "
  >
            <motion.h1
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  className="text-center text-white  text-3xl sm:text-7xl    mb-10  w-[90%]"

    >
  Delight in a night of <span className="font-Qwigley text-secondary text-5xl md:text-8xl ">unforgettable </span> flavors
</motion.h1>
<div className="sm:flex-col sm:flex hidden">
<InfiniteSlider direction="horizontal" className="my-6 ">
{imageList.map((image, index) => (
    <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
      <img
        className="w-auto max-w-64 h-60 object-cover transition-transform duration-300 group-hover:scale-110"
        src={image.src}
        alt={image.alt}
      />
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
    </div>
  ))}
      </InfiniteSlider>
      <InfiniteSlider direction="horizontal" reverse className=" ">
      {imageList.map((image, index) => (
    <div key={index} className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg">
      <img
        className="w-auto max-w-64 h-60 object-cover transition-transform duration-300 group-hover:scale-110"
        src={image.src}
        alt={image.alt}
      />
      <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
    </div>
  ))}
      </InfiniteSlider>
</div>

    <div className="sm:hidden flex h-[450px]  justify-center w-[100%]  space-x-4">
      <InfiniteSlider direction="vertical" className="my-6">
        {imageList.map((image, index) => (
         <div key={index} className="grid gap-4">
         <div className="flex relative group cursor-pointer">
         <img
           className="md:h-60 md:w-60 w-32 h-32 rounded-lg group-hover:scale-110"
           src={image.src}
           alt={image.alt}
         />
          <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-0 rounded-lg transition-opacity duration-300"></div>
         </div>
       
       </div>
        ))}
      </InfiniteSlider>
      <InfiniteSlider direction="vertical" reverse>
        {imageList.map((image, index) => (
          <div key={index} className="grid gap-4">
          <div className="flex relative group cursor-pointer">
          <img
            className="md:h-60 md:w-60 w-32 h-32 rounded-lg group-hover:scale-110"
            src={image.src}
            alt={image.alt}
          />
           <div className="absolute inset-0 bg-black opacity-60 group-hover:opacity-0 rounded-lg transition-opacity duration-300"></div>
          </div>
        
        </div>
        ))}
      </InfiniteSlider>
    </div>
  </main>
  );
}
