import Image from "next/image";
import clsx from "clsx";
import NavIcon from "./NavIcon";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={clsx("w-[96px] bg-midnightBlue py-6 flex flex-col items-center", className)}>
      <div className="mb-10">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      </div>
      <nav className="flex flex-col mt-8 gap-8 flex-1">
        <NavIcon href="/" icon={<Image src={"/icon-nav-home.svg"} className="hover:cursor-pointer hover:filter-red" alt="" width={24} height={24}/>} />
        <NavIcon href="/movies" icon={<Image src={"/icon-nav-movies.svg"} className="hover:cursor-pointer hover:filter-red" alt="" width={24} height={24}/>} />
        <NavIcon href="/tv" icon={<Image src={"/icon-nav-tv-series.svg"} className="hover:cursor-pointer hover:filter-red" alt="" width={24} height={24}/>} />
        <NavIcon href="/bookmarked" icon={<Image src={"/icon-nav-bookmark.svg"} className="hover:cursor-pointer hover:filter-red" alt="" width={24} height={24}/>} />
      </nav>
      <div className="">
        <Image
          src="/image-avatar.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-white"
        />
      </div>
    </aside>
  );
}
