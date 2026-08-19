"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ProductType } from "@/src/types/Type";
import { useCartsStore } from "@/utils/store";
import { toast } from "react-toastify";
import DeleteButton from "@/src/components/DeleteButton";

interface ProductPopupProps {
  item: ProductType | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (item: ProductType, quantity: number) => void;
}

const backdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const popupAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 15 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

const ProductPopup = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}: ProductPopupProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartsStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuantity(1);
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleClose = () => {
    setQuantity(1);
    onClose();
  };

  if (!isOpen || !item) return null;

  const handleAddToCartAction = () => {
    addToCart({
      id: item.id,
      title: item.title,
      img: item.img,
      price: parseFloat(item.price),
      quantity: quantity,
    });

    toast.success("Added to cart!");

    if (onAddToCart) {
      onAddToCart(item, quantity);
    }

    handleClose();
  };

  const totalPrice = (parseFloat(item.price) * quantity).toFixed(2);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            {...backdropAnimation}
            onClick={handleClose}
            className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            {...popupAnimation}
            className="relative z-10 flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black"
            >
              ✕
            </button>

            <DeleteButton id={item.id} className="absolute top-4 left-4 z-20" />

            <div className="relative aspect-4/3 max-h-[35vh] w-full shrink-0 overflow-hidden">
              <Image
                src={item.img || "/placeholder.png"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 p-6 md:p-8">
              <div>
                <h3 className="text-bakery-burgundy font-bakery-noto text-xl font-bold md:text-2xl">
                  {item.title}
                </h3>
                <p className="text-bakery-olive mt-1 text-lg font-bold">
                  ${item.price}
                </p>
              </div>

              <p className="font-bakery-noto text-sm leading-relaxed text-black/75 md:text-base">
                {item.desc}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="border-bakery-gray flex items-center overflow-hidden rounded-full border-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:bg-bakery-gray/50 cursor-pointer px-3.5 py-2 text-sm font-bold transition-colors"
                  >
                    -
                  </button>
                  <p className="w-10 text-center text-sm font-bold">
                    {quantity}
                  </p>
                  <button
                    onClick={() => setQuantity(Math.min(100, quantity + 1))}
                    className="hover:bg-bakery-gray/50 cursor-pointer px-3.5 py-2 text-sm font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCartAction}
                  className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 flex-1 cursor-pointer rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all md:text-base"
                >
                  Add • ${totalPrice}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductPopup;
