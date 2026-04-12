"use client";

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
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, y: 20 },
  transition: { type: "spring" as const, damping: 25, stiffness: 300 },
};

const OrderPopup = ({ order, onClose }: OrderPopupProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Preparing":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Ready":
        return "bg-green-100 text-green-700 border-green-200";
      case "Picked Up":
        return "bg-gray-100 text-gray-600 border-gray-200";
      case "Canceled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
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
                Order #{order.id.slice(0, 8)}
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
                    Order Date
                  </p>
                  <p className="mt-1 text-lg font-bold text-black">
                    {order.date}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-wider text-black/50 uppercase">
                    Pickup Time
                  </p>
                  <p className="mt-1 text-lg font-bold text-black">
                    {order.pickupTime || "ASAP"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-wider text-black/50 uppercase">
                    Customer Info
                  </p>
                  <p className="mt-1 text-lg font-bold text-black">
                    {order.customerName || "N/A"}
                  </p>
                  <p className="text-md text-black">{order.phone || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm font-bold tracking-wider text-black/50 uppercase">
                    Status
                  </p>
                  <div className="mt-2 inline-block">
                    <div
                      className={`flex w-max items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold tracking-wider uppercase ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {session?.user.isAdmin ? (
                        <select
                          defaultValue={order.status}
                          onChange={handleStatusChange}
                          className="cursor-pointer bg-transparent font-bold uppercase outline-none"
                        >
                          <option value="Preparing" className="text-black">
                            Preparing
                          </option>
                          <option value="Ready" className="text-black">
                            Ready
                          </option>
                          <option value="Picked Up" className="text-black">
                            Picked Up
                          </option>
                          <option value="Canceled" className="text-black">
                            Canceled
                          </option>
                        </select>
                      ) : (
                        <p>{order.status}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-6 md:w-2/3 md:p-8">
                <p className="font-bakery-noto mb-6 text-xl font-bold text-black">
                  Order Items
                </p>
                <div className="flex flex-col gap-4">
                  {order.items?.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
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

                <div className="mt-auto pt-8">
                  <p className="font-bakery-noto mb-4 text-xl font-bold text-black">
                    Payment Summary
                  </p>
                  <div className="text-md flex flex-col gap-2 text-black">
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
                      <p>Processing Fee</p>
                      <p>${Number(order.fee || 0).toFixed(2)}</p>
                    </div>

                    <div className="bg-bakery-gray my-2 h-px w-full" />

                    <div className="flex justify-between text-2xl font-bold">
                      <p>Total</p>
                      <p>${Number(order.total).toFixed(2)}</p>
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
