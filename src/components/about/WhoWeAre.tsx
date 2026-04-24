"use client";

import Image from "next/image";
import Interior from "@/public/about/Interior.webp";
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

const WhoWeAre = () => {
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
        Who We Are
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex w-full items-center justify-center lg:w-1/2"
      >
        <Image
          src={Interior}
          alt="Mahoroba Bakery Interior"
          className="mr-10 lg:mr-0"
        />
      </motion.div>

      <div className="flex w-full flex-col items-center justify-center gap-6 text-center lg:w-1/2 lg:items-start lg:gap-8 lg:text-left">
        <motion.p
          variants={itemVariants}
          className="text-bakery-burgundy hidden text-3xl font-bold tracking-wide lg:block lg:text-4xl xl:text-5xl 2xl:text-6xl"
        >
          Who We Are
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="w-full text-xs leading-relaxed tracking-wider sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 2xl:leading-loose"
        >
          Mahoroba Japanese Bakery is a family-run bakery in West Sacramento
          known for its freshly baked Japanese pastries and breads. Combining
          traditional Japanese flavors with modern baking techniques, the bakery
          offers a variety of sweet and savory treats made fresh each morning.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WhoWeAre;
