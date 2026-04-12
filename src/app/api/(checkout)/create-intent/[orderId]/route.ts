import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error("MISSING STRIPE_SECRET_KEY IN .ENV FILE");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2026-03-25.dahlia",
});

export const POST = async (
  req: NextRequest,
  context: { params: Promise<{ orderId: string }> },
) => {
  const { orderId } = await context.params;

  try {
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });

    if (order) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(Number(order.price) * 100),
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: { intent_id: paymentIntent.id },
      });

      return new NextResponse(
        JSON.stringify({ clientSecret: paymentIntent.client_secret }),
        { status: 200 },
      );
    } else {
      return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
        status: 404,
      });
    }
  } catch (err) {
    console.log("🔴 STRIPE API CRASHED:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
