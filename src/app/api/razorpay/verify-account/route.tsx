import { db } from "@/lib/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const body = await req.json();
  console.log(body.razorpayId, body.razorpaySecret, body.agencyId);
  const { searchParams } = new URL(req.url);
  const account = searchParams.get("account");

  const base64Credentials = Buffer.from(
    `${body.razorpayId}:${body.razorpaySecret}`
  ).toString("base64");

  const response = await fetch("https://api.razorpay.com/v1/payments", {
    method: "GET",
    headers: {
      Authorization: `Basic ${base64Credentials}`,
    },
  });
  if (response.ok) {
    if (account == "agency")
      await db.agency.update({
        where: { id: body.agencyId },
        data: {
          connectAccountId: body.razorpayId,
          connectAccountSecret: body.razorpaySecret,
        },
      });
    else {
      await db.subAccount.update({
        where: { id: body.subId },
        data: {
          connectAccountId: body.razorpayId,
          connectAccountSecret: body.razorpaySecret,
        },
      });
    }
    return NextResponse.json({ message: "Credentials are valid." });
  } else {
    console.log("hello");
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 300 }
    );
  }

  // await db.agency.update({
  //     where: {
  //         id: body.agencyId as string
  //     },
  //     data: {
  //         connectAccountId: body.razorpayId as string
  //     }
  // })
}
