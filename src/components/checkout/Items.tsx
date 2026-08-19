"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useCartsStore } from "@/utils/store";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

interface ItemsProps {
  tipAmount: number;
  subtotal: number;
  isLoading: boolean;
}

const Items = ({ tipAmount, subtotal, isLoading }: ItemsProps) => {
  const { products } = useCartsStore();

  const processingFee = subtotal * 0.035;
  const tax = subtotal * 0.0825;
  const finalTotal = subtotal + processingFee + tax + tipAmount;

  return (
    <motion.div {...fadeUp} className="sticky top-12 flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <p className="font-bakery-noto text-3xl font-bold text-black">Items</p>

        <div className="flex flex-col gap-4">
          {products.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="border-bakery-gray/60 relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border bg-white p-1">
                  <Image
                    src={item.img || "/placeholder.png"}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-black">{item.title}</p>
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

        <button
          type="submit"
          form="payment-form"
          disabled={isLoading}
          className="bg-bakery-olive hover:bg-opacity-90 mt-4 w-full cursor-pointer rounded-xl py-4 text-xl font-bold text-white shadow-lg transition-all disabled:cursor-not-allowed disabled:opacity-50"
        >
          <p>{isLoading ? "Processing..." : "Place Order"}</p>
        </button>
      </div>
    </motion.div>
  );
};

export default Items;
