import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Head from "next/head"; // Make sure to import Head for SSR frameworks

const images = [
  { url: "https://via.placeholder.com/400x400?text=Image+1", name: "Image 1" },
  { url: "https://via.placeholder.com/400x400?text=Image+2", name: "Image 2" },
  { url: "/ContactUs/chamindu.jpg", name: "Eng.Chamindu" },
  { url: "https://via.placeholder.com/400x400?text=Image+4", name: "Image 4" },
  { url: "https://via.placeholder.com/400x400?text=Image+5", name: "Image 5" },
  { url: "https://via.placeholder.com/400x400?text=Image+6", name: "Image 6" },
];

export function Sponsers() {
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  const [hovered, setHovered] = React.useState<number | null>(null);

  React.useEffect(() => {
    document.title = "Sponsors"; // Set the page title
  }, []);

  const handleMouseEnter = (index: number) => {
    setHovered(index);
    autoplay.current.stop();
  };

  const handleMouseLeave = () => {
    setHovered(null);
    autoplay.current.play();
  };

  return (
    <>
      <Head>
        <title>Sponsors</title> {/* This sets the document title */}
      </Head>
      <div className="flex flex-col items-center justify-items-center align-middle  min-h-screen">
      <h1 className="text-center text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl my-10">Sponsors</h1>

        <Carousel
          plugins={[autoplay.current]}
          className="w-full max-w-xs sm:max-w-md md:max-w-xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mt-10"

        >
          <CarouselContent className="-ml-1">
            {images.map((image, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  " xs:basis-full sm:basis-1/2 lg:basis-1/3",
                  hovered !== null && hovered !== index && "blur-sm "
                )}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-2">
                  <Card
                    className="max-w-xs sm:max-w-sm  lg:max-w-2xl transition-all duration-1000  rounded-2xl bg-black text-white bg-opacity-30 "
                  
                  >
                    <CardContent className="flex flex-col  items-center justify-center p-4 relative">
                      <img
                        src={image.url}
                        alt={`Slide ${index + 1}`}
                        className="object-cover w-full h-full rounded-full"
                      />
                      <div
                        className={cn(
                          "absolute inset-0 bg-black/50 flex items-end justify-center pb-4 rounded-2xl transition-all duration-1000",
                          hovered === index ? "opacity-100" : "opacity-0 "
                        )}
                      >
                        <span className="text-xl font-medium text-secondary text-center">
                          {image.name}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}
