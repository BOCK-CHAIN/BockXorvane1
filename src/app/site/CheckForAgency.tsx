"use client";
import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs";
import { Agency } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  agency: Agency;
}
const CheckForAgency = ({ agency }: Props) => {
    const [ag,setag]=useState(agency)
  const router = useRouter();
  console.log(agency)
  useEffect(() => {
    if (agency.id) {
      router.push(`/agency/${agency.id}`);
    }
  }, [ag, router]);
  return <div></div>;
};
export default CheckForAgency;
