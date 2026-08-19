"use client";

import { motion, Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Header = () => {
  return (
    <>
      <div className="bg-bakery-burgundy h-1.5 w-screen" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-bakery-cream font-bakery-noto text-bakery-burgundy flex flex-col items-center justify-center px-6 py-10 text-center sm:py-14"
      >
        <motion.span
          variants={itemVariants}
          className="text-2xl font-bold tracking-wider sm:text-3xl md:text-4xl"
        >
          Mahoroba Japanese Bakery
        </motion.span>
        <motion.span
          variants={itemVariants}
          className="mt-2 text-sm font-normal tracking-widest text-black/60 sm:text-base md:text-lg"
        >
          まほろばベーカリー
        </motion.span>
      </motion.div>
    </>
  );
};

export default Header;
