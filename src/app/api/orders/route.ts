import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// 1. Fetches all orders for the page
export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createAt: "desc",
      },
    });

    return new NextResponse(JSON.stringify(orders), { status: 200 });
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch orders" }),
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
