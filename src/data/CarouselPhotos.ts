import { StaticImageData } from "next/image";
import AllPastries from "@/public/home/carousel/AllPastries.webp";
import Kobe from "@/public/home/carousel/Kobe.webp";
import MilkBread from "@/public/home/carousel/Milkbread.webp";

export interface Photo {
  src: StaticImageData;
  alt: string;
}

const CarouselPhotos: Photo[] = [
  {
    src: AllPastries,
    alt: "Assortment of Pastries",
  },
  {
    src: Kobe,
    alt: "Kobe Cream Pastry",
  },
  {
    src: MilkBread,
    alt: "Japanese Milk Bread",
  },
];

export default CarouselPhotos;
