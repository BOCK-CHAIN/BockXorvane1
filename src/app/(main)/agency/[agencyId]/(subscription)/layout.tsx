import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { db } from '@/lib/db'
import { ClipboardIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
    children: React.ReactNode
    params: { agencyId: string };

}

export default async function layout({ children, params }: Props) {
    const agencyDetails = await db.agency.findUnique({
        where: {
            id: params.agencyId,
        },
        include: {
            Subscription: true
        }
    });

    if (!agencyDetails) return;
    return (
        <>
            {agencyDetails.Subscription?.plan !== "NONE" && <div className="absolute h-[125%] -top-10 -left-10 right-0 bottom-0 z-30 flex items-center justify-center backdrop-blur-md bg-background/50">
                <Card>
                    <CardHeader>
                        <CardTitle>Please Subscribe</CardTitle>
                        <CardDescription>
                            You need to subscription to a plan to access the features of this agency.
                        </CardDescription>
                        <Link
                            href={`/agency/${agencyDetails.id}/billing`}
                            className="p-2 w-fit bg-secondary text-white rounded-md flex items-center gap-2"
                        >
                            <ClipboardIcon />
                            Billing
                        </Link>
                    </CardHeader>
                </Card>
            </div>}
            {children}
        </>
    )
}