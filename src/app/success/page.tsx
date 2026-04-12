"use client";

import { Suspense } from "react";
import SuccessPage from "@/src/components/checkout/SuccessPage";
import Header from "@/src/components/Header";

const SuccessLoading = () => (
  <div className="bg-bakery-cream flex min-h-screen items-center justify-center">
    <p className="font-bakery-noto text-xl font-bold text-black/60">
      Loading your order details...
    </p>
  </div>
);

const Success = () => {
  return (
    <div className="bg-bakery-cream min-h-screen">
      <Header>
        Success
        <br />
        成功
      </Header>

      <Suspense fallback={<SuccessLoading />}>
        <SuccessPage />
      </Suspense>
    </div>
  );
};

export default Success;
