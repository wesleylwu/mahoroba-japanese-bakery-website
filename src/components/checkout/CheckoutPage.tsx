"use client";

import { useState, useEffect } from "react";
import Contact from "@/src/components/checkout/Contact";
import Pickup from "@/src/components/checkout/PickUp";
import Items from "@/src/components/checkout/Items";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useCartsStore } from "@/utils/store";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { isValidPhoneNumber } from "@/utils/phone";

const CheckoutPage = () => {
  const [tipAmount, setTipAmount] = useState(0);
  const { totalPrice, clearCart } = useCartsStore();
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
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
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const profile = await res.json();
          setContact((prev) => ({
            firstName: prev.firstName || profile.firstName || "",
            lastName: prev.lastName || profile.lastName || "",
            phone: prev.phone || profile.phone || "",
            email: prev.email || profile.email || "",
          }));
        }
      } catch (err) {
        console.error("Failed to load user profile for checkout:", err);
      }
    };

    fetchProfile();
  }, []);

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

    if (contact.phone && !isValidPhoneNumber(contact.phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const calculatedTax = totalPrice * 0.0825;
    const calculatedFee = totalPrice * 0.035;
    const finalPrice = totalPrice + calculatedTax + calculatedFee + tipAmount;

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
          tax: String(calculatedTax),
          fee: String(calculatedFee),
          subtotal: String(totalPrice),
          price: String(finalPrice),
        }),
      });
    } catch (err) {
      console.error(err);
    }

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "Something went wrong!");
      } else {
        setMessage("An unexpected error occurred.");
      }
      setIsLoading(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      try {
        await Promise.all([
          fetch(`/api/confirm/${paymentIntent.id}`, { method: "PUT" }),
          fetch(`/api/orders`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: orderId, status: "Preparing" }),
          }),
        ]);
      } catch (err) {
        console.error("Error updating order status:", err);
      }

      clearCart();
      await queryClient.invalidateQueries({ queryKey: ["orders"] });
      router.refresh();
      router.push("/orders");
      return;
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
