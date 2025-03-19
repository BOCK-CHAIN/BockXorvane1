import { cn } from "@/lib/utils";
import { SubscriptionCard } from "./subscription-card";
import { auth, signIn } from "@/auth";
import { db } from "@/lib/db";

type Props = {
  params: { plan: string };
};

export default async function BillingPage({ params }: Props) {
  const session = await auth();
  const user = session?.user;
  const { plan } = params

  if (!user) {
    signIn();
    return;
  }

  // const agencySubscription = await db.agency.findUnique({
  //   where: {
  //     id: params.agencyId,
  //   },
  //   select: {
  //     Subscription: true,
  //   },
  // });

  const agency = await db.user.findUnique({
    where: {
      id: user.id
    },
    select: {
      Agency: {
        include: {
          Subscription: true
        }
      }
    }
  })

  if (!agency?.Agency) {
    return null;
  }
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className={cn("text-3xl font-bold mb-8")}>Subscription</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-4">Membership</h2>
          <SubscriptionCard plan={plan} agencyEmail={agency.Agency.companyEmail} agencyName={agency.Agency.name} agencyId={agency.Agency.id} subscription={agency.Agency?.Subscription} />
        </section>
      </div>
    </div>
  )
}