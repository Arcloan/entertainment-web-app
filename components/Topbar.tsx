import Image from "next/image";
import NavIcon from "./NavIcon";

export default function Topbar({ className }: { className?: string }) {
  return (
    <header className={`bg-midnightBlue flex items-center justify-between px-4 py-3 ${className}`}>
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <div className="flex items-center gap-8">
        <NavIcon href="/" icon={<img src={"/icon-nav-home.svg"} />} />
        <NavIcon href="/movies" icon={<img src={"/icon-nav-movies.svg"}/>} />
        <NavIcon href="/tv" icon={<img src={"/icon-nav-tv-series.svg"} />} />
        <NavIcon href="/bookmarked" icon={<img src={"/icon-nav-bookmark.svg"}/>} />
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
