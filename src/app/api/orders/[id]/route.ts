import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: Promise<{ id: string }> },
) => {
  try {
    const { id } = await context.params;
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
    });

    if (!order) {
      return new NextResponse(JSON.stringify({ message: "Order not found" }), {
        status: 404,
      });
    }

    const serializedOrder = {
      ...order,
      price: order.price.toString(),
      subtotal: order.subtotal?.toString() || "0",
      tax: order.tax?.toString() || "0",
      tip: order.tip?.toString() || "0",
      fee: order.fee?.toString() || "0",
    };

    return new NextResponse(JSON.stringify(serializedOrder), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch order" }),
      { status: 500 },
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return new NextResponse(
        JSON.stringify({ message: "Missing id or status" }),
        { status: 400 },
      );
    }

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: status },
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
