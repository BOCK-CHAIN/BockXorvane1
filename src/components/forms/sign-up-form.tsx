"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { signUpSchema } from "@/types/signUpSchema"
import { addUser, signInUser } from "@/actions/user"
import { Button } from "@/components/ui/button"
import XorvaneLogo from "@/components/global/XorvaneLogo"
import Loader from "@/components/ui/loader"
import { Link } from "lucide-react"

export function SignUp() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
      setLoading(true)
      const { email, password, name } = await signUpSchema.parseAsync(data)
      const res = await addUser(email, password, name)
      if (res.success) {
        await signInUser(email, password)
        toast.success("Account created successfully")
        router.push('/agency')
      } else {
        toast.error(res.message)
      }
    } catch {
      toast.error("Something went wrong. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-background to-background/80 p-4 dotPattern">
      <Card className="w-full max-w-md rounded-2xl border border-border/40 bg-card/80 shadow-xl backdrop-blur-md p-5 md:p-6">
        <CardHeader className="flex flex-col items-center gap-3 p-0">
          <XorvaneLogo />
          <CardTitle className="text-3xl font-bold text-foreground">Sign Up</CardTitle>
          <p className="text-sm text-muted-foreground">Create an account to get started</p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-foreground">Name</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} className="w-full rounded-lg border border-input bg-background p-2 text-sm text-foreground focus:ring-2 focus:ring-primary" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-foreground">Email</FormLabel>
                    <FormControl>
                      <Input disabled={loading} {...field} className="w-full rounded-lg border border-input bg-background p-2 text-sm text-foreground focus:ring-2 focus:ring-primary" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-foreground">Password</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="password" {...field} className="w-full rounded-lg border border-input bg-background p-2 text-sm text-foreground focus:ring-2 focus:ring-primary" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-foreground">Confirm Password</FormLabel>
                    <FormControl>
                      <Input disabled={loading} type="password" {...field} className="w-full rounded-lg border border-input bg-background p-2 text-sm text-foreground focus:ring-2 focus:ring-primary" />
                    </FormControl>
                    <FormMessage className="text-xs text-red-400" />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full rounded-lg bg-primary p-2 text-sm font-semibold text-primary-foreground transition duration-300 ease-in-out hover:bg-primary/90">
                {loading ? <Loader state className="mr-2 h-4 w-4 animate-spin" /> : "Sign Up"}
              </Button>
            </form>
          </Form>
          <div className="text-center mt-4">
            <Button
              type="button"
              onClick={() => router.replace("/auth/sign-in")}
              className="text-sm text-primary hover:text-primary/80"
              variant="link"
            >
              Already have an account? Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
