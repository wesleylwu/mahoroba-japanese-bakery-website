"use client";

import { useState } from "react";
import Link from "next/link";
import { MenuItem } from "@/data/Products";
import MenuCard from "@/components/menu/MenuCard";
import ProductModal from "@/components/menu/ProductPopup";

interface MenuEntryProps {
  items: MenuItem[];
  activeCategory: string;
}

const CATEGORIES = [
  { name: "ALL", path: "/menu" },
  { name: "SWEET", path: "/menu/sweet" },
  { name: "SAVORY", path: "/menu/savory" },
  { name: "PIES & DANISHES", path: "/menu/pies-and-danishes" },
  { name: "LOAVES & ROLLS", path: "/menu/loaves-and-rolls" },
];

const MenuEntry = ({ items, activeCategory }: MenuEntryProps) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems =
    activeCategory === "ALL"
      ? items
      : items.filter((item) => item.category.toUpperCase() === activeCategory);

  const displayCategories =
    activeCategory === "ALL"
      ? ["sweet", "savory", "pies & danishes", "loaves & rolls"]
      : [activeCategory.toLowerCase()];

  const handleOpenModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedItem(null), 200);
  };

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    console.log(`Added ${quantity}x ${item.title} to order`);
  };

  return (
    <div className="bg-bakery-cream relative min-h-screen w-full">
      <div className="pt-16 text-center">
        <p className="font-bakery-noto text-bakery-burgundy text-4xl font-bold tracking-wider uppercase md:text-5xl">
          {activeCategory === "ALL" ? "MENU" : activeCategory}
        </p>
      </div>

      <div className="border-bakery-gray flex flex-wrap justify-center gap-8 border-b py-12 md:gap-16">
        {CATEGORIES.map((cat) => (
          <Link
            href={cat.path}
            key={cat.name}
            className={`cursor-pointer text-base font-bold tracking-widest transition-colors md:text-xl ${
              activeCategory === cat.name
                ? "text-bakery-burgundy underline underline-offset-8"
                : "hover:text-bakery-burgundy text-black"
            }`}
          >
            <p>{cat.name}</p>
          </Link>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        {displayCategories.map((catName) => {
          const categoryItems = filteredItems.filter(
            (item) => item.category.toLowerCase() === catName,
          );

          if (categoryItems.length === 0) return null;

          return (
            <div key={catName} className="mb-32 last:mb-0">
              <p className="text-bakery-burgundy font-bakery-noto border-bakery-burgundy/10 mb-16 inline-block border-b-4 pb-4 text-2xl font-bold tracking-wider uppercase md:text-3xl">
                {catName}
              </p>

              <div className="grid grid-cols-2 gap-x-6 gap-y-24 md:gap-x-12 lg:grid-cols-3 xl:grid-cols-4">
                {categoryItems.map((item) => (
                  <MenuCard
                    key={item.id}
                    item={item}
                    onClick={() => handleOpenModal(item)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProductModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default MenuEntry;
