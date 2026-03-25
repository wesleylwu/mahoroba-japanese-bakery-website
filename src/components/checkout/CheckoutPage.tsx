"use client";

import { useState } from "react";
import Contact from "@/src/components/checkout/Contact";
import Pickup from "@/src/components/checkout/PickUp";
import Items from "@/src/components/checkout/Items";

const CheckoutPage = () => {
  const [tipAmount, setTipAmount] = useState(0);
  const [subtotal, setSubtotal] = useState(42.5);

  return (
    <div className="bg-bakery-cream min-h-screen w-full px-4 py-12 md:px-8 lg:px-12 xl:px-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-12 lg:col-span-7">
            <Contact />
            <Pickup setTipAmount={setTipAmount} subtotal={subtotal} />
          </div>
          <div className="lg:col-span-5">
            <Items tipAmount={tipAmount} subtotal={subtotal} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
