"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const prices = [
  {
    id: "1",
    interval: "month",
    currency: "INR",
    unit_amount: 20000,
  },
  {
    id: "2",
    interval: "year",
    currency: "INR",
    unit_amount: 200000,
  },
];

type BillingInterval = "year" | "month";

export default function PricingPlans() {
  const [billingInterval, setBillingInterval] =
    useState<BillingInterval>("month");

  return (
    <>
      <section
        id="pricing"
        className="bg-background snap-center min-h-[90vh] dark:bg-background dark:text-white mx-8 my-8 rounded-3xl"
      >
        <div className="px-4 py-4 mx-auto sm:py-10 sm:px-6 lg:px-8">
          <div className="sm:flex sm:flex-col sm:align-center gap-4">
            <h1 className="text-4xl font-extrabold text-black dark:text-white sm:text-center sm:text-6xl">
              Pricing Plan
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Choose the perfect plan for your needs
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex flex-col w-full md:w-1/2">
              <div className="relative w-full sm:w-fit flex self-center mt-6 bg-zinc-100 dark:bg-black rounded-lg p-0.5 border dark:border-zinc-800">
                <button
                  onClick={() => setBillingInterval("month")}
                  type="button"
                  className={`${billingInterval === "month"
                    ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-black dark:text-zinc-400"
                    } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8`}
                >
                  Monthly billing
                </button>
                <button
                  onClick={() => setBillingInterval("year")}
                  type="button"
                  className={`${billingInterval === "year"
                    ? "relative w-1/2 bg-zinc-700 border-zinc-800 shadow-sm text-white"
                    : "ml-0.5 relative w-1/2 border border-transparent text-black dark:text-zinc-400"
                    } rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8`}
                >
                  Yearly billing
                </button>
              </div>
              <div className="mt-8 space-y-0 sm:mt-10 flex flex-wrap justify-center gap-10 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
                {prices.map((price) => {
                  const amt = price.interval === billingInterval ? price : null;
                  if (!price) return null;
                  const priceString = new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: price.currency!,
                    minimumFractionDigits: 0,
                  }).format((amt?.unit_amount || 0) / 100);
                  return (
                    <div
                      key={price.id}
                      className={cn("flex flex-col sm:flex-row justify-between p-6 rounded-2xl shadow-sm bg-zinc-100 dark:bg-zinc-900 cursor-pointer transition-all duration-200",
                        {
                          "hidden": price.interval !== billingInterval
                        }, "border-2 border-orange dark:border-cyan-400"

                      )}>
                      <div className="flex-grow mb-4 sm:mb-0 flex gap-2 flex-col">
                        <h2 className="text-xl font-semibold text-black dark:text-zinc-300 mb-2">
                          Pro Plan
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-zinc-400 mb-2">
                          Perfect for individuals getting started with SaaS solutions.
                        </p>
                        <p className="text-2xl font-bold text-black dark:text-white">
                          {priceString}
                          <span className="text-base font-medium">
                            /{billingInterval}
                          </span>
                        </p>
                        <div className="flex items-center mt-4">
                          <Button
                            type="button"
                            className="w-full sm:w-auto py-2 px-4 text-sm font-semibold text-center bg-gray-700 dark:bg-white text-white dark:text-black rounded-md hover:bg-gray-900 dark:hover:bg-zinc-300"
                          >
                            Subscribe
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col space-y-4 ">
                <h3 className="text-2xl font-semibold mt-6 sm:mt-8 p-0.5 text-black dark:text-white mb-4">
                  Services Included:
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-black dark:text-zinc-300">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>WebBuild:</strong> Building custom websites tailored to your needs.
                    </div>
                  </li>
                  <li className="flex items-start text-black dark:text-zinc-300">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>AutoWork:</strong> Automating tasks to streamline your workflow.
                    </div>
                  </li>
                  <li className="flex items-start text-black dark:text-zinc-300">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong>Workman:</strong> Providing tools to manage your tasks effectively.
                    </div>
                  </li>
                </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
