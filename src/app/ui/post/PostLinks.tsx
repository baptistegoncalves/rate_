"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Rate",
    href: "/post/rate",
  },
  { name: "Vote", href: "/post/vote" },
];

export default function RateLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "bg-[#212126] w-[120px] p-4 rounded-[8px] text-center flex-1 mx-[20px] mt-[60px] border-2 border-transparent hover:border-white p-4",
              {
                "border-white": pathname === link.href,
              }
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
