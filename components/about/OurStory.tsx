"use client";

import Image from "next/image";
import Baker from "@/public/about/Baker.webp";
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

const OurStory = () => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="bg-bakery-cream font-bakery-noto flex flex-col items-center gap-8 p-8 sm:p-10 md:p-12 lg:flex-row-reverse lg:p-16 xl:p-20"
    >
      <motion.p
        variants={itemVariants}
        className="text-bakery-burgundy translate-y-10 text-3xl font-bold tracking-wide sm:text-4xl lg:hidden"
      >
        Our Story
      </motion.p>

      <motion.div
        variants={itemVariants}
        className="flex w-full items-center justify-center sm:ml-10 lg:w-1/2"
      >
        <Image
          src={Baker}
          alt="Mahoroba Baker Narusuke Monguchi"
          className="ml-10 lg:ml-0"
        />
      </motion.div>

      <div className="ml-4 flex w-full flex-col items-center justify-center gap-6 text-center lg:ml-28 lg:w-1/2 lg:items-start lg:gap-8 lg:text-left xl:ml-32 2xl:ml-36">
        <motion.p
          variants={itemVariants}
          className="text-bakery-burgundy hidden text-4xl font-bold tracking-wide lg:block lg:text-5xl xl:text-6xl 2xl:text-7xl"
        >
          Our Story
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="w-full text-sm leading-relaxed tracking-wider sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 2xl:leading-loose"
        >
          The bakery was opened in 2009 by owner and baker Narusuke Monguchi.
          When choosing where to open his bakery, Monguchi liked that Sacramento
          sounded similar to “sakura,” the Japanese word for cherry blossom,
          which made the city feel like the perfect place to start. The name
          “Mahoroba” comes from an ancient Japanese word meaning “a wonderful or
          peaceful place,” reflecting the bakery’s goal of creating a welcoming
          space filled with warm bread and good memories.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default OurStory;
