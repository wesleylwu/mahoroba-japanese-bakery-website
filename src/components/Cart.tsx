"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { MenuItem } from "@/src/data/Products";
import { HiOutlineTrash, HiOutlineX } from "react-icons/hi";

export interface CartItemType extends MenuItem {
  quantity: number;
}

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItemType[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const drawerAnimation = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { type: "spring" as const, damping: 25, stiffness: 200 },
};

const Cart = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartProps) => {
  const router = useRouter();

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

  const subtotal = items.reduce(
    (total, item) => total + parseFloat(item.price) * item.quantity,
    0,
  );

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            {...overlayAnimation}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            {...drawerAnimation}
            className="relative z-10 flex h-full w-full max-w-md flex-col rounded-l-3xl bg-white shadow-2xl"
          >
            <div className="border-bakery-gray flex shrink-0 items-center justify-between border-b p-6">
              <p className="font-bakery-noto text-2xl font-bold text-black">
                Your Order
              </p>
              <button
                onClick={onClose}
                className="hover:bg-bakery-burgundy flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black font-bold text-white transition-colors"
              >
                <HiOutlineX size={20} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto bg-white p-6">
              {items.length === 0 ? (
                <div className="font-bakery-noto flex flex-1 items-center justify-center text-lg text-black">
                  Your cart is currently empty.
                </div>
              ) : (
                <div className="flex flex-col">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="border-bakery-gray flex items-center gap-4 border-b py-6 last:border-b-0"
                    >
                      <div className="border-bakery-gray relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border bg-white">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-center">
                        <p className="font-bakery-noto text-base leading-tight font-bold text-black sm:text-lg">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm font-bold text-black sm:text-base">
                          ${item.price}
                        </p>
                      </div>

                      <div className="border-bakery-gray flex h-10 shrink-0 items-center overflow-hidden rounded-full border-2">
                        {item.quantity === 1 ? (
                          <button
                            onClick={() => onRemoveItem(item.id)}
                            className="hover:bg-bakery-gray/50 group flex h-full cursor-pointer items-center justify-center px-3 transition-colors"
                          >
                            <HiOutlineTrash
                              size={18}
                              className="group-hover:text-bakery-red text-black transition-colors"
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="hover:bg-bakery-gray/50 flex h-full cursor-pointer items-center justify-center px-3 text-lg text-black transition-colors"
                          >
                            -
                          </button>
                        )}

                        <p className="w-8 text-center text-sm font-bold text-black">
                          {item.quantity}
                        </p>

                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.id,
                              Math.min(100, item.quantity + 1),
                            )
                          }
                          className="hover:bg-bakery-gray/50 flex h-full cursor-pointer items-center justify-center px-3 text-lg text-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-bakery-gray shrink-0 rounded-bl-3xl border-t bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-bakery-noto text-xl font-bold text-black">
                  Total:
                </p>
                <p className="text-2xl font-bold text-black">
                  ${subtotal.toFixed(2)}
                </p>
              </div>
              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 w-full cursor-pointer rounded-full px-6 py-4 text-lg font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
