"use client"

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function NavIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
    const searchParams = useSearchParams();
    return <Link href={`${href}?${searchParams.get("query") ? "query=" + searchParams.get("query") : ""}`} className="text-grey hover:text-white">{icon}</Link>;
  }