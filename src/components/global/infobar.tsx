'use client'
import { NotificationWithUser } from '@/lib/types'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Bell, Trash2 } from 'lucide-react'
import { Role } from '@prisma/client'
import { Card } from '../ui/card'
import { Switch } from '../ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { ModeToggle } from './mode-toggle'
import UserButton from './user-button'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { deleteAllNotifications, deleteNotification } from '@/actions/user'
import { usePathname } from 'next/navigation'

type Props = {
  notifications: NotificationWithUser | []
  role?: Role
  className?: string
  subAccountId?: string
  agencyId: string
}

const InfoBar = ({ notifications, subAccountId, className, role, agencyId }: Props) => {
  const pathname = usePathname()

  // Hide InfoBar on specific editor page pattern
  const editorRegex = /^\/subaccount\/[^/]+\/funnels\/[^/]+\/editor\/[^/]+$/
  if (editorRegex.test(pathname)) return null

  const [allNotifications, setAllNotifications] = useState(notifications)
  const [showAll, setShowAll] = useState(true)

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications)
    } else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ?? []
        )
      }
    }
    setShowAll((prev) => !prev)
  }

  const handleDeleteNotification = async (id: string) => {
    setAllNotifications((prev) => prev?.filter((n) => n.id !== id))
    await deleteNotification(id)
  }

  const handleClearAll = async () => {
    setAllNotifications([])
    await deleteAllNotifications(agencyId)
  }

  if (!agencyId && !subAccountId) return null

  return (
    <>
      <div
        className={twMerge(
          'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
          className
        )}
      >
        <div className="flex items-center gap-2 ml-auto">
          <UserButton link={agencyId ? agencyId : subAccountId} />

          <Sheet>
            <SheetTrigger>
              <div className="rounded-full w-9 h-9 bg-primary flex items-center justify-center text-white">
                <Bell size={17} />
              </div>
            </SheetTrigger>
            <SheetContent className="mt-4 mr-4 pr-4 overflow-scroll">
              <SheetHeader className="text-left">
                <SheetTitle>Notifications</SheetTitle>
                <SheetDescription>
                  {(role === 'AGENCY_ADMIN' || role === 'AGENCY_OWNER') && (
                    <Card className="flex items-center justify-between p-4">
                      Current Subaccount
                      <Switch onCheckedChange={handleClick} />
                    </Card>
                  )}
                </SheetDescription>
              </SheetHeader>
              {allNotifications?.length && allNotifications.length > 0 && (
                <div className="flex justify-end mb-2">
                  <Button size="sm" variant="destructive" onClick={handleClearAll}>
                    Clear All
                  </Button>
                </div>
              )}
              <div className="flex flex-col gap-y-2">
                {allNotifications?.map((notification) => {
                  const [title, message, extra] = notification.notification.split('|')

                  return (
                    <div key={notification.id} className="flex flex-col gap-y-2">
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarImage
                            src={notification.User.avatarUrl}
                            alt="Profile Picture"
                          />
                          <AvatarFallback className="bg-primary">
                            {notification.User.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="font-bold">{title}</p>
                          <p className="text-muted-foreground text-sm">{message}</p>
                          {extra && <p className="font-bold text-sm">{extra}</p>}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <small className="text-xs text-muted-foreground">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </small>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDeleteNotification(notification.id)}
                        >
                          <Trash2 size={16} className="text-red-500" />
                        </Button>
                      </div>

                      <Separator />
                    </div>
                  )
                })}
                {allNotifications?.length === 0 && (
                  <div className="flex items-center justify-center text-muted-foreground">
                    You have no notifications
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
          {/* <ModeToggle /> */}
        </div>
      </div>
    </>
  )
}

export default InfoBar
