"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { HiOutlineShoppingBag } from "react-icons/hi";
import OrderPopup, {
  Order as OrderType,
  OrderItem,
} from "@/src/components/orders/OrderPopup";
import { useGuestOrderIds } from "@/utils/guestOrders";

interface RawOrder {
  id: string;
  createAt: string;
  price: string;
  products: OrderItem[];
  status: "Preparing" | "Ready" | "Picked Up" | "Canceled";
  intent_id: string | null;
  userEmail?: string | null;
  firstName?: string;
  lastName?: string;
  phone?: string;
  pickupTime?: string;
  subtotal?: string;
  tax?: string;
  tip?: string;
  fee?: string;
}

const OrdersPage = () => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const guestOrderIds = useGuestOrderIds();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders", guestOrderIds, session?.user?.email],
    queryFn: async () => {
      const idsParam =
        guestOrderIds.length > 0 ? `?ids=${guestOrderIds.join(",")}` : "";
      const res = await fetch(`/api/orders${idsParam}`);
      if (!res.ok) {
        return [];
      }
      const dbOrders = (await res.json()) as RawOrder[];
      if (!Array.isArray(dbOrders)) return [];

      return dbOrders.map((order) => {
        const formattedDate = new Date(order.createAt).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          },
        );

        let customerName = "";
        if (order.firstName || order.lastName) {
          customerName =
            `${order.firstName || ""} ${order.lastName || ""}`.trim();
        }

        return {
          id: order.id,
          date: formattedDate.replace(",", " -"),
          total: String(order.price),
          status: order.status,
          items: order.products || [],
          customerName: customerName,
          phone: order.phone,
          pickupTime: order.pickupTime,
          subtotal: order.subtotal,
          tax: order.tax,
          tip: order.tip,
          fee: order.fee,
        };
      });
    },
  });

  const activeOrder =
    data?.find((order) => order.id === selectedOrderId) || null;

  const getStatusColor = (orderStatus: OrderType["status"]) => {
    switch (orderStatus) {
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

  const formatItemsString = (items: OrderItem[]) => {
    if (!items || items.length === 0) return "No items";
    const string = items
      .map((item) => `${item.title} (${item.quantity})`)
      .join(", ");
    return string.length > 40 ? `${string.substring(0, 40)}...` : string;
  };

  const handleStatusChange = async (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: string,
  ) => {
    const newStatus = e.target.value;
    if (!newStatus) return;

    try {
      const res = await fetch(`/api/orders`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: newStatus }),
      });

      if (res.ok) {
        toast.success("Order status updated!");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      } else {
        toast.error("Failed to update status.");
      }
    } catch {
      toast.error("An error occurred while updating.");
    }
  };

  if (isLoading || status === "loading") {
    return (
      <div className="bg-bakery-cream flex min-h-[60vh] w-full items-center justify-center">
        <p className="font-bakery-noto text-lg font-bold text-black/60">
          Loading orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bakery-cream flex min-h-[60vh] w-full items-center justify-center">
        <p className="font-bakery-noto text-bakery-red text-lg font-bold">
          Error loading orders.
        </p>
      </div>
    );
  }

  const isGuest = status === "unauthenticated";

  return (
    <div className="bg-bakery-cream min-h-screen w-full px-4 py-8 md:px-8 md:py-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Guest Notification Banner */}
        {isGuest && (
          <div className="border-bakery-gray/70 mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border-2 bg-white p-4 sm:flex-row sm:items-center">
            <div>
              <p className="font-bakery-noto text-sm font-bold text-black">
                Guest Mode
              </p>
              <p className="text-xs text-black/60">
                Viewing recent orders placed on this device. Sign in to save and
                access your orders anywhere.
              </p>
            </div>
            <button
              onClick={() => signIn("google")}
              className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 shrink-0 cursor-pointer rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-all"
            >
              Sign In
            </button>
          </div>
        )}

        {/* Header bar */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-xs text-black/60 md:text-sm">
            Click any order to view full details and receipt
          </p>
          <span className="bg-bakery-burgundy/10 text-bakery-burgundy rounded-full px-3.5 py-1 text-xs font-bold">
            {data?.length || 0} {data?.length === 1 ? "Order" : "Orders"}
          </span>
        </div>

        {/* Orders Table */}
        <div className="border-bakery-gray overflow-hidden rounded-2xl border-2 bg-white shadow-md">
          <div className="border-bakery-gray bg-bakery-cream/70 hidden border-b text-xs font-bold tracking-wider text-black/70 uppercase md:grid md:grid-cols-6">
            <div className="px-6 py-3.5">
              <p>Order ID</p>
            </div>
            <div className="px-6 py-3.5">
              <p>Date</p>
            </div>
            <div className="col-span-2 px-6 py-3.5">
              <p>Items</p>
            </div>
            <div className="px-6 py-3.5">
              <p>Total</p>
            </div>
            <div className="px-6 py-3.5">
              <p>Status</p>
            </div>
          </div>

          <div className="flex flex-col">
            {data?.map((item: OrderType) => (
              <div
                key={item.id}
                onClick={() => setSelectedOrderId(item.id)}
                className="border-bakery-gray/80 hover:bg-bakery-cream/50 flex cursor-pointer flex-col border-b text-sm text-black transition-colors last:border-b-0 md:grid md:grid-cols-6"
              >
                <div className="px-6 py-4 font-bold text-black">
                  <p>#{item.id.slice(0, 8)}</p>
                </div>
                <div className="px-6 py-4 text-black/70">
                  <p>{item.date}</p>
                </div>
                <div className="truncate px-6 py-4 md:col-span-2">
                  <p className="text-black/80">
                    {formatItemsString(item.items)}
                  </p>
                </div>
                <div className="text-bakery-burgundy px-6 py-4 font-bold">
                  <p>${Number(item.total).toFixed(2)}</p>
                </div>
                <div className="px-6 py-4">
                  <div
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${getStatusColor(
                      item.status,
                    )}`}
                  >
                    {session?.user.isAdmin ? (
                      <select
                        value={item.status}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => handleStatusChange(e, item.id)}
                        className="cursor-pointer bg-transparent font-bold uppercase outline-none"
                      >
                        <option value="Preparing">Preparing</option>
                        <option value="Ready">Ready</option>
                        <option value="Picked Up">Picked Up</option>
                        <option value="Canceled">Canceled</option>
                      </select>
                    ) : (
                      <p>{item.status}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {(!data || data.length === 0) && (
              <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
                <div className="bg-bakery-cream text-bakery-burgundy mb-4 flex h-14 w-14 items-center justify-center rounded-full">
                  <HiOutlineShoppingBag size={28} />
                </div>
                <p className="font-bakery-noto text-base font-bold text-black md:text-lg">
                  No orders found
                </p>
                <p className="mt-1 max-w-sm text-xs text-black/60 md:text-sm">
                  {isGuest
                    ? "You have not placed any orders on this device yet."
                    : "You have not placed any orders yet."}
                </p>
                <Link
                  href="/menu"
                  className="bg-bakery-burgundy hover:bg-bakery-burgundy/90 mt-6 inline-flex items-center rounded-full px-6 py-2.5 text-sm font-bold text-white transition-colors"
                >
                  Browse Menu
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <OrderPopup
        order={activeOrder}
        onClose={() => setSelectedOrderId(null)}
      />
    </div>
  );
};

export default OrdersPage;
