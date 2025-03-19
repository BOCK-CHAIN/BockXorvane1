import BlurPage from '@/components/global/blur-page'
import CircleProgress from '@/components/global/circle-progress'
import PipelineValue from '@/components/global/pipeline-value'
import SubaccountFunnelChart from '@/components/global/subaccount-funnel-chart'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/db'
import { AreaChart, BadgeDelta } from '@tremor/react'
import { ClipboardIcon, Contact2, DollarSign, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  params: { subaccountId: string }
  searchParams: {
    code: string
  }
}

const SubaccountPageId = async ({ params, searchParams }: Props) => {

  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
    include:{
      Agency:{
        select:{
          Subscription: true
        }
      }
    }
  })


  if (!subaccountDetails) return

  // if (subaccountDetails.connectAccountId) {
  //   const response = await stripe.accounts.retrieve({
  //     stripeAccount: subaccountDetails.connectAccountId,
  //   })
  //   currency = response.default_currency?.toUpperCase() || 'USD'
  //   const checkoutSessions = await stripe.checkout.sessions.list(
  //     { created: { gte: startDate, lte: endDate }, limit: 100 },
  //     {
  //       stripeAccount: subaccountDetails.connectAccountId,
  //     }
  //   )
  //   sessions = checkoutSessions.data.map((session) => ({
  //     ...session,
  //     created: new Date(session.created).toLocaleDateString(),
  //     amount_total: session.amount_total ? session.amount_total / 100 : 0,
  //   }))

  //   totalClosedSessions = checkoutSessions.data
  //     .filter((session) => session.status === 'complete')
  //     .map((session) => ({
  //       ...session,
  //       created: new Date(session.created).toLocaleDateString(),
  //       amount_total: session.amount_total ? session.amount_total / 100 : 0,
  //     }))

  //   totalPendingSessions = checkoutSessions.data
  //     .filter(
  //       (session) => session.status === 'open' || session.status === 'expired'
  //     )
  //     .map((session) => ({
  //       ...session,
  //       created: new Date(session.created).toLocaleDateString(),
  //       amount_total: session.amount_total ? session.amount_total / 100 : 0,
  //     }))

  //   net = +totalClosedSessions
  //     .reduce((total, session) => total + (session.amount_total || 0), 0)
  //     .toFixed(2)

  //   potentialIncome = +totalPendingSessions
  //     .reduce((total, session) => total + (session.amount_total || 0), 0)
  //     .toFixed(2)

  //   closingRate = +(
  //     (totalClosedSessions.length / checkoutSessions.data.length) *
  //     100
  //   ).toFixed(2)
  // }

  const funnels = await db.funnel.findMany({
    where: {
      subAccountId: params.subaccountId,
    },
    include: {
      FunnelPages: true,
      
    },
  })

  const funnelPerformanceMetrics = funnels.map((funnel) => ({
    ...funnel,
    totalFunnelVisits: funnel.FunnelPages.reduce(
      (total, page) => total + page.visits,
      0
    ),
  }))

  return (
    <BlurPage>
      <div className="relative h-full">
          {subaccountDetails.Agency.Subscription?.plan === "NONE" && <div className="absolute h-[160%] -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
            <Card>
              <CardHeader>
                <CardTitle>Connect Your Stripe</CardTitle>
                <CardDescription>
                  You need to connect your stripe account to see metrics
                </CardDescription>
                <Link
                  href={`/subaccount/${subaccountDetails.id}/launchpad`}
                  className="p-2 w-fit bg-secondary text-white rounded-md flex items-center gap-2"
                >
                  <ClipboardIcon />
                  Launch Pad
                </Link>
              </CardHeader>
            </Card>
          </div>}
        <div className="flex flex-col gap-4 pb-6">
          <div className="flex gap-4 flex-col xl:!flex-row">
            <PipelineValue subaccountId={params.subaccountId} />
          </div>

          <div className="flex gap-4 flex-col xl:!flex-row">
            <Card className="relative">
              <CardHeader>
                <CardDescription>Funnel Performance</CardDescription>
              </CardHeader>
              <CardContent className=" text-sm text-muted-foreground flex flex-col gap-12 justify-between ">
                <SubaccountFunnelChart data={funnelPerformanceMetrics} />
                <div className="lg:w-[150px]">
                  Total page visits across all funnels. Hover over to get more
                  details on funnel page performance.
                </div>
              </CardContent>
              <Contact2 className="absolute right-4 top-4 text-muted-foreground" />
            </Card>
          </div>
          <div className="flex gap-4 xl:!flex-row flex-col">
            <Card className="p-4 flex-1 h-[450px] overflow-scroll relative">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Transition History
                  {/* <BadgeDelta
                    className="rounded-xl bg-transparent"
                    deltaType="moderateIncrease"
                    isIncreasePositive={true}
                    size="xs"
                  >
                    +12.3%
                  </BadgeDelta> */}
                </CardTitle>
                <Table>
                  <TableHeader className="!sticky !top-0">
                    <TableRow>
                      <TableHead className="w-[300px]">Email</TableHead>
                      <TableHead className="w-[200px]">Status</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  
                </Table>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </BlurPage>
  )
}

export default SubaccountPageId
