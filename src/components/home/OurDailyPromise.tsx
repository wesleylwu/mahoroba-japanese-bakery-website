"use client";

import Image from "next/image";
import { motion } from "motion/react";
import AnpanmanTray from "@/public/home/ourDailyPromise/AnpanmanTray.webp";

const OurDailyPromise = () => {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-12 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-bakery-olive flex w-full flex-col items-center gap-8 rounded-3xl p-8 shadow-xl md:p-12 lg:flex-row lg:gap-12"
      >
        <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl lg:w-1/2">
          <Image
            src={AnpanmanTray}
            alt="Tray of Anpanman pastries"
            fill
            className="object-cover"
          />
        </div>

        <div className="font-bakery-noto flex w-full flex-col items-center justify-center text-center text-white lg:w-1/2 lg:items-start lg:text-left">
          <p className="mb-4 text-2xl font-bold tracking-wider md:text-3xl lg:text-4xl">
            Our Daily Promise
          </p>
          <p className="text-base leading-relaxed tracking-wider text-white/90 sm:text-lg md:text-xl md:leading-loose">
            Fresh from the oven,
            <br />
            Soft, pillowy, rich delights,
            <br />
            Ready on the go
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OurDailyPromise;
