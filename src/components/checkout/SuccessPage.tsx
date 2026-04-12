"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const payment_intent = searchParams.get("payment_intent");
  const router = useRouter();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        await fetch(`http://localhost:3000/api/confirm/${payment_intent}`, {
          method: "PUT",
        });
        router.push("/orders");
      } catch (err) {
        console.log(err);
      }
    };

    if (payment_intent) {
      makeRequest();
    }
  }, [payment_intent, router]);

  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center text-center text-2xl text-green-700 md:min-h-[calc(100vh-15rem)]">
      Payment successful. You are being redirected to the orders page. Please do
      not close the page.
    </div>
  );
};

export default SuccessPage;
