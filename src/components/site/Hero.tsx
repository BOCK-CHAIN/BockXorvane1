"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative bg-gradient-to-br flex items-center from-background to-background/90 text-foreground w-full min-h-[85vh] md:min-h-[90vh] dotPattern"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-primary/90 via-primary to-primary/80 bg-clip-text text-transparent leading-tight"
          >
            Build & Manage Websites Effortlessly with WebBuild
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 text-base sm:text-lg md:text-xl font-medium text-muted-foreground max-w-3xl"
          >
            WebBuild is your all-in-one platform to create funnels, manage subaccounts, invite team members, and launch
            stunning websites—without the hassle. Take control and scale your digital presence effortlessly.
          </motion.p>
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 sm:py-6 text-base sm:text-lg w-[90%] sm:w-auto"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 px-6 py-3 sm:py-6 text-base sm:text-lg w-[90%] sm:w-auto"
            >
              Learn More
            </Button>
          </motion.div> */}
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  )
}
