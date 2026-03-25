"use client";

import { motion, AnimatePresence } from "motion/react";
import { HiOutlineX } from "react-icons/hi";

export interface OrderItem {
  id: string;
  title: string;
  quantity: number;
  price: string;
}

export interface Order {
  id: string;
  date: string;
  total: string;
  status: "Preparing" | "Ready" | "Picked Up";
  items: OrderItem[];
}

interface OrderPopupProps {
  order: Order | null;
  onClose: () => void;
}

const overlayAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const popupAnimation = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { type: "spring" as const, damping: 25, stiffness: 300 },
};

const OrderPopup = ({ order, onClose }: OrderPopupProps) => {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Preparing":
        return "bg-bakery-red/10 text-bakery-red border-bakery-red/20";
      case "Ready":
        return "bg-bakery-olive/10 text-bakery-olive border-bakery-olive/20";
      case "Picked Up":
        return "bg-bakery-gray text-black/60 border-bakery-gray";
      default:
        return "bg-bakery-gray text-black border-bakery-gray";
    }
  };

  return (
    <AnimatePresence>
      {order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
          <motion.div
            {...overlayAnimation}
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            {...popupAnimation}
            className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="border-bakery-gray flex shrink-0 items-center justify-between border-b p-6 md:p-8">
              <p className="font-bakery-noto text-2xl font-bold text-black md:text-3xl">
                Order #{order.id}
              </p>
              <div
                onClick={onClose}
                className="hover:bg-bakery-burgundy flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black font-bold text-white transition-colors"
              >
                <HiOutlineX size={24} />
              </div>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
              <div className="border-bakery-gray bg-bakery-gray/10 flex flex-col gap-6 border-b p-6 md:w-1/3 md:border-r md:border-b-0 md:p-8">
                <div>
                  <p className="text-sm font-bold tracking-wider text-black/50 uppercase">
                    Date
                  </p>
                  <p className="mt-1 text-lg font-bold text-black">
                    {order.date}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold tracking-wider text-black/50 uppercase">
                    Status
                  </p>
                  <div className="mt-2 inline-block">
                    <div
                      className={`rounded-full border px-4 py-2 text-sm font-bold tracking-wider uppercase ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      <p>{order.status}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <p className="text-sm font-bold tracking-wider text-black/50 uppercase">
                    Total
                  </p>
                  <p className="font-bakery-noto mt-1 text-3xl font-bold text-black">
                    ${order.total}
                  </p>
                </div>
              </div>

              <div className="flex flex-col p-6 md:w-2/3 md:p-8">
                <p className="font-bakery-noto mb-6 text-xl font-bold text-black">
                  Order Items
                </p>
                <div className="flex flex-col gap-4">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="border-bakery-gray flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-4">
                        <div className="bg-bakery-cream flex h-10 w-10 items-center justify-center rounded-full font-bold text-black">
                          <p>{item.quantity}x</p>
                        </div>
                        <p className="text-lg font-bold text-black">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-lg font-bold text-black">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderPopup;
