"use client";

import { useState } from "react";
import OrderPopup, {
  Order,
  OrderItem,
} from "@/src/components/orders/OrderPopup";

const MOCK_ORDERS: Order[] = [
  {
    id: "1234",
    date: "Apr 12 - 10:30 AM",
    total: "24.50",
    status: "Preparing",
    items: [
      { id: "i1", title: "Kobe Beef Curry Pan", quantity: 1, price: "6.00" },
      { id: "i2", title: "Sunrise", quantity: 3, price: "3.25" },
      { id: "i3", title: "Strawberry Anko", quantity: 2, price: "4.37" },
    ],
  },
  {
    id: "1233",
    date: "Apr 10 - 08:15 AM",
    total: "12.00",
    status: "Ready",
    items: [
      { id: "i4", title: "Sweet Cream Cheese", quantity: 2, price: "4.50" },
      { id: "i5", title: "Matcha Melon Pan", quantity: 1, price: "3.00" },
    ],
  },
  {
    id: "1228",
    date: "Apr 05 - 02:45 PM",
    total: "35.75",
    status: "Picked Up",
    items: [
      { id: "i6", title: "Tropical Desert", quantity: 4, price: "3.75" },
      { id: "i7", title: "Mentaiko Baguette", quantity: 3, price: "5.25" },
      { id: "i8", title: "Anpan", quantity: 2, price: "2.50" },
    ],
  },
];

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  const formatItemsString = (items: OrderItem[]) => {
    const string = items
      .map((item) => `${item.title} (${item.quantity})`)
      .join(", ");
    return string.length > 40 ? `${string.substring(0, 40)}...` : string;
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
            {MOCK_ORDERS.map((order) => (
              <div
                key={order.id}
                onClick={() => setSelectedOrder(order)}
                className="border-bakery-gray hover:bg-bakery-gray/20 flex cursor-pointer flex-col border-b text-sm text-black transition-colors last:border-b-0 md:grid md:grid-cols-6"
              >
                <div className="px-6 py-4 font-bold">
                  <p>#{order.id}</p>
                </div>
                <div className="px-6 py-4">
                  <p>{order.date}</p>
                </div>
                <div className="truncate px-6 py-4 md:col-span-2">
                  <p>{formatItemsString(order.items)}</p>
                </div>
                <div className="px-6 py-4 font-bold">
                  <p>${order.total}</p>
                </div>
                <div className="px-6 py-4">
                  <div
                    className={`inline-block rounded-full border px-3 py-1 text-xs font-bold tracking-wider uppercase ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    <p>{order.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <OrderPopup
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default OrdersPage;
