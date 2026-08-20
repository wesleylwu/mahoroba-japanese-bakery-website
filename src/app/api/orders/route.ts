import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/utils/auth";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get("ids");

    const idList = idsParam
      ? idsParam
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : [];

    const baseStatusFilter = {
      status: {
        not: "Not Paid!",
      },
    };

    let whereClause: Prisma.OrderWhereInput = { ...baseStatusFilter };

    if (session?.user?.isAdmin) {
      whereClause = { ...baseStatusFilter };
    } else if (session?.user?.email) {
      const email = session.user.email;
      if (idList.length > 0) {
        whereClause = {
          ...baseStatusFilter,
          OR: [
            { userEmail: { equals: email, mode: "insensitive" } },
            { id: { in: idList } },
          ],
        };
      } else {
        whereClause = {
          ...baseStatusFilter,
          userEmail: { equals: email, mode: "insensitive" },
        };
      }
    } else {
      // Guest user (unauthenticated)
      if (idList.length > 0) {
        whereClause = {
          ...baseStatusFilter,
          id: { in: idList },
        };
      } else {
        // No guest order IDs provided and no session -> return empty list
        return new NextResponse(JSON.stringify([]), { status: 200 });
      }
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      orderBy: { createAt: "desc" },
    });

    const serializedOrders = orders.map((order) => ({
      ...order,
      price: order.price.toString(),
      subtotal: order.subtotal?.toString() || "0",
      tax: order.tax?.toString() || "0",
      tip: order.tip?.toString() || "0",
      fee: order.fee?.toString() || "0",
    }));

    return new NextResponse(JSON.stringify(serializedOrders), { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { price, products, status, userEmail } = body;

    const newOrder = await prisma.order.create({
      data: {
        price: new Prisma.Decimal(price),
        products,
        status,
        userEmail: userEmail || null,
      },
    });

    return new NextResponse(JSON.stringify(newOrder), { status: 201 });
  } catch (err) {
    console.error("Error creating order:", err);
    return new NextResponse(
      JSON.stringify({
        message: err instanceof Error ? err.message : "Something went wrong!",
      }),
      { status: 500 },
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const {
      id,
      status,
      pickupTime,
      firstName,
      lastName,
      phone,
      userEmail,
      tip,
      tax,
      fee,
      subtotal,
      price,
    } = body;

    const dataToUpdate: Prisma.OrderUpdateInput = {};

    if (status) dataToUpdate.status = status;
    if (pickupTime) dataToUpdate.pickupTime = pickupTime;
    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (phone) dataToUpdate.phone = phone;
    if (userEmail) dataToUpdate.userEmail = userEmail;
    if (tip) dataToUpdate.tip = new Prisma.Decimal(tip);
    if (tax) dataToUpdate.tax = new Prisma.Decimal(tax);
    if (fee) dataToUpdate.fee = new Prisma.Decimal(fee);
    if (subtotal) dataToUpdate.subtotal = new Prisma.Decimal(subtotal);
    if (price) dataToUpdate.price = new Prisma.Decimal(price);

    await prisma.order.update({
      where: {
        id: id,
      },
      data: dataToUpdate,
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 },
    );
  } catch (err) {
    console.error("Error updating order:", err);
    return new NextResponse(
      JSON.stringify({
        message: err instanceof Error ? err.message : "Something went wrong!",
      }),
      { status: 500 },
    );
  }
};
