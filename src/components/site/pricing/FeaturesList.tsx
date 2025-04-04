"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Feature {
  title: string
  description: string
  subFeatures?: string[]
}

interface FeaturesListProps {
  features: Feature[]
  className?: string
}

export default function FeaturesList({ features, className }: FeaturesListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
      },
    },
  }

  const subItemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  }

  return (
    <motion.div
      className={cn("space-y-8", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.ul className="space-y-8">
        {features.map((feature, index) => (
          <motion.li key={index} className="group" variants={itemVariants}>
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1.5">
                <motion.div
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10"
                  whileHover={{ scale: 1.1 }}
                >
                  <Check className="h-5 w-5 text-primary" />
                </motion.div>
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  <strong>{feature.title}:</strong> {feature.description}
                </h4>
                {feature.subFeatures && feature.subFeatures.length > 0 && (
                  <motion.ul className="mt-5 ml-2 space-y-4 text-sm" variants={containerVariants}>
                    {feature.subFeatures.map((subFeature, subIndex) => (
                      <motion.li
                        key={subIndex}
                        className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors duration-200 "
                        variants={subItemVariants}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10">
                            <Check className="h-4 w-4 text-primary" />
                          </div>
                        </div>
                        <span className="ml-3 text-muted-foreground">{subFeature}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </div>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}
