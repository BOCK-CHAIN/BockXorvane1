"use client";
import CustomModal from "@/components/global/custom-modal";
import { Button } from "@/components/ui/button";
import { useModal } from "@/providers/modal-provider";
import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  razorpayId: z
    .string()
    .min(2, {
      message: "Invalid razorpay id",
    })
    .regex(/^rzp/, { message: "Invalid razorpay id" }),
  razorpaySecret: z.string({ required_error: "Secret is required" }).min(10, {
    message: "Invalid razorpay secret",
  }),
});

type Props = {
  agencyId: string;
};

const AddRazorPay = (params: Props) => {
  const router = useRouter();
  const { setOpen, setClose, isOpen } = useModal();
  const [loading, setLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      razorpayId: "",
      razorpaySecret: "",
    },
  });

  useEffect(() => {
    form.reset();
    form.clearErrors();
  }, [isOpen]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await fetch("/api/razorpay/verify-account?account=agency", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        razorpayId: data.razorpayId,
        razorpaySecret: data.razorpaySecret,
        agencyId: params.agencyId,
      }),
    });
    const resp = (await response.json()).message;
    if (!response.ok) {
      toast({
        variant: "destructive",
        title: resp,
        description: "Please use a valid razorpay account",
        duration: 2000,
      });
      return;
    }
    toast({
      variant: "success",
      title: resp,
      description: "You have successfully connected your account",
      duration: 2000,
    });
    router.refresh();
    form.reset();
    setClose();
  };

  return (
    <div>
      <Button
        onClick={() => {
          setOpen(
            <CustomModal
              title="Add your Razorpay Account"
              subheading="Connect your razorpay account to accept payments and see your
                dashboard."
            >
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="razorpayId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razorpay Key Id</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your key id" {...field} />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.razorpayId?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="razorpaySecret"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razorpay Secret</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter you secret" {...field} />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.razorpaySecret?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                  <Button disabled={loading} type="submit">
                    Connect
                  </Button>
                </form>
              </Form>
            </CustomModal>
          );
        }}
      >
        Connect
      </Button>
    </div>
  );
};

export default AddRazorPay;
