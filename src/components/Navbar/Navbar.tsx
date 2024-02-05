import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Input } from "@/components/ui/input"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

export function NavigationMenuDemo() {
  return (
    <div className="bg-black">
    <div className="flex">
      <div className="ml-[10px] mr-auto">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={80}
          height={80}
          objectFit="contain"
        />
      </div>
      <div className="m-auto">
     <div className="flex ">
        <div className="flex m-auto bg-black">
          <Image
            src="/loupe.svg" 
            alt="loupe"
            width={30} 
            height={30} 
            objectFit="contain"
          />
        </div>

        <Input className="text-white" type="search" placeholder="Type here..."/>
        </div>
        <div className="text-white flex justify-center text-xl space-x-8"> 
          <NavigationMenu> 
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/rate" passHref>
                  <NavigationMenuLink className="hover:bg-gray-800 px-4">Rate</NavigationMenuLink> 
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/vote" passHref>
                  <NavigationMenuLink className="hover:bg-gray-800 px-4">Vote</NavigationMenuLink> 
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/event" passHref>
                  <NavigationMenuLink className="hover:bg-gray-800 px-4">Event</NavigationMenuLink> 
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="ml-auto mr-[30px] my-auto">
      <Link href="/archives" passHref>
        <Image
          src="/archives.svg"
          alt="archives"
          width={40}
          height={40}
          objectFit="contain"
        />
         </Link>
      </div>
    </div>
    </div>
  )
}
