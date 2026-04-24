"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import { CategoryItem } from "@/src/types/Type";
import { useEffect, useState } from "react";

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
  const [menu, setMenu] = useState<CategoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("http://localhost:3000/api/categories", {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setMenu(data);
      }
      setIsLoaded(true);
    };
    getData();
  }, []);

  return (
    <>
      <div className="h-1 w-screen bg-black" />

      <div className="bg-bakery-burgundy p-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-bakery-noto flex justify-center pt-10 pb-12 text-4xl font-bold text-white md:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          Menu
        </motion.div>

        {isLoaded && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid w-full grid-cols-2 items-start justify-items-center gap-12 px-4 md:grid-cols-4"
          >
            {menu.map((category) => (
              <motion.div
                key={`cat-animate-${category.id}`}
                variants={itemVariants}
              >
                <Link
                  href={`/menu/${category.slug}`}
                  className="flex flex-col items-center"
                >
                  <motion.div {...hoverScale}>
                    <Image
                      src={category.img as string}
                      alt={category.title}
                      width={128}
                      height={128}
                      unoptimized
                      priority
                      className="w-24 md:w-28 xl:w-32 2xl:w-auto"
                    />
                  </motion.div>
                  <p className="font-bakery-noto mt-6 text-center text-lg tracking-wide text-white md:text-2xl xl:text-3xl 2xl:text-4xl">
                    {category.title}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      <div className="h-1 w-screen bg-black" />
    </>
  );
};

export default Menu;
