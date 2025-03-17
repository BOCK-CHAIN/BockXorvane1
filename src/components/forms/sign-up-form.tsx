'use client'
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { signUpSchema } from "@/types/signUpSchema";
import { addUser, signInUser } from "@/actions/user";
import { Button } from "../ui/button";

export default function SignUpForm({
    setIsOpened,
}: {
    setIsOpened?: (isOpened: boolean) => void;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        try {
            setLoading(true);
            const { email, password, name } = await signUpSchema.parseAsync(data);
            const res = await addUser(email, password, name)
            console.log(res)
            if (res.success) {
                console.log("success")
                const result = await signInUser(email, password);
                console.log(result)
                if (!result) {
                    router.replace("/agency");
                    toast.success("Account created successfully");
                    setLoading(false);
                    return;
                }
                if (!result!.success) {
                    toast.error("something went wrong. Please SignIn");
                }
            } else {
                toast.error(res.message);
            }
        } catch (err) {
            toast.error("Something went wrong. Please try again.");
        }
        setLoading(false);
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-4">
            <Card className="w-full max-w-md rounded-2xl border border-gray-700 bg-neutral-800 bg-opacity-50 shadow-xl backdrop-blur-md p-4 pt-0">
                <CardHeader className="flex flex-col items-center gap-3">
                    <Image
                        onClick={() => router.push("/")}
                        src="/logo.svg"
                        alt="Logo"
                        width="120"
                        height="120"
                        className="cursor-pointer"
                    />
                    <CardTitle className="text-4xl font-bold text-white">
                        Sign Up
                    </CardTitle>
                    <p className="text-lg text-gray-200">
                        Create an account to get started
                    </p>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg text-gray-100">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                className="w-full rounded-lg border border-gray-600 bg-neutral-700 p-3 text-lg text-white focus:ring-2 focus:ring-indigo-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-base text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg text-gray-100">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                className="w-full rounded-lg border border-gray-600 bg-neutral-700 p-3 text-lg text-white focus:ring-2 focus:ring-indigo-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-base text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg text-gray-100">
                                            Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                type="password"
                                                className="w-full rounded-lg border border-gray-600 bg-neutral-700 p-3 text-lg text-white focus:ring-2 focus:ring-indigo-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-base text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-lg text-gray-100">
                                            Confirm Password
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={loading}
                                                type="password"
                                                className="w-full rounded-lg border border-gray-600 bg-neutral-700 p-3 text-lg text-white focus:ring-2 focus:ring-indigo-500"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-base text-red-400" />
                                    </FormItem>
                                )}
                            />
                            <div className="text-center">
                                <Button
                                    disabled={loading}
                                    type="button"
                                    onClick={() => {
                                        if (setIsOpened) {
                                            setIsOpened(false);
                                            router.replace("/auth/sign-in");
                                        } else {
                                            window.location.replace("/auth/sign-in");
                                        }
                                    }}
                                    className="text-base text-indigo-300 hover:text-indigo-200"
                                    variant="link"
                                >
                                    Already have an account? Sign in
                                </Button>
                            </div>
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full transform rounded-lg bg-indigo-600 p-3 text-xl font-semibold transition duration-300 ease-in-out hover:scale-105 hover:bg-indigo-500"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 />
                                        Signing Up...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
