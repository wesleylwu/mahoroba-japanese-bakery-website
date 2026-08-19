"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import Sweet from "@/public/home/menu/Sweet.svg";
import Savory from "@/public/home/menu/Savory.svg";
import PiesAndDanishes from "@/public/home/menu/PiesAndDanishes.svg";
import LoavesAndRolls from "@/public/home/menu/LoavesAndRolls.svg";

const CATEGORIES = [
  {
    title: "Sweet",
    slug: "sweet",
    img: Sweet,
  },
  {
    title: "Savory",
    slug: "savory",
    img: Savory,
  },
  {
    title: "Pies & Danishes",
    slug: "pies-and-danishes",
    img: PiesAndDanishes,
  },
  {
    title: "Loaves & Rolls",
    slug: "loaves-and-rolls",
    img: LoavesAndRolls,
  },
];

const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Menu = () => {
  return (
    <>
      <div className="h-1 w-screen bg-black" />

      <div className="bg-bakery-burgundy p-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-bakery-noto flex justify-center pt-6 pb-10 text-3xl font-bold tracking-wider text-white md:text-4xl"
        >
          Menu
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid w-full grid-cols-2 items-start justify-items-center gap-10 px-4 md:grid-cols-4 md:gap-12"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={`cat-animate-${category.slug}`}
              variants={itemVariants}
            >
              <Link
                href={`/menu/${category.slug}`}
                className="flex flex-col items-center"
              >
                <motion.div {...hoverScale}>
                  <Image
                    src={category.img}
                    alt={category.title}
                    className="w-20 md:w-24 xl:w-28"
                    priority
                  />
                </motion.div>
                <p className="font-bakery-noto mt-4 text-center text-base font-bold tracking-wider text-white md:text-lg">
                  {category.title}
                </p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="h-1 w-screen bg-black" />
    </>
  );
};

export default Menu;
