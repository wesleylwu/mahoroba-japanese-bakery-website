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
    <div className="bg-bakery-cream font-bakery-noto border-bakery-gray/60 border-t px-4 py-12 md:py-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-6xl flex-col items-center gap-10 lg:flex-row lg:gap-16"
      >
        <motion.div
          variants={itemVariants}
          className="flex w-full items-center justify-center text-center lg:w-1/2"
        >
          <Image
            src={AllPastries}
            alt="Mahoroba Bakery Pastries"
            className="mx-auto block h-auto max-w-full rounded-2xl"
          />
        </motion.div>

        <div className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left">
          <motion.h2
            variants={itemVariants}
            className="text-bakery-burgundy mb-4 text-2xl font-bold tracking-wide sm:text-3xl md:text-4xl"
          >
            The Pastries
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-sm leading-relaxed text-black/80 sm:text-base md:text-lg md:leading-loose"
          >
            Mahoroba specializes in Japanese-style breads and pastries,
            including classics like anpan (sweet red bean buns), melon pan, and
            soft Japanese milk bread. The menu features both sweet and savory
            options, such as custard-filled buns, matcha pastries, and hearty
            savory breads baked fresh each morning.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default ThePastries;
