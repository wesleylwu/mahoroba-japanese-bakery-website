"use client";

import { useState } from "react";
import Link from "next/link";
import MenuCard from "@/src/components/menu/MenuCard";
import ProductPopup from "@/src/components/menu/ProductPopup";
import { ProductType } from "@/src/types/Type";

interface MenuEntryProps {
  items: ProductType[];
  activeCategory?: string;
}

const CATEGORIES = [
  { name: "ALL", path: "/menu", slug: "all" },
  { name: "SWEET", path: "/menu/sweet", slug: "sweet" },
  { name: "SAVORY", path: "/menu/savory", slug: "savory" },
  {
    name: "PIES & DANISHES",
    path: "/menu/piesAndDanishes",
    slug: "piesAndDanishes",
  },
  {
    name: "LOAVES & ROLLS",
    path: "/menu/loavesAndRolls",
    slug: "loavesAndRolls",
  },
];

const MenuEntry = ({ items, activeCategory = "all" }: MenuEntryProps) => {
  const [selectedItem, setSelectedItem] = useState<ProductType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const safeCategory = activeCategory || "all";

  const filteredItems =
    safeCategory === "all"
      ? items
      : items.filter((item) => item.catSlug === safeCategory);

  const displayCategories =
    safeCategory === "all"
      ? CATEGORIES.filter((c) => c.slug !== "all")
      : CATEGORIES.filter((c) => c.slug === safeCategory);

  const handleOpenPopup = (item: ProductType) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => setSelectedItem(null), 200);
  };

  const handleAddToCart = (item: ProductType, quantity: number) => {
    console.log(`Added ${quantity}x ${item.title} to order`);
  };

  return (
    <div className="bg-bakery-cream relative min-h-screen w-full">
      <div className="border-bakery-gray flex flex-wrap justify-center gap-8 border-b py-12 md:gap-16">
        {CATEGORIES.map((cat) => (
          <Link
            href={cat.path}
            key={cat.slug}
            className={`cursor-pointer text-base font-bold tracking-widest transition-colors md:text-xl ${
              safeCategory === cat.slug
                ? "text-bakery-burgundy underline underline-offset-8"
                : "hover:text-bakery-burgundy text-black"
            }`}
          >
            <p>{cat.name}</p>
          </Link>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        {displayCategories.map((catObj) => {
          const categoryItems = filteredItems.filter(
            (item) => item.catSlug === catObj.slug,
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={catObj.slug} className="mb-32 last:mb-0">
              <p className="text-bakery-burgundy font-bakery-noto border-bakery-burgundy/10 mb-16 inline-block border-b-4 pb-4 text-2xl font-bold tracking-wider uppercase md:text-3xl">
                {catObj.name}
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-24 md:gap-x-12 lg:grid-cols-3 xl:grid-cols-4">
                {categoryItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onClick={() => handleOpenPopup(item)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProductPopup
        item={selectedItem}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default MenuEntry;
