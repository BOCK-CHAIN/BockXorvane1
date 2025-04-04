"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PricingCardProps {
  title: string
  description: string
  price: string 
  interval: "Monthly" | "Yearly"
  isPopular?: boolean
  onSubscribe: () => void
}

export default function PricingCard({
  title,
  description,
  price,
  interval,
  isPopular = false,
  onSubscribe,
}: PricingCardProps) {
  const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""))
  const currency = price.replace(/[0-9.]/g, "")

  const monthlyPrice =
    interval === "Yearly" ? `${currency}${(numericPrice / 12).toFixed(2)}` : price

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "flex flex-col p-6 rounded-2xl shadow-sm bg-card cursor-pointer transition-all duration-200",
        "border-2 relative",
        isPopular ? "border-primary ring-2 ring-primary/20" : "border-border",
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
          Most Popular
        </div>
      )}

      <div className="flex-grow mb-4 flex gap-2 flex-col">
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>

        <p className="text-3xl font-bold text-foreground">
          {monthlyPrice}
          <span className="text-base font-medium text-muted-foreground">/month</span>
        </p>

        {interval === "Yearly" && (
          <p className="text-sm text-muted-foreground">
            Billed yearly at <span className="font-medium">{price}</span>
          </p>
        )}

        <div className="flex items-center mt-6">
          <Button
            type="button"
            onClick={onSubscribe}
            className="w-full py-2.5 px-4 text-sm font-semibold text-center bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-all duration-200"
          >
            Subscribe Now
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
