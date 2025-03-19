// import React from "react";
// import { stripe } from "@/lib/stripe";
// import { addOnProducts, pricingCards } from "@/lib/constants";
// import { db } from "@/lib/db";
// import { Separator } from "@/components/ui/separator";
// import PricingCard from "./_components(prev)/pricing-card";
// // import {
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "@/components/ui/table";
// // import clsx from "clsx";
// import SubscriptionHelper from "./_components(prev)/subscription-helper";
// import { razorpay } from "@/lib/razorpay";
// import { auth } from "@/auth";

// type Props = {
//   params: { agencyId: string };
// };

// const page = async ({ params }: Props) => {
//   const session = await auth();
//   const user = session?.user;
//   const agencySubscription = await db.agency.findUnique({
//     where: {
//       id: params.agencyId,
//     },
//     select: {
//       customerId: true,
//       Subscription: true,
//     },
//   });

//   const prices = (await razorpay.plans.all({ count: 2 })).items;

//   const currentPlanDetails = pricingCards.find(
//     (c) => c.plainId === agencySubscription?.Subscription?.plan
//   );

//   return (
//     <>
//       <SubscriptionHelper
//         prices={prices}
//         customerId={agencySubscription?.customerId || ""}
//         planExists={agencySubscription?.Subscription?.active === true}
//       />
//       <h1 className="text-4xl p-4">Billing</h1>
//       <Separator className=" mb-6" />
//       <h2 className="text-2xl p-4">Current Plan</h2>
//       <div className="flex flex-col lg:!flex-row justify-between gap-8">
//         <PricingCard
//          agencyId={params.agencyId}
//           userInfo={{
//             email: user?.email || "",
//             name: user?.name || "",
//           }}
//           planId={currentPlanDetails?.plainId}
//           planExists={agencySubscription?.Subscription?.active === true}
//           prices={prices}
//           customerId={agencySubscription?.customerId || ""}
//           amt={
//             agencySubscription?.Subscription?.active === true
//               ? currentPlanDetails?.price || "₹0"
//               : "₹0"
//           }
//           buttonCta={
//             agencySubscription?.Subscription?.active === true
//               ? "Change Plan"
//               : "Get Started"
//           }
//           highlightDescription="Want to modify your plan? You can do this here. If you have
//           further question contact support@plura-app.com"
//           highlightTitle="Plan Options"
//           description={
//             agencySubscription?.Subscription?.active === true
//               ? currentPlanDetails?.description || "Lets get started"
//               : "Lets get started! Pick a plan that works best for you."
//           }
//           duration="/ month"
//           features={
//             agencySubscription?.Subscription?.active === true
//               ? currentPlanDetails?.features || []
//               : currentPlanDetails?.features ||
//                 pricingCards.find((pricing) => pricing.title === "Starter")
//                   ?.features ||
//                 []
//           }
//           title={
//             agencySubscription?.Subscription?.active === true
//               ? currentPlanDetails?.title || "Starter"
//               : "Starter"
//           }
//         />
//         {/* {addOns.data.map((addOn) => (
//           <PricingCard
//             planExists={agencySubscription?.Subscription?.active === true}
//             prices={newprices}
//             customerId={agencySubscription?.customerId || ''}
//             key={addOn.id}
//             amt={
//               //@ts-ignore
//               addOn.default_price?.unit_amount
//                 ? //@ts-ignore
//                   `$${addOn.default_price.unit_amount / 100}`
//                 : '$0'
//             }
//             buttonCta="Subscribe"
//             description="Dedicated support line & teams channel for support"
//             duration="/ month"
//             features={[]}
//             title={'24/7 priority support'}
//             highlightTitle="Get support now!"
//             highlightDescription="Get priority support and skip the long long with the click of a button."
//           />
//         ))} */}
//       </div>
//       {/* <h2 className="text-2xl p-4">Payment History</h2>
//       <Table className="bg-card border-[1px] border-border rounded-md">
//         <TableHeader className="rounded-md">
//           <TableRow>
//             <TableHead className="w-[200px]">Description</TableHead>
//             <TableHead className="w-[200px]">Invoice Id</TableHead>
//             <TableHead className="w-[300px]">Date</TableHead>
//             <TableHead className="w-[200px]">Paid</TableHead>
//             <TableHead className="text-right">Amount</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody className="font-medium truncate">
//           {allCharges.map((charge) => (
//             <TableRow key={charge.id}>
//               <TableCell>{charge.description}</TableCell>
//               <TableCell className="text-muted-foreground">
//                 {charge.id}
//               </TableCell>
//               <TableCell>{charge.date}</TableCell>
//               <TableCell>
//                 <p
//                   className={clsx('', {
//                     'text-emerald-500': charge.status.toLowerCase() === 'paid',
//                     'text-orange-600':
//                       charge.status.toLowerCase() === 'pending',
//                     'text-red-600': charge.status.toLowerCase() === 'failed',
//                   })}
//                 >
//                   {charge.status.toUpperCase()}
//                 </p>
//               </TableCell>
//               <TableCell className="text-right">{charge.amount}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table> */}
//     </>
//   );
// };

// export default page;
