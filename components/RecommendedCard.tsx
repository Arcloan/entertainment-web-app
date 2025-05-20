"use client";

import { useBookmark } from "@/context/BookmarkContext";

interface Props {
  item: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string;
    backdrop_path: string;
  };
}

export default function RecommendedCard({ item }: Props) {
  const { state, dispatch } = useBookmark();
  const isBookmarked = !!state.bookmarks[item.id];

  const toggleBookmark = () => {
    dispatch({ type: isBookmarked ? "REMOVE" : "ADD", payload: item.id });
  };
  if (! item.backdrop_path) {
    return null;
  }

  return (
    <div className="relative group cursor-pointer">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
        alt={item.title || item.name}
        className={`w-[280px] h-[226px] rounded-lg object-cover`}
      />
      <button
        onClick={toggleBookmark}
        className="group absolute top-2 right-4 p-2 bg-black/60 rounded-full hover:cursor-pointer hover:bg-white"
      >
        <img src={`${isBookmarked ? "/icon-bookmark-full.svg" : "icon-bookmark-empty.svg"}`} className="group-hover:filter-black" alt="" />
      </button>
      <div className="mt-1">
        <p className="text-sm text-grey flex gap-1 items-center">
          {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)} •{" "}
          <img src={`${item.media_type === "movie" ? "/icon-category-movie.svg" : "/icon-category-tv.svg"}`} className="inline" alt="" />
          {item.media_type === "movie" ? " Movie" : " TV Series"}
        </p>
        <p className="text-white font-semibold truncate">
          {item.title || item.name}
        </p>
      </div>
    </div>
  );
}