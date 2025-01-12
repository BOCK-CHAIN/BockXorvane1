"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { pricingCards } from "@/lib/constants";
import { useModal } from "@/providers/modal-provider";
import { Plan } from "@prisma/client";
import { StripeElementsOptions } from "@stripe/stripe-js";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@/lib/stripe/stripe-client";
import Loading from "@/components/global/loading";
import SubscriptionForm from ".";
import { loadRazorpay } from "@/lib/razorpay/actions";
import { Toast } from "@/components/ui/toast";
import Razorpay from "razorpay";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  userInfo?: {
    email: string;
    name: string;
  };
  planId?: string;
  agencyId?: string;
  customerId: string;
  planExists: boolean;
};

const SubscriptionFormWrapper = ({
  planId,
  agencyId,
  userInfo,
  customerId,
  planExists,
}: Props) => {
  const { data, setClose } = useModal();
  const [loading, setLoading] = useState(false);
  const [selectedPriceId, setSelectedPriceId] = useState<Plan | "">(
    data?.plans?.defaultPlanId || ""
  );
  const [inititaePayment, setinititaePayment] = useState(false);
  const [subscription, setSubscription] = useState<{
    subscriptionId: string;
    customerId: string;
    subUrl: string;
  }>({ subscriptionId: "", customerId: "", subUrl: "" });

  useEffect(() => {
    if (inititaePayment && subscription.subscriptionId) {
      setLoading(false);
      initiateRazorpayPayment();
    }
  }, [inititaePayment, subscription]);

  const option = useMemo(
    () => ({
      customerId: subscription?.customerId,
      appearance: {
        theme: "flat",
      },
    }),
    [subscription]
  );
  

  useEffect(() => {
    if (!selectedPriceId) return;
    if (inititaePayment && !subscription.subscriptionId) {
      setLoading(true);
      console.log("hello");
      const createSecret = async () => {
        const subscriptionResponse = await fetch(
          "/api/razorpay/create-subscription",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerId,
              planId: selectedPriceId,
            }),
          }
        );
        const subscriptionResponseData = await subscriptionResponse.json();
        setSubscription({
          customerId: subscriptionResponseData.customerId,
          subscriptionId: subscriptionResponseData.subscriptionId,
          subUrl: subscriptionResponseData.subUrl,
        });
      };
      createSecret();
    }
  }, [data, selectedPriceId, customerId, inititaePayment]);


  const initiateRazorpayPayment = async () => {
    try {
      const Razorpay = await loadRazorpay();
      if (!Razorpay) {
        console.log("Razorpay not loaded");
      }
      var options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        name: data.plans?.plans.find((p) => p.id === selectedPriceId)?.item
          ?.name,
        description: data.plans?.plans.find((p) => p.id === selectedPriceId)
          ?.item?.description,
        subscription_id: subscription.subscriptionId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `${process.env.NEXT_PUBLIC_URL}api/razorpay/verify-payment?subscriptionId=${subscription.subscriptionId}&agencyId=${agencyId}&planId=${selectedPriceId}&customerId=${option.customerId}`,
        prefill: {
          name: userInfo?.name || "",
          email: userInfo?.email || "",
          contact: "9999999999",
        },
        customer_notify: 0,
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="border-none transition-all">
        <div className="flex flex-col gap-4">
          {data?.plans?.plans.filter((plan: any) => plan.id !== planId).map((price: any) => (
            <Card
              onClick={() => setSelectedPriceId(price.id as Plan)}
              key={price.id}
              className={clsx("relative cursor-pointer transition-all", {
                "border-primary": selectedPriceId === price.id,
              })}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <div>
                    ₹{price.item.amount ? price.item.amount / 100 : "0"}
                    <p className="text-sm text-muted-foreground">
                      {price.item.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {
                        pricingCards.find((p) => p.plainId === price.id)
                          ?.description
                      }
                    </p>
                  </div>
                  <div></div>
                </CardTitle>
              </CardHeader>
              {/* {selectedPriceId === price.id && (
                <div className="w-2 h-2 bg-emerald-500 rounded-full absolute top-4 right-4" />
              )} */}
            </Card>
          ))}
          {!loading ? (
            selectedPriceId && (
              <>
                <button
                  onClick={() => setinititaePayment(true)}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Pay
                </button>
              </>
            )
          ) : (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          )}
          {/* {!subscription.subscriptionId && selectedPriceId && (
            <div className="flex items-center justify-center w-full h-40">
              <Loading />
            </div>
          )} */}

          {/* {options.customerId && !planExists && (
          <>
            <h1 className="text-xl">Payment Method</h1>
            <Elements
              stripe={getStripe()}
              options={options}
            >
              <SubscriptionForm selectedPriceId={selectedPriceId} />
            </Elements>
          </>
        )}

        {!options.clientSecret && selectedPriceId && (
          <div className="flex items-center justify-center w-full h-40">
            <Loading />
          </div>
        )} */}
        </div>
      </div>
    </>
  );
};

export default SubscriptionFormWrapper;
