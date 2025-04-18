import { auth } from '@/auth'
import BlurPage from '@/components/global/blur-page'
import InfoBar from '@/components/global/infobar'
import Sidebar from '@/components/sidebar'
import Unauthorized from '@/components/unauthorized'
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/queries'
import { redirect, usePathname, useRouter } from 'next/navigation'
import React from 'react'

type Props = {
  children: React.ReactNode
  params: { agencyId: string }
}

const layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation()
  const session = await auth();
  const user = session?.user

  if (!user) {
    return redirect('/')
  }

  if (!agencyId) {
    return redirect('/agency')
  }

  if (
    user.role !== 'AGENCY_OWNER' &&
    user.role !== 'AGENCY_ADMIN'
  )
    return <Unauthorized />
  let allNoti: any = []
  const notifications = await getNotificationAndUser(agencyId)
  if (notifications) allNoti = notifications

  return (
    <div className="h-screen overflow-hidden no-scrollbar">
      <Sidebar
        id={params.agencyId}
        type="agency"
      />
      <div className="md:pl-[300px] ">
        <InfoBar
          notifications={allNoti}
          role={allNoti.User?.role}
          agencyId={agencyId}
        />
        <div className="relative">
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  )
}

export default layout
