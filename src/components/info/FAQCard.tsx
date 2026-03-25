"use client";

import { motion } from "motion/react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/info/Accordion";

interface FAQQuestion {
  question: string;
  answer: string;
}

const cardAnimation = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  whileInView: { opacity: 1, y: 0, scale: 1 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.6,
    type: "spring" as const,
    bounce: 0.4,
  },
};

const FAQCard = ({ item }: { item: FAQQuestion }) => {
  return (
    <motion.div
      {...cardAnimation}
      className="mx-auto w-[95vw] max-w-6xl sm:w-[90vw] md:w-[85vw] lg:w-[80vw] xl:w-[75vw] 2xl:w-[65vw]"
    >
      <AccordionItem
        value={`faq-${item.question}`}
        className="overflow-hidden rounded-xl shadow-sm"
      >
        <AccordionTrigger className="bg-bakery-olive font-bakery-noto px-6 py-5 text-left text-white">
          <p className="text-sm font-semibold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
            {item.question}
          </p>
        </AccordionTrigger>
        <AccordionContent className="font-bakery-noto bg-white px-6 py-5 text-xs whitespace-pre-line text-black sm:text-sm md:text-base lg:text-lg">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default FAQCard;
