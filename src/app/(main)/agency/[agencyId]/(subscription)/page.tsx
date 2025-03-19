import CircleProgress from "@/components/global/circle-progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/db";
import { AreaChart } from "@tremor/react";
import {
  ClipboardIcon,
  Contact2,
  DollarSign,
  Goal,
  IndianRupee,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
// import Razorpay from "razorpay";
import React, { useEffect } from "react";

const Page = async ({
  params,
}: {
  params: { agencyId: string };
  searchParams: { code: string };
}) => {

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include:{
      Subscription: true
    }
  });

  if (!agencyDetails) return;

  const subaccounts = await db.subAccount.findMany({
    where: {
      agencyId: params.agencyId,
    },
    select: {
      id: true
    }
  });

  return (
    <div className="relative h-full">
      <h1 className="text-4xl">Dashboard</h1>
      <Separator className=" my-6" />
      <div className="flex flex-col gap-4 pb-6">
        <div className="flex gap-4 flex-col xl:!flex-row">

          <Card className="flex-1 relative">
            <CardHeader>
              <CardDescription>Active Clients</CardDescription>
              <CardTitle className="text-4xl">{subaccounts.length}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              Reflects the number of sub accounts you own and manage.
            </CardContent>
            <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
          <Card className="flex-1 relative">
            <CardHeader>
              <CardTitle>Agency Goal</CardTitle>
              <CardDescription>
                <p className="mt-2">
                  Reflects the number of sub accounts you want to own and
                  manage.
                </p>
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <div className="flex flex-col w-full">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground text-sm">
                    Current: {subaccounts.length}
                  </span>
                  <span className="text-muted-foreground text-sm">
                    Goal: {agencyDetails.goal}
                  </span>
                </div>
                <Progress
                  value={(subaccounts.length / agencyDetails.goal) * 100}
                />
              </div>
            </CardFooter>
            <Goal className="absolute right-4 top-4 text-muted-foreground" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
