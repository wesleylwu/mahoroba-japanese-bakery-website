import { StaticImageData } from "next/image";

export type CategoryItem = {
  id: string;
  slug: string;
  title: string;
  img: string | StaticImageData;
};

export type ProductType = {
  id: string;
  title: string;
  desc: string;
  price: string;
  img: string;
  catSlug: string;
};
