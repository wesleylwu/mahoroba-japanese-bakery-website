import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const orders = await prisma.order.findMany({
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
        userEmail,
      },
    });

    return new NextResponse(JSON.stringify(newOrder), { status: 201 });
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
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
      tip,
      tax,
      fee,
      subtotal,
    } = body;

    const dataToUpdate: Prisma.OrderUpdateInput = {};

    if (status) dataToUpdate.status = status;
    if (pickupTime) dataToUpdate.pickupTime = pickupTime;
    if (firstName) dataToUpdate.firstName = firstName;
    if (lastName) dataToUpdate.lastName = lastName;
    if (phone) dataToUpdate.phone = phone;
    if (tip) dataToUpdate.tip = new Prisma.Decimal(tip);
    if (tax) dataToUpdate.tax = new Prisma.Decimal(tax);
    if (fee) dataToUpdate.fee = new Prisma.Decimal(fee);
    if (subtotal) dataToUpdate.subtotal = new Prisma.Decimal(subtotal);

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
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 },
    );
  }
};
