"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HiOutlineX } from "react-icons/hi";
import { useSession } from "next-auth/react";
import { useQueryClient } from "@tanstack/react-query";

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
  status: "Preparing" | "Ready" | "Picked Up" | "Canceled";
  items: OrderItem[];
  customerName?: string;
  phone?: string;
  pickupTime?: string;
  subtotal?: string;
  tax?: string;
  tip?: string;
  fee?: string;
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
  initial: { opacity: 0, scale: 0.96, y: 15 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 15 },
  transition: { duration: 0.25, ease: "easeOut" as const },
};

const OrderPopup = ({ order, onClose }: OrderPopupProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (order) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [order, onClose]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Preparing":
        return "bg-bakery-olive/15 text-bakery-olive border-bakery-olive/30";
      case "Ready":
        return "bg-bakery-olive text-white border-bakery-olive";
      case "Picked Up":
        return "bg-bakery-gray text-black/70 border-bakery-gray";
      case "Canceled":
        return "bg-bakery-red/15 text-bakery-red border-bakery-red/30";
      default:
        return "bg-bakery-gray text-black/70 border-bakery-gray";
    }
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!order) return;
    const newStatus = e.target.value;
    if (!newStatus) return;

    await fetch(`/api/orders`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: order.id, status: newStatus }),
    });

    queryClient.invalidateQueries({ queryKey: ["orders"] });
    onClose();
  };

  return (
    <AnimatePresence>
      {order && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            {...overlayAnimation}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            {...popupAnimation}
            className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="border-bakery-gray flex shrink-0 items-center justify-between border-b px-6 py-5 md:px-8">
              <div>
                <p className="font-bakery-noto text-xl font-bold text-black md:text-2xl">
                  Order Details
                </p>
                <p className="text-xs text-black/50">#{order.id}</p>
              </div>
              <button
                onClick={onClose}
                className="hover:bg-bakery-burgundy flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/80 text-white transition-colors"
              >
                <HiOutlineX size={20} />
              </button>
            </div>

            <div className="flex flex-1 flex-col overflow-y-auto md:flex-row">
              <div className="border-bakery-gray bg-bakery-cream/30 flex flex-col gap-5 border-b p-6 md:w-5/12 md:border-r md:border-b-0 md:p-8">
                <div>
                  <p className="text-xs font-bold tracking-wider text-black/50 uppercase">
                    Order Date
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    {order.date}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wider text-black/50 uppercase">
                    Pickup Time
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    {order.pickupTime || "Standard (ASAP)"}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wider text-black/50 uppercase">
                    Customer Info
                  </p>
                  <p className="mt-1 text-sm font-semibold text-black">
                    {order.customerName || "Customer"}
                  </p>
                  {order.phone && (
                    <p className="text-xs text-black/70">{order.phone}</p>
                  )}
                </div>

                <div>
                  <p className="text-xs font-bold tracking-wider text-black/50 uppercase">
                    Status
                  </p>
                  <div className="mt-2 inline-block">
                    <div
                      className={`flex w-max items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-bold tracking-wider uppercase ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {session?.user.isAdmin ? (
                        <select
                          defaultValue={order.status}
                          onChange={handleStatusChange}
                          className="cursor-pointer bg-transparent font-bold uppercase outline-none"
                        >
                          <option value="Preparing">Preparing</option>
                          <option value="Ready">Ready</option>
                          <option value="Picked Up">Picked Up</option>
                          <option value="Canceled">Canceled</option>
                        </select>
                      ) : (
                        <p>{order.status}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 md:w-7/12 md:p-8">
                <p className="font-bakery-noto mb-4 text-base font-bold text-black md:text-lg">
                  Items Ordered
                </p>
                <div className="flex flex-col gap-3">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="border-bakery-gray/60 flex items-center justify-between border-b pb-3 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-bakery-cream flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-black">
                          {item.quantity}x
                        </div>
                        <p className="text-sm font-medium text-black">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-sm font-bold text-black">
                        ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-bakery-gray mt-6 border-t pt-5">
                  <p className="font-bakery-noto mb-3 text-sm font-bold text-black">
                    Payment Summary
                  </p>
                  <div className="flex flex-col gap-1.5 text-xs text-black/70">
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>${Number(order.subtotal || 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Tax</p>
                      <p>${Number(order.tax || 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Tip</p>
                      <p>${Number(order.tip || 0).toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between">
                      <p>Service Fee</p>
                      <p>${Number(order.fee || 0).toFixed(2)}</p>
                    </div>

                    <div className="bg-bakery-gray my-2 h-px w-full" />

                    <div className="flex justify-between text-base font-bold text-black">
                      <p>Total</p>
                      <p className="text-bakery-burgundy">
                        ${Number(order.total).toFixed(2)}
                      </p>
                    </div>
                  </div>
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
