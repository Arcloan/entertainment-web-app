import Image from "next/image";
import NavIcon from "./NavIcon";
import { Suspense } from "react";

export default function Topbar({ className }: { className?: string }) {
  return (
    <header className={`bg-midnightBlue flex items-center justify-between px-4 py-3 ${className}`}>
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <div className="flex items-center gap-8">
        <Suspense><NavIcon href="/" icon={<Image src={"/icon-nav-home.svg"} className="hover:filter-red hover:cursor-pointer" alt="" width={24} height={24}/>} /></Suspense>
        <Suspense><NavIcon href="/movies" icon={<Image src={"/icon-nav-movies.svg"} className="hover:filter-red hover:cursor-pointer" alt="" width={24} height={24}/>} /></Suspense>
        <Suspense><NavIcon href="/tv" icon={<Image src={"/icon-nav-tv-series.svg"} className="hover:filter-red hover:cursor-pointer" alt="" width={24} height={24}/>} /></Suspense>
        <Suspense><NavIcon href="/bookmarked" icon={<Image src={"/icon-nav-bookmark.svg"} className="hover:filter-red hover:cursor-pointer" alt="" width={24} height={24}/>} /></Suspense>
      </div>
      <Image
        src="/image-avatar.png"
        alt="User Avatar"
        width={32}
        height={32}
        className="rounded-full border-2 border-white"
      />
    </header>
  );
}
