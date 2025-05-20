"use client"

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function NavIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    return <Link href={`${href}?${searchParams.get("query") ? "query=" + searchParams.get("query") : ""}`} className={`text-grey hover:text-white ${pathname == href ? "filter-white": ""}`}>{icon}</Link>;
  }