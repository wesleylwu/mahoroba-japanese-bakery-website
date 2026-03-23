import { StaticImageData } from "next/image";
import StrawberryAnko from "@/public/menu/StrawberryAnko.webp";
import SweetCreamCheese from "@/public/menu/SweetCreamCheese.webp";
import TropicalDesert from "@/public/menu/TropicalDesert.webp";
import Sunrise from "@/public/menu/Sunrise.webp";

export interface MenuItem {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  price: string;
  category: "sweet" | "savory" | "pies & danishes" | "loaves & rolls";
}

const MenuData: MenuItem[] = [
  {
    id: "test-1",
    image: StrawberryAnko,
    title: "Strawberry Anko",
    description:
      "Soft Japanese bread filled with sweet red bean paste and fresh strawberry flavor.",
    price: "3.50",
    category: "sweet",
  },
  {
    id: "test-2",
    image: SweetCreamCheese,
    title: "Sweet Cream Cheese",
    description:
      "Savory and sweet fusion bread filled with a rich, velvety cream cheese center.",
    price: "4.50",
    category: "savory",
  },
  {
    id: "test-3",
    image: TropicalDesert,
    title: "Tropical Desert",
    description:
      "A flaky danish pastry topped with tropical fruits and a light glaze.",
    price: "3.75",
    category: "pies & danishes",
  },
  {
    id: "test-4",
    image: Sunrise,
    title: "Sunrise",
    description:
      "Classic Japanese melon pan with a crisp cookie crust and fluffy interior.",
    price: "3.25",
    category: "loaves & rolls",
  },
];

export default MenuData;
