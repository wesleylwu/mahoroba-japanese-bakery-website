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
      <div className="bg-bakery-burgundy h-2 w-screen" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-bakery-cream font-bakery-noto text-bakery-burgundy flex flex-col items-center justify-center p-10 text-center text-2xl leading-normal font-bold tracking-wide sm:text-3xl md:text-4xl md:leading-relaxed md:tracking-wider lg:text-5xl xl:text-6xl xl:leading-loose xl:tracking-widest 2xl:text-7xl"
      >
        <motion.span variants={itemVariants}>
          Mahoroba Japanese Bakery
        </motion.span>
        <motion.span variants={itemVariants}>まほろばベーカリー</motion.span>
      </motion.div>
    </>
  );
};

export default Header;
