"use client"

import { signIn } from "next-auth/react"
import { motion } from "framer-motion"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <motion.div
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-[90%] max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
      >
        <h2 className="text-2xl font-semibold text-center text-foreground">Sign In or Sign Up</h2>
        <p className="text-center text-muted-foreground mt-2">Please sign in to continue</p>

        <button
          onClick={() => signIn()}
          className="w-full mt-6 py-2 px-4 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-all"
        >
          Continue with Email
        </button>

        <button
          onClick={onClose}
          className="w-full mt-4 py-2 px-4 border border-muted-foreground text-foreground font-medium rounded-lg hover:bg-muted transition-all"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  )
}
