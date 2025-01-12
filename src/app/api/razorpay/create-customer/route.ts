import { razorpay } from "@/lib/razorpay";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, contact } = await req.json();

  if (!name || !email || !contact  ) {
    return new NextResponse("Missing data", {
      status: 400,
    });
  }

  try {
    const customer = await razorpay.customers.create({
      name,
      email,
      contact,
    })
    return Response.json({ customerId: customer.id });
  } catch (error) {
    console.log("🔴 Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
