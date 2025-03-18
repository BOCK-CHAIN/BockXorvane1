'use client'
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";


type Props = {
    variant: "outline" | "default";
    text: string;
    href: string;
};

export default function NavButton({variant,text,href}: Props) {
    const router = useRouter();
  return (

    <Button className="px-6 py-5 rounded-full " variant={variant} onClick={()=>{
        router.push(href)
    }}>
      {text}
    </Button>
  );
}
