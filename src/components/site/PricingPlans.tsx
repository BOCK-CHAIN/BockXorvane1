"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import PricingCard from "./pricing/pricingCard"
import FeaturesList from "./pricing/FeaturesList"
import { useSession } from "next-auth/react"
import { User } from "next-auth"
import AuthModal from "./auth/authModal"
import { useRouter } from "next/navigation"

type BillingInterval = "Monthly" | "Yearly"

const prices = [
  {
    id: "Monthly",
    title: "Pro Plan",
    description: "Perfect for individuals getting started with Web build",
    currency: "USD",
    unit_amount: Number(process.env.NEXT_PUBLIC_MONTHLY_PRICE),
    interval: "Monthly",
    isPopular: false,
  },
  {
    id: "Yearly",
    title: "Pro Plan",
    description: "Perfect for individuals getting started with SaaS solutions.",
    currency: "USD",
    unit_amount: Number(process.env.NEXT_PUBLIC_YEARLY_PRICE),
    interval: "Yearly",
    isPopular: true,
  },
]

const features = [
  {
    title: "WebBuild",
    description: "A complete solution for building and managing websites",
    subFeatures: [
      "Create and manage multiple funnels easily",
      "Invite users and manage access permissions",
      "Support for subaccounts to manage multiple projects",
      "Customizable templates for quick deployment",
      "Seamless integrations with marketing and analytics tools",
    ],
  },
]

export default function PricingPlans() {
  const [billingInterval, setBillingInterval] = useState<BillingInterval>("Monthly")

  const { data: session } = useSession();
  const user = session?.user;
  const [currentUser, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false)
  useEffect(() => {
    if (user)
      setUser(user)
    else
      setUser(null)
  }, [user])

  const router = useRouter()


  const handleSubscribe = () => {
    if (!currentUser) {
      setAuthModalOpen(true) // Show sign-up modal if no user
      return
    }
    router.push(`/agency?plan=${billingInterval}`)

    // Add your subscription logic here
  }



  return (
    <section id="pricing" className="bg-background snap-center min-h-[90vh] mx-8 my-8 rounded-3xl">
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
      <div className="px-4 py-4 mx-auto sm:py-10 sm:px-6 lg:px-8 ">
        <motion.div
          className="sm:flex sm:flex-col sm:align-center gap-4 sm:mb-12 mt-4 sm:mt-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-extrabold text-foreground sm:text-center sm:text-6xl">Pricing Plan</h1>
          <p className="text-sm text-center text-muted-foreground max-w-2xl mx-auto mt-4">
            Choose the perfect plan for your needs
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="flex flex-col w-full lg:w-1/2">
            <motion.div
              className="relative w-full sm:w-fit flex self-center mt-6 bg-muted rounded-lg p-0.5 border border-border"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <button
                onClick={() => setBillingInterval("Monthly")}
                type="button"
                className={cn(
                  "relative w-1/2 rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 transition-all duration-200",
                  billingInterval === "Monthly"
                    ? "bg-primary border-primary shadow-sm text-primary-foreground"
                    : "ml-0.5 border border-transparent text-foreground hover:bg-muted/80",
                )}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setBillingInterval("Yearly")}
                type="button"
                className={cn(
                  "relative w-1/2 rounded-md m-1 py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 transition-all duration-200",
                  billingInterval === "Yearly"
                    ? "bg-primary border-primary shadow-sm text-primary-foreground"
                    : "ml-0.5 border border-transparent text-foreground hover:bg-muted/80",
                )}
              >
                Yearly billing
              </button>
            </motion.div>

            <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-10 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0">
              {prices.map((price) => {
                if (price.interval !== billingInterval) return null

                const priceString = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: price.currency!,
                  minimumFractionDigits: 0,
                }).format((price.unit_amount || 0) )

                return (
                  <PricingCard
                    key={price.id}
                    title={price.title}
                    description={price.description}
                    price={priceString}
                    interval={billingInterval}
                    isPopular={price.isPopular}
                    onSubscribe={handleSubscribe}
                  />
                )
              })}
            </div>
          </div>

          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <FeaturesList features={features} />
          </div>
        </div>
      </div>
    </section>
  )
}

