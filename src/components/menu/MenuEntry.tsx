"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { HiPlus, HiOutlineSearch } from "react-icons/hi";
import MenuCard from "@/src/components/menu/MenuCard";
import ProductPopup from "@/src/components/menu/ProductPopup";
import AddProductModal from "@/src/components/menu/AddProductModal";
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
    path: "/menu/pies-and-danishes",
    slug: "pies-and-danishes",
  },
  {
    name: "LOAVES & ROLLS",
    path: "/menu/loaves-and-rolls",
    slug: "loaves-and-rolls",
  },
];

const MenuEntry = ({ items, activeCategory = "all" }: MenuEntryProps) => {
  const { data: session } = useSession();
  const [productList, setProductList] = useState<ProductType[]>(items || []);
  const [selectedItem, setSelectedItem] = useState<ProductType | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const safeCategory = activeCategory || "all";
  const itemList = Array.isArray(productList) ? productList : [];

  const filteredItems =
    safeCategory === "all"
      ? itemList
      : itemList.filter((item) => item.catSlug === safeCategory);

  const searchedItems = filteredItems.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      item.title.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );
  });

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

  const handleProductAdded = (newProduct: ProductType) => {
    setProductList((prev) => [...prev, newProduct]);
  };

  return (
    <div className="bg-bakery-cream relative min-h-screen w-full">
      <div className="border-bakery-gray flex flex-wrap items-center justify-center gap-6 border-b py-8 md:gap-12 md:py-10">
        {CATEGORIES.map((cat) => (
          <Link
            href={cat.path}
            key={cat.slug}
            className={`cursor-pointer text-sm font-bold tracking-wider transition-colors md:text-base ${
              safeCategory === cat.slug
                ? "text-bakery-burgundy border-bakery-burgundy border-b-2 pb-1"
                : "hover:text-bakery-burgundy text-black/70"
            }`}
          >
            <p>{cat.name}</p>
          </Link>
        ))}

        {session?.user?.isAdmin && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 flex cursor-pointer items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-white shadow-sm transition-all md:text-sm"
          >
            <HiPlus size={16} />
            <span>Add Product</span>
          </button>
        )}
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-8 md:px-6">
        <div className="relative mx-auto max-w-md">
          <HiOutlineSearch
            size={18}
            className="absolute top-1/2 left-3.5 -translate-y-1/2 text-black/40"
          />
          <input
            type="text"
            placeholder="Search pastries (e.g. Matcha, Croissant, Anpan)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-bakery-gray focus:border-bakery-burgundy w-full rounded-full border-2 bg-white py-2.5 pr-4 pl-10 text-sm text-black transition-colors outline-none"
          />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        {displayCategories.map((catObj) => {
          const categoryItems = searchedItems
            .filter((item) => item.catSlug === catObj.slug)
            .sort((a, b) => a.title.localeCompare(b.title));

          if (categoryItems.length === 0) return null;

          return (
            <div key={catObj.slug} className="mb-20 last:mb-0">
              <div className="border-bakery-burgundy/15 mb-10 flex items-center justify-between border-b pb-3">
                <p className="text-bakery-burgundy font-bakery-noto text-xl font-bold tracking-wider uppercase md:text-2xl">
                  {catObj.name}
                </p>
                <span className="text-xs text-black/40">
                  {categoryItems.length} items
                </span>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:gap-x-8 lg:grid-cols-3 xl:grid-cols-4">
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

        {searchedItems.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-bakery-noto text-base text-black/60 md:text-lg">
              No pastries found matching &quot;{searchQuery}&quot;.
            </p>
          </div>
        )}
      </div>

      <ProductPopup
        item={selectedItem}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
};

export default MenuEntry;
