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
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-30px" },
  transition: {
    duration: 0.5,
    ease: "easeOut" as const,
  },
};

const FAQCard = ({ item }: { item: FAQQuestion }) => {
  return (
    <motion.div {...cardAnimation} className="w-full">
      <AccordionItem
        value={`faq-${item.question}`}
        className="border-bakery-gray overflow-hidden rounded-2xl border-2 shadow-sm transition-shadow hover:shadow-md"
      >
        <AccordionTrigger className="bg-bakery-olive font-bakery-noto px-6 py-4.5 text-left text-white transition-opacity hover:opacity-95">
          <p className="text-sm font-bold sm:text-base md:text-lg">
            {item.question}
          </p>
        </AccordionTrigger>
        <AccordionContent className="font-bakery-noto bg-white px-6 py-5 text-sm leading-relaxed whitespace-pre-line text-black/80 md:text-base">
          {item.answer}
        </AccordionContent>
      </AccordionItem>
    </motion.div>
  );
};

export default FAQCard;
