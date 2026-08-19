"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import { HiPlus } from "react-icons/hi";
import { ProductType } from "@/src/types/Type";
import { useCartsStore } from "@/utils/store";
import { toast } from "react-toastify";
import DeleteButton from "../DeleteButton";

interface MenuCardProps {
  item: ProductType;
  onClick: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
};

const MenuCard = ({ item, onClick }: MenuCardProps) => {
  const { addToCart } = useCartsStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: item.id,
      title: item.title,
      img: item.img,
      price: parseFloat(item.price),
      quantity: 1,
    });
    toast.success(`Added ${item.title} to cart!`);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-30px" }}
      className="group flex cursor-pointer flex-col gap-3"
      onClick={onClick}
    >
      <div className="border-bakery-gray relative aspect-square overflow-hidden rounded-2xl border-2">
        <Image
          src={item.img || "/placeholder.png"}
          alt={item.title}
          fill
          className="object-cover"
        />

        <DeleteButton id={item.id} className="absolute top-2.5 left-2.5 z-20" />

        <button
          type="button"
          onClick={handleQuickAdd}
          className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 absolute top-2.5 right-2.5 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white shadow-md transition-all hover:scale-110 active:scale-95"
          title={`Add ${item.title} to cart`}
        >
          <HiPlus size={18} />
        </button>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <p className="text-bakery-burgundy font-bakery-noto text-sm leading-snug font-bold md:text-base">
          {item.title}
        </p>

        <p className="font-bakery-noto line-clamp-2 text-xs leading-relaxed text-black/65 md:text-sm">
          {item.desc}
        </p>

        <p className="text-bakery-olive font-bakery-noto mt-0.5 text-sm font-bold md:text-base">
          ${Number(item.price).toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default MenuCard;
