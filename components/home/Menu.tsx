"use client";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "motion/react";
import Sweet from "@/public/home/menu/Sweet.svg";
import Savory from "@/public/home/menu/Savory.svg";
import PiesAndDanishes from "@/public/home/menu/PiesAndDanishes.svg";
import LoavesAndRolls from "@/public/home/menu/LoavesAndRolls.svg";

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
          className="font-bakery-noto flex justify-center pt-10 pb-12 text-4xl font-bold text-white md:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          Menu
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid w-full grid-cols-2 items-start justify-items-center gap-12 px-4 md:grid-cols-4"
        >
          <motion.div variants={itemVariants}>
            <Link href="/menu/sweet" className="flex flex-col items-center">
              <motion.div {...hoverScale}>
                <Image
                  src={Sweet}
                  alt="Sweet"
                  className="w-24 md:w-28 xl:w-32 2xl:w-auto"
                />
              </motion.div>
              <p className="font-bakery-noto mt-6 text-center text-lg tracking-wide text-white md:text-2xl xl:text-3xl 2xl:text-4xl">
                Sweet
              </p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link href="/menu/savory" className="flex flex-col items-center">
              <motion.div {...hoverScale}>
                <Image
                  src={Savory}
                  alt="Savory"
                  className="w-24 md:w-24 xl:w-32 2xl:w-auto"
                />
              </motion.div>
              <p className="font-bakery-noto mt-6 text-center text-lg tracking-wide text-white md:text-2xl xl:text-3xl 2xl:text-4xl">
                Savory
              </p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/menu/pies-and-danishes"
              className="flex flex-col items-center"
            >
              <motion.div {...hoverScale}>
                <Image
                  src={PiesAndDanishes}
                  alt="Pies and Danishes"
                  className="w-24 md:w-24 xl:w-32 2xl:w-auto"
                />
              </motion.div>
              <p className="font-bakery-noto mt-6 text-center text-lg tracking-wide text-white md:text-2xl xl:text-3xl 2xl:text-4xl">
                Pies and Danishes
              </p>
            </Link>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Link
              href="/menu/loaves-and-rolls"
              className="flex flex-col items-center"
            >
              <motion.div {...hoverScale}>
                <Image
                  src={LoavesAndRolls}
                  alt="Loaves and Rolls"
                  className="w-24 md:w-24 xl:w-32 2xl:w-auto"
                />
              </motion.div>
              <p className="font-bakery-noto mt-6 text-center text-lg tracking-wide text-white md:text-2xl xl:text-3xl 2xl:text-4xl">
                Loaves and Rolls
              </p>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="h-1 w-screen bg-black" />
    </>
  );
};

export default Menu;
