"use client";

import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CheckoutPage from "@/src/components/checkout/CheckoutPage";
import Header from "@/src/components/Header";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

const PayPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    if (!id) return;

    const makeRequest = async () => {
      try {
        const res = await fetch(`/api/create-intent/${id}`, {
          method: "POST",
        });
        const data = await res.json();
        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error(err);
      }
    };

    makeRequest();
  }, [id]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  return (
    <div className="bg-bakery-cream min-h-screen">
      <Header>
        Checkout
        <br />
        チェックアウト
      </Header>

      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutPage />
        </Elements>
      ) : (
        <div className="flex h-64 items-center justify-center text-xl font-bold">
          Loading secure checkout...
        </div>
      )}
    </div>
  );
};

export default PayPage;
