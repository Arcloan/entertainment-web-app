"use client";

import { useBookmark } from "@/context/BookmarkContext";
import Image from "next/image";

interface Props {
  item: {
    id: number;
    title: string;
    name: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string;
    backdrop_path: string;
  },
  type: string;
}

export default function RecommendedCard({ item, type }: Props) {
  const { movieIds, tvIds, dispatch } = useBookmark();
  const isBookmarked = (item.media_type == "tv" && tvIds.indexOf(item.id) !== -1) || (item.media_type == "movie" && movieIds.indexOf(item.id) !== -1) || (!item.media_type);

  const toggleBookmark = () => {
    dispatch({ type: isBookmarked ? "REMOVE" : "ADD", payload: {id: item.id, mediaType: type as "tv" | "movie"} });
  };

  if (! item.backdrop_path) {
    return null;
  }

  return (
    <div className="relative group cursor-pointer">
      <Image
        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
        alt={item.title || item.name}
        className={`w-full h-[226px] rounded-lg object-cover`}
        width={280}
        height={226}
      />
      <button
        onClick={toggleBookmark}
        className="group absolute z-10 top-2 right-4 p-2 bg-black/60 rounded-full hover:cursor-pointer hover:bg-white"
      >
        <Image src={`${isBookmarked ? "/icon-bookmark-full.svg" : "icon-bookmark-empty.svg"}`} className="group-hover:filter-black" alt="" width={16} height={16} />
      </button>
      <div className="hidden group-hover:grid absolute w-full h-[226px] rounded-lg top-0 left-0 bg-black/50">
        <button className="absolute place-self-center text-white flex items-center gap-4 py-2 px-4 rounded-full bg-white/30 hover:cursor-pointer"><Image src="/icon-play.svg" alt="" width={28} height={28} /><p>Play</p></button>
      </div>
      <div className="mt-1">
        <p className="text-sm text-grey flex gap-1 items-center">
          {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)} •{" "}
          <Image src={`${item.media_type === "movie" ? "/icon-category-movie.svg" : "/icon-category-tv.svg"}`} className="inline" alt="" width={16} height={16} />
          {item.media_type === "movie" ? " Movie" : " TV Series"}
        </p>
        <p className="text-white font-semibold truncate">
          {item.title || item.name}
        </p>
      </div>
    </div>
  );
}