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

export type OrderType = {
  id: string;
  userEmail: string;
  price: string;
  products: CartItemType[];
  status: string;
  createdAt: Date;
  intent_id?: string;
};

export type CartItemType = {
  id: string;
  title: string;
  img?: string;
  price: number;
  optionTitle?: string;
  quantity: number;
};
