"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [query, setQuery] = useState(searchParams.get("query") || "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        router.push(`${pathname}?query=${encodeURIComponent(query.trim())}`);
      } else {
        router.push(`${pathname}`);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="flex items-center gap-3 mb-6 p-4 md:p-6 lg:p-8">
      <svg className="w-5 h-5 text-grey" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        placeholder="Search for movies or TV series"
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent border-none text-white placeholder-grey outline-none w-full"
      />
    </div>
  );
}