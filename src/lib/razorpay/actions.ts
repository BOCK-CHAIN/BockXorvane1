import { db } from "../db";
import Razorpay from "razorpay";
import { razorpay } from ".";
import { RazorpayVerifySubscription } from "razorpay/dist/utils/razorpay-utils";

export const subscriptionCreated = async (
  subscription: {
    active: string;
    current_period_end: number;
    plan: { id: any };
    id: any;
  },
  customerId: string
) => {
  try {
    const agency = await db.agency.findFirst({
      where: {
        customerId,
      },
      include: {
        SubAccount: true,
      },
    });
    if (!agency) {
      throw new Error("Could not find and agency to upsert the subscription");
    }

    const data = {
      active: subscription.active === "active",
      agencyId: agency.id,
      customerId,
      currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
      //@ts-ignore
      priceId: subscription.plan.id,
      subscritiptionId: subscription.id,
      //@ts-ignore
      plan: subscription.plan.id,
    };

    const res = await db.subscription.upsert({
      where: {
        agencyId: agency.id,
      },
      create: data,
      update: data,
    });
    console.log(`🟢 Created Subscription for ${subscription.id}`);
  } catch (error) {
    console.log("🔴 Error from Create action", error);
  }
};

declare global {
  interface Window {
    Razorpay: any;
  }
}

export const loadRazorpay = () =>
  new Promise<typeof window.Razorpay>((resolve, reject) => {
    if (window.Razorpay) {
      resolve(window.Razorpay);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      if (window.Razorpay) {
        resolve(window.Razorpay);
      } else {
        reject("Razorpay failed to load after script execution.");
      }
    };
    script.onerror = () =>
      resolve({
        open: () => {
          console.log("Razorpay failed to load");
        },
      });
    document.body.appendChild(script);
  });
