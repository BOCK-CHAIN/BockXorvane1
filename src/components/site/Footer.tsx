import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { FooterItems, socialMedia } from "@/lib/constant"

export default function Footer() {
  return (
    <footer id="footer" className="w-full bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 w-full lg:px-8">
        <div className="flex w-full flex-col md:flex-row justify-between py-12 border-b transition-colors duration-150 border-border">
          <div className="flex flex-col items-center sm:items-start mb-8 md:mb-0 w-1/2 md:w-1/5">
            <Link href="/" className="flex items-center font-bold">
              <span className="border rounded-full border-border px-4 py-2">
                <Image src="/Xorvane-svg.svg" width={100} height={50} alt="BockLogo" className="h-7 w-24" />
              </span>
            </Link>
          </div>
          <div className="flex flex-wrap justify-between w-full md:pl-0 pl-8">
            {FooterItems.map((item, index) => (
              <div key={index} className="w-1/2 sm:w-auto mb-8 md:mb-0 md:ml-8">
                <p className="font-bold text-foreground mb-4">{item.title}</p>
                <ul className="space-y-2">
                  {item.items.map((name, ind) => (
                    <li key={ind}>
                      <Link
                        href={name.href || "/"}
                        target={item.title === "Legal" ? "_self" : "_blank"}
                        rel={item.title === "Legal" ? undefined : "noopener noreferrer"}
                        className="text-muted-foreground hover:text-primary transition duration-150 ease-in-out"
                      >
                        {name.comp}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="w-full sm:w-auto mb-8 md:mb-0 md:ml-8">
              <p className="font-bold text-foreground mb-4">Follow Us</p>
              <div className="flex space-x-4">
                {socialMedia.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground hover:text-background transition duration-300 ease-in-out transform hover:scale-110",
                      `${item.color}`,
                    )}
                  >
                    {item.icon}
                    <span className="sr-only">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-8 space-y-4">
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} BOCK. All rights reserved.
          </span>
          <span className="text-muted-foreground text-sm">Octakaigon Bock Private Limited</span>
        </div>
      </div>
    </footer>
  )
}

