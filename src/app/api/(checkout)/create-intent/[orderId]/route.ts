export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ orderId: string }> },
) {
  const { orderId } = await params;

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

  if (!process.env.STRIPE_SECRET_KEY) {
    return new NextResponse(
      JSON.stringify({ message: "Stripe secret key is missing" }),
      { status: 500 },
    );
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (order) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(order.price) * 100),
      currency: "usd",
      payment_method_types: ["card"],
    });

    await prisma.order.update({
      where: { id: orderId },
      data: { intent_id: paymentIntent.id },
    });

    return new NextResponse(
      JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      { status: 200 },
    );
  }

  return new NextResponse(JSON.stringify({ message: "Order not found!" }), {
    status: 404,
  });
}
