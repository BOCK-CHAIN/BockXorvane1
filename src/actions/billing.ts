"use server";
import { db } from "@/lib/db";

export const savePaymentToDb = async (agencyId: string, paymentId: string) => {
  try {
    const response = await db.subscription.update({
      where: {
        agencyId: agencyId,
      },
      data: {
        transaction: {
          update: {
            paymentId: paymentId,
          },
        },
      },
    });

    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const saveOrder = async (
  agencyId: string,
  orderData: {
    transaction: {
      orderId: string;
      amount: number;
    };
    plan: "NONE" | "MONTHLY" | "YEARLY";
    startDate: Date;
    expiryDate: Date;
  }
) => {
  try {
    const subscription = await db.subscription.findUnique({
      where: {
        agencyId: agencyId,
      },
    });
    if (!subscription) {
      return { error: "Subscription not found." };
    }
    const transaction = await db.transaction.create({
      data: {
        agencyId: agencyId,
        orderId: orderData.transaction.orderId,
        amount: orderData.transaction.amount,
      },
    });
    const response = await db.subscription.update({
      where: {
        agencyId: agencyId,
      },
      data: {
        transactionId: transaction.id,
        plan: orderData.plan,
        currentPeriodStartDate: orderData.startDate,
        currentPeriodEndDate: orderData.expiryDate,
      },
    });

    return { response };
  } catch (error) {
    console.error(error);
    return { error };
  }
};

export const getSubscription = async (agencyId: string) => {
  try {
    const subscription = await db.subscription.findUnique({
      where: {
        agencyId: agencyId,
      },
    });
    return { subscription };
  } catch (error) {
    console.error(error);
    return { error };
  }
};
