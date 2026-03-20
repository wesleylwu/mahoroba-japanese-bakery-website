"use client";

import Image from "next/image";
import { motion } from "motion/react";
import AnpanmanTray from "@/public/home/ourDailyPromise/AnpanmanTray.webp";

const OurDailyPromise = () => {
  return (
    <div className="mx-auto flex min-h-[70vh] w-[90vw] items-center justify-center py-12 2xl:w-[70vw]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-bakery-olive flex w-full flex-col items-center gap-10 rounded-3xl border-3 p-8 md:p-12 xl:flex-row xl:gap-16 2xl:p-16"
      >
        <div className="relative h-[40vh] w-full xl:h-[50vh] xl:w-1/2 2xl:h-[60vh]">
          <Image
            src={AnpanmanTray}
            alt="Tray of Anpanman pastries"
            fill
            className="object-contain"
          />
        </div>

        <div className="font-bakery-noto flex w-full flex-col items-center justify-center text-center text-white xl:w-1/2 xl:items-start xl:text-left">
          <p className="mb-8 text-3xl font-bold md:mb-12 md:text-4xl lg:text-5xl 2xl:text-6xl">
            Our Daily Promise
          </p>
          <p className="text-xl leading-20 md:text-2xl md:leading-24 lg:text-3xl lg:leading-28 2xl:text-4xl 2xl:leading-32">
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
