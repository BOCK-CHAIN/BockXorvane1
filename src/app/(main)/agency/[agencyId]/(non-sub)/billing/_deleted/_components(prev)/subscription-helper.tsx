// 'use client'
// import SubscriptionFormWrapper from '@/components/forms/subscription-form/subscription-form-wrapper'
// import CustomModal from '@/components/global/custom-modal'

// import { useModal } from '@/providers/modal-provider'
// import { useSearchParams } from 'next/navigation'
// import Razorpay from 'razorpay'
// import { RazorpayPaginationOptions } from 'razorpay/dist/types/api'
// import React, { useEffect } from 'react'

// type Props = {
//   prices: any
//   customerId: string
//   planExists: boolean
// }

// const SubscriptionHelper = ({ customerId, planExists, prices }: Props) => {
//   const { setOpen } = useModal()
//   const searchParams = useSearchParams()
//   const plan = searchParams.get('plan')

//   useEffect(() => {
//     if (plan)
//       setOpen(
//         <CustomModal
//           title="Upgrade Plan!"
//           subheading="Get started today to get access to premium features"
//         >
//           <SubscriptionFormWrapper
//             planExists={planExists}
//             customerId={customerId}
//           />
//         </CustomModal>,
//         async () => ({
//           plans: {
//             defaultPlanId: plan ? plan : '',
//             plans: prices,
//           },
//         })
//       )
//   }, [plan])

//   return <div>SubscriptionHelper</div>
// }

// export default SubscriptionHelper
