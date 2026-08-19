"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCartsStore } from "@/utils/store";
import { useQueryClient } from "@tanstack/react-query";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();
  const { clearCart } = useCartsStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    clearCart();

    const makeRequest = async () => {
      try {
        if (payment_intent) {
          await fetch(`/api/confirm/${payment_intent}`, {
            method: "PUT",
          });
        }
        await queryClient.invalidateQueries({ queryKey: ["orders"] });
        router.refresh();
        setTimeout(() => {
          router.push("/orders");
        }, 1200);
      } catch (err) {
        console.error(err);
        router.push("/orders");
      }
    };

    makeRequest();
  }, [payment_intent, router, clearCart, queryClient]);

  return (
    <div className="font-bakery-noto flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center p-6 text-center">
      <div className="bg-bakery-olive/15 text-bakery-olive mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold">
        ✓
      </div>
      <h2 className="text-bakery-burgundy text-2xl font-bold md:text-3xl">
        Payment Successful!
      </h2>
      <p className="mt-2 text-sm text-black/60 md:text-base">
        Your order has been placed and is being prepared. Redirecting to your
        orders...
      </p>
    </div>
  );
};

export default SuccessPage;
