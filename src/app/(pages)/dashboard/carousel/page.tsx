"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

// Product images data
const images = [
  {
    id: "main",
    src: "http://res.cloudinary.com/dwtx0sgd6/image/upload/v1677504791/reactUploadProperties/7%20room%20luxury%20Apartmentstreet-1677504599869/pgnqznhrr3hnnv4xmnml.jpg",
    alt: "White t-shirt with tiger logo and black shorts",
  },
  {
    id: "shorts",
    src: "http://res.cloudinary.com/dwtx0sgd6/image/upload/v1677508721/reactUploadProperties/8%20bedroom%20luxury%20villasea-1677508668876/yvva2pz9sn5db3ue3sz7.jpg",
    alt: "Black shorts",
  },
  {
    id: "shirt-detail",
    src: "http://res.cloudinary.com/dwtx0sgd6/image/upload/v1677520203/reactUploadProperties/3%20Bedroom%20Luxury%20Apartmentsea-1677520163960/e3cblbyrcvw6mtvta4vt.jpg",
    alt: "Tiger logo t-shirt detail",
  },
  {
    id: "full-outfit",
    src: "https://res.cloudinary.com/dwtx0sgd6/image/upload/v1677520203/reactUploadProperties/3%20Bedroom%20Luxury%20Apartmentsea-1677520163960/rujhigxovvq13ncpisyj.jpg",
    alt: "Complete outfit view",
  },
];

export default function ProductCarousel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  // Update URL when image changes
  const updateQueryParams = useCallback(
    (index: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("image", images[index].id);
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Handle navigation
  const handlePrevious = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const autoplay = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => {
        clearInterval(autoplay);
      };
    }
  }, [emblaApi]);

  // Set initial image based on URL params and handle slide changes
  useEffect(() => {
    if (emblaApi) {
      const imageParam = searchParams.get("image");
      if (imageParam) {
        const index = images.findIndex((img) => img.id === imageParam);
        if (index !== -1) {
          emblaApi.scrollTo(index);
          setSelectedImage(index);
        }
      }

      const onSelect = () => {
        const newIndex = emblaApi.selectedScrollSnap();
        setSelectedImage(newIndex);
        updateQueryParams(newIndex);
      };

      emblaApi.on("select", onSelect);

      return () => {
        emblaApi.off("select", onSelect);
      };
    }
  }, [emblaApi, searchParams, updateQueryParams]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      {/* Main Carousel */}
      <div className="relative mb-4">
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex">
            {images.map((image, index) => (
              <div key={image.id} className="flex-[0_0_100%] min-w-0">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Navigation Buttons */}
        <div className="absolute left-1/2 bottom-4 -translate-x-1/2 flex items-center gap-px bg-gray-200/80 backdrop-blur-sm rounded-full px-4 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 bg-transparent outline-none border-0 shadow-none group hover:bg-transparent hover:outline-none hover:border-0 hover:shadow-none"
            onClick={handlePrevious}
          >
            <ChevronLeft className="h-4 w-4 group-hover:text-white" />
            <span className="sr-only">Previous image</span>
          </Button>
          <div className="w-px h-4 bg-gray-400/50" />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 p-0 bg-transparent outline-none border-0 shadow-none group hover:bg-transparent hover:outline-none hover:border-0 hover:shadow-none"
            onClick={handleNext}
          >
            <ChevronRight className="h-4 w-4 group-hover:text-white" />
            <span className="sr-only">Next image</span>
          </Button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 justify-center">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => {
              if (emblaApi) {
                emblaApi.scrollTo(index);
              }
            }}
            className={cn(
              "relative w-20 h-20 rounded-md overflow-hidden border-2",
              selectedImage === index ? "border-primary" : "border-transparent"
            )}
          >
            <Image
              src={image.src}
              alt={`Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
