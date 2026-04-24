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
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
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
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div
            {...backdropAnimation}
            onClick={handleClose}
            className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            {...popupAnimation}
            className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-4xl bg-white shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black"
            >
              ✕
            </button>

            <DeleteButton id={item.id} className="absolute top-4 left-4 z-20" />

            <div className="relative aspect-video max-h-[30vh] w-full shrink-0 -translate-y-1 overflow-hidden bg-white sm:aspect-square">
              <Image
                src={item.img || "/placeholder.png"}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-4 overflow-y-auto p-6 md:p-8">
              <div>
                <p className="text-bakery-burgundy font-bakery-noto text-base font-bold sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  {item.title}
                </p>
                <p className="mt-1 text-base font-bold text-black sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
                  ${item.price}
                </p>
              </div>

              <p className="font-bakery-noto text-xs leading-relaxed text-black sm:text-sm md:text-base lg:text-lg xl:text-xl">
                {item.desc}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <div className="border-bakery-gray flex items-center overflow-hidden rounded-full border-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:bg-bakery-gray cursor-pointer px-4 py-3 text-sm transition-colors sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                  >
                    -
                  </button>
                  <p className="w-12 text-center text-sm font-bold sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                    {quantity}
                  </p>
                  <button
                    onClick={() => setQuantity(Math.min(100, quantity + 1))}
                    className="hover:bg-bakery-gray cursor-pointer px-4 py-3 text-sm transition-colors sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCartAction}
                  className="bg-bakery-burgundy hover:bg-opacity-90 flex-1 cursor-pointer rounded-full px-6 py-3 text-xs font-bold text-white transition-opacity sm:text-sm md:text-base lg:text-lg xl:text-xl"
                >
                  Add - ${totalPrice}
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
