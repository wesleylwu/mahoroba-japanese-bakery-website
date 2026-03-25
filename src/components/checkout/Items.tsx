"use client";

import { motion } from "motion/react";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

interface ItemsProps {
  tipAmount: number;
  subtotal: number;
}

const Items = ({ tipAmount, subtotal }: ItemsProps) => {
  const processingFee = subtotal * 0.035;
  const tax = subtotal * 0.0825;
  const finalTotal = subtotal + processingFee + tax + tipAmount;

  const dummyItems = [
    { id: 1, name: "Matcha Croissant", price: 6.5, quantity: 2 },
    { id: 2, name: "Strawberry Shortcake", price: 8.5, quantity: 1 },
    { id: 3, name: "Yuzu Tart", price: 7.0, quantity: 3 },
  ];

  return (
    <motion.div {...fadeUp} className="sticky top-12 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-3xl font-bold text-black">Items</p>

        <div className="flex flex-col gap-4">
          {dummyItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-200">
                  <div className="absolute inset-0 flex items-center justify-center text-sm text-gray-400">
                    <p>Img</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-black">{item.name}</p>
                  <p className="text-black opacity-60">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="text-lg font-bold text-black">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 pt-6">
        <p className="font-bakery-noto text-3xl font-bold text-black">Review</p>

        <div className="flex flex-col gap-3 text-lg text-black">
          <div className="flex justify-between">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Tax</p>
            <p>${tax.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Tip</p>
            <p>${tipAmount.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p>Processing Fee</p>
            <p>${processingFee.toFixed(2)}</p>
          </div>

          <div className="bg-bakery-gray my-4 h-px w-full" />

          <div className="flex justify-between text-2xl font-bold">
            <p>Total</p>
            <p>${finalTotal.toFixed(2)}</p>
          </div>
        </div>

        <button className="bg-bakery-olive hover:bg-opacity-90 mt-4 w-full cursor-pointer rounded-xl py-4 text-xl font-bold text-white shadow-lg transition-all">
          <p>Place Order</p>
        </button>
      </div>
    </motion.div>
  );
};

export default Items;
