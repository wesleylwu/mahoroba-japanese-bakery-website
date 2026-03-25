"use client";

import Image from "next/image";
import AllPastries from "@/public/about/AllPastries.webp";
import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const ThePastries = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-bakery-cream font-bakery-noto flex flex-col items-center gap-8 p-8 sm:p-10 md:p-12 lg:flex-row lg:p-16 xl:p-20"
    >
      <motion.p
        variants={itemVariants}
        className="text-bakery-burgundy translate-y-10 text-2xl font-bold tracking-wide sm:text-3xl lg:hidden"
      >
        The Pastries
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex w-full items-center justify-center lg:w-1/2"
      >
        <Image
          src={AllPastries}
          alt="Mahoroba Bakery Pastries"
          className="mr-10 lg:mr-0"
        />
      </motion.div>

      <div className="flex w-full flex-col items-center justify-center gap-6 text-center lg:w-1/2 lg:items-start lg:gap-8 lg:text-left">
        <motion.p
          variants={itemVariants}
          className="text-bakery-burgundy hidden text-3xl font-bold tracking-wide lg:block lg:text-4xl xl:text-5xl 2xl:text-6xl"
        >
          The Pastries
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="w-full text-xs leading-relaxed tracking-wider sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 2xl:leading-loose"
        >
          Mahoroba specializes in Japanese-style breads and pastries, including
          classics like anpan (sweet red bean buns), melon pan, and soft
          Japanese milk bread. The menu features both sweet and savory options,
          such as custard-filled buns, matcha pastries, and hearty savory
          breads. Many customers come early in the day to enjoy pastries that
          are freshly baked and often still warm from the oven.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ThePastries;
