"use client";

import Image from "next/image";
import { motion, Variants } from "motion/react";
import { MenuItem } from "@/data/Products";

interface MenuCardProps {
  item: MenuItem;
  onClick: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const MenuCard = ({ item, onClick }: MenuCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="group flex cursor-pointer flex-col gap-6"
      onClick={onClick}
    >
      <div className="border-bakery-gray relative aspect-square overflow-hidden rounded-2xl border-2 bg-white">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col gap-3 px-1">
        <div className="flex flex-col gap-2">
          <p className="text-bakery-burgundy font-bakery-noto text-lg leading-tight font-bold md:text-xl">
            {item.title}
          </p>

          <p className="font-bakery-noto text-sm leading-relaxed text-black md:text-base">
            {item.description}
          </p>

          <p className="mt-2 text-lg font-bold text-black">${item.price}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuCard;
