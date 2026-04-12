"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import OrderPopup, {
  Order as OrderType,
  OrderItem,
} from "@/src/components/orders/OrderPopup";

interface RawOrder {
  id: string;
  createAt: string;
  price: string;
  products: OrderItem[];
  status: "Preparing" | "Ready" | "Picked Up" | "Canceled";
  intent_id: string | null;
  userEmail: string;
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
  const router = useRouter();
  const queryClient = useQueryClient();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("/api/orders");
      const dbOrders = (await res.json()) as RawOrder[];

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

  const getStatusColor = (status: OrderType["status"]) => {
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

  const formatItemsString = (items: OrderItem[]) => {
    if (!items || items.length === 0) return "No items";
    const string = items
      .map((item) => `${item.title} (${item.quantity})`)
      .join(", ");
    return string.length > 40 ? `${string.substring(0, 40)}...` : string;
  };

  if (status === "unauthenticated") {
    return null;
  }

  if (isLoading || status === "loading") {
    return (
      <div className="bg-bakery-cream flex min-h-screen w-full items-center justify-center">
        <p className="font-bakery-noto text-xl font-bold text-black/60">
          Loading orders...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-bakery-cream flex min-h-screen w-full items-center justify-center">
        <p className="font-bakery-noto text-bakery-red text-xl font-bold">
          Error loading orders.
        </p>
      </div>
    );
  }
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
        toast.success("The order status has been changed!");
        queryClient.invalidateQueries({ queryKey: ["orders"] });
      } else {
        toast.error("Failed to update status.");
      }
    } catch (err) {
      toast.error("An error occurred while updating.");
    }
  };

  return (
    <div className="bg-bakery-cream min-h-screen w-full px-4 py-12 md:px-12 lg:px-20 xl:px-24 2xl:px-40">
      <div className="mx-auto max-w-6xl">
        <p className="font-bakery-noto text-bakery-burgundy mb-8 text-3xl font-bold md:text-4xl">
          Order History
        </p>

        <div className="border-bakery-gray flex w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-sm">
          <div className="border-bakery-gray bg-bakery-cream/50 hidden border-b text-sm font-bold text-black uppercase md:grid md:grid-cols-6">
            <div className="px-6 py-4">
              <p>Order ID</p>
            </div>
            <div className="px-6 py-4">
              <p>Date</p>
            </div>
            <div className="col-span-2 px-6 py-4">
              <p>Items</p>
            </div>
            <div className="px-6 py-4">
              <p>Total</p>
            </div>
            <div className="px-6 py-4">
              <p>Status</p>
            </div>
          </div>

          <div className="flex flex-col">
            {data?.map((item: OrderType) => (
              <div
                key={item.id}
                onClick={() => setSelectedOrderId(item.id)}
                className="border-bakery-gray hover:bg-bakery-gray/20 flex cursor-pointer flex-col border-b text-sm text-black transition-colors last:border-b-0 md:grid md:grid-cols-6"
              >
                <div className="px-6 py-4 font-bold">
                  <p>#{item.id.slice(0, 8)}</p>
                </div>
                <div className="px-6 py-4">
                  <p>{item.date}</p>
                </div>
                <div className="truncate px-6 py-4 md:col-span-2">
                  <p>{formatItemsString(item.items)}</p>
                </div>
                <div className="px-6 py-4 font-bold">
                  <p>${Number(item.total).toFixed(2)}</p>
                </div>
                <div className="px-6 py-4">
                  <div
                    className={`flex w-max items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${getStatusColor(
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
                      <p>{item.status}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
