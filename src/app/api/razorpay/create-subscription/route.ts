import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { customerId, planId } = await req.json();

  if (!planId)
    return new NextResponse(" price id is missing", {
      status: 400,
    });
  // const subscriptionExists = await db.agency.findFirst({
  //   where: { customerId },
  //   include: { Subscription: true },
  // });

  try {
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      total_count: 1,
      customer_notify: 0,
    });
    return NextResponse.json({
      subscriptionId: subscription.id,
      customerId: subscription.customer_id,
      subUrl: subscription.short_url,
    });
  } catch (error) {
    console.log("🔴 Error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
