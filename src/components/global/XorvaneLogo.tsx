'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'


export default function XorvaneLogo() {
    const router = useRouter();
    return (
        <Image
            src={"/Xorvane-svg.svg"}
            width={100}
            height={140}
            alt="BockLogo"
            className="object-cover object-center py-4 cursor-pointer text-purple-500"
            onClick={() => router.push("/")}
        />
    )
}