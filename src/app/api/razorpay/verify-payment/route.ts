import PricingCard from "@/app/(main)/agency/[agencyId]/billing/_components/pricing-card";
import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { Plan } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // const body = await req.body(); // Parse the request body
    const searchParams = new URL(req.url).searchParams;
    const subscriptionId = searchParams.get("subscriptionId");
    const planId = searchParams.get("planId");
    const customerId = searchParams.get("customerId");
    const agencyId = searchParams.get("agencyId");
    let body = await req.formData();
    const parsedBody = Object.fromEntries(body.entries());

    if (!subscriptionId || !agencyId || !planId) {
      return NextResponse.error();
    }

    let validated = validatePaymentVerification(
      {
        subscription_id: parsedBody.razorpay_subscription_id as string,
        payment_id: parsedBody.razorpay_payment_id as string,
      },
      parsedBody.razorpay_signature as string,
      process.env.RAZORPAY_KEY_SECRET as string
    );

    if (validated) {
      const subscription = await razorpay.subscriptions.fetch(
        subscriptionId as string
      );
      await db.subscription.upsert({
        where: { agencyId: agencyId as string },
        update: {
          subscritiptionId: subscriptionId,
          plan: planId as Plan,
          active: true,
          customerId: customerId as string,
          currentPeriodEndDate: new Date(
            (subscription.current_end ?? 0) * 1000
          ),
        },
        create: {
          subscritiptionId: subscriptionId,
          plan: planId as Plan,
          active: true,
          customerId: customerId as string,
          currentPeriodEndDate: new Date(
            (subscription.current_end ?? 0) * 1000
          ),
          agencyId: agencyId as string,
        },
      });
      console.log(process.env.NEXT_PUBLIC_URL)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_URL}agency/${agencyId}/billing`,
        {
          status: 302,
          headers: {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_URL || "",
          },
        }
      );
    } else {
      return NextResponse.error();
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
