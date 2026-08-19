import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();
    const { searchParams } = new URL(req.url);
    const emailParam = searchParams.get("email");

    const email = session?.user?.email || emailParam;

    if (!email) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated" }),
        { status: 401 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          firstName: "",
          lastName: "",
          phone: "",
          email: email,
          isAdmin: false,
        }),
        { status: 200 },
      );
    }

    let firstName = user.firstName || "";
    let lastName = user.lastName || "";
    let phone = user.phone || "";

    if (!firstName && !lastName && user.name) {
      const parts = user.name.split(" ");
      firstName = parts[0] || "";
      lastName = parts.slice(1).join(" ") || "";
    }

    if (!phone || !firstName || !lastName) {
      const latestOrder = await prisma.order.findFirst({
        where: { userEmail: { equals: email, mode: "insensitive" } },
        orderBy: { createAt: "desc" },
      });

      if (latestOrder) {
        if (!firstName && latestOrder.firstName)
          firstName = latestOrder.firstName;
        if (!lastName && latestOrder.lastName) lastName = latestOrder.lastName;
        if (!phone && latestOrder.phone) phone = latestOrder.phone;
      }
    }

    return new NextResponse(
      JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        firstName,
        lastName,
        phone,
        isAdmin: user.isAdmin,
      }),
      { status: 200 },
    );
  } catch (err: unknown) {
    console.error("Failed to fetch profile:", err);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      { status: 500 },
    );
  }
};

export const PUT = async (req: NextRequest) => {
  try {
    const session = await getAuthSession();
    const body = await req.json();
    const { firstName, lastName, phone, email } = body;

    const targetEmail = session?.user?.email || email;

    if (!targetEmail) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated: No user email found" }),
        { status: 401 },
      );
    }

    const fullName = `${firstName || ""} ${lastName || ""}`.trim();

    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: targetEmail,
          mode: "insensitive",
        },
      },
    });

    let updatedUser;

    if (existingUser) {
      updatedUser = await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          firstName: firstName || null,
          lastName: lastName || null,
          phone: phone || null,
          name: fullName || existingUser.name,
        },
      });
    } else {
      updatedUser = await prisma.user.create({
        data: {
          email: targetEmail,
          firstName: firstName || null,
          lastName: lastName || null,
          phone: phone || null,
          name: fullName || null,
        },
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Profile updated successfully",
        user: {
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          phone: updatedUser.phone,
          name: updatedUser.name,
          email: updatedUser.email,
        },
      }),
      { status: 200 },
    );
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Internal Server Error";
    console.error("Failed to update profile:", err);
    return new NextResponse(JSON.stringify({ message: errorMessage }), {
      status: 500,
    });
  }
};
