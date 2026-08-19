import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (
  req: NextRequest,
  context: { params: Promise<{ intentId: string }> },
) => {
  const { intentId } = await context.params;

  try {
    const updated = await prisma.order.updateMany({
      where: {
        OR: [{ intent_id: intentId }, { id: intentId }],
      },
      data: { status: "Preparing" },
    });

    return new NextResponse(
      JSON.stringify({
        message: "Order has been updated",
        count: updated.count,
      }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error confirming order status:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
