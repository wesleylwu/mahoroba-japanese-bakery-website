"use client";

import { useState, useEffect } from "react";
import Contact from "@/src/components/checkout/Contact";
import Pickup from "@/src/components/checkout/PickUp";
import Items from "@/src/components/checkout/Items";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartsStore } from "@/utils/store";
import { useParams } from "next/navigation";

const CheckoutPage = () => {
  const [tipAmount, setTipAmount] = useState(0);
  const { totalPrice } = useCartsStore();
  const params = useParams();
  const orderId = (params?.id || params?.orderId) as string;

  const [pickupTime, setPickupTime] = useState("ASAP");
  const [contact, setContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) return;

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements || !orderId) return;

    setIsLoading(true);

    try {
      await fetch("/api/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: orderId,
          pickupTime: pickupTime,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phone,
          tip: String(tipAmount),
          tax: String(totalPrice * 0.0825),
          fee: String(totalPrice * 0.035),
          subtotal: String(totalPrice),
        }),
      });
    } catch (err) {
      console.error(err);
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/success",
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Something went wrong!");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="bg-bakery-cream min-h-screen w-full px-4 py-12 md:px-8 lg:px-12 xl:px-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-12 lg:col-span-7">
            <Contact contact={contact} setContact={setContact} />
            <Pickup
              setTipAmount={setTipAmount}
              subtotal={totalPrice}
              setPickupTime={setPickupTime}
            />
          </div>
          <div className="lg:col-span-5">
            <Items
              tipAmount={tipAmount}
              subtotal={totalPrice}
              isLoading={isLoading}
            />
            {message && (
              <div className="mt-4 text-center text-lg font-bold text-red-500">
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutPage;
