"use client";

import { useState } from "react";
import { MenuItem } from "@/data/Products";
import MenuCard from "./MenuCard";
import ProductModal from "./ProductModal";

interface MenuEntryProps {
  items: MenuItem[];
}

const CATEGORIES = [
  "ALL",
  "SWEET",
  "SAVORY",
  "PIES & DANISHES",
  "LOAVES & ROLLS",
] as const;

const MenuEntry = ({ items }: MenuEntryProps) => {
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems =
    filter === "ALL"
      ? items
      : items.filter((item) => item.category.toUpperCase() === filter);

  const displayCategories =
    filter === "ALL"
      ? ["sweet", "savory", "pies & danishes", "loaves & rolls"]
      : [filter.toLowerCase()];

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
      <div className="border-bakery-gray flex flex-wrap justify-center gap-8 border-b py-12 md:gap-16">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`cursor-pointer text-base font-bold tracking-widest transition-colors md:text-xl ${
              filter === cat
                ? "text-bakery-burgundy underline underline-offset-8"
                : "hover:text-bakery-burgundy text-black"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        {displayCategories.map((catName) => {
          const categoryItems = filteredItems.filter(
            (item) => item.category === catName,
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
