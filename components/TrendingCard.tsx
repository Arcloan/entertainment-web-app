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

export default function TrendingCard({ item }: Props) {
  const { state, dispatch } = useBookmark();
  const isBookmarked = !!state.bookmarks[item.id];

  const toggleBookmark = () => {
    dispatch({ type: isBookmarked ? "REMOVE" : "ADD", payload: item.id });
  };

  return (
    <div key={item.id} className="relative group cursor-pointer min-w-[240px] flex-shrink-0 bg-midnightBlue rounded-lg overflow-hidden">
      <img
        src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
        alt={item.title || item.name}
        className={`w-[470px] h-[230px] rounded-lg object-cover hover:cursor-pointer`}
      />
      <button
        onClick={toggleBookmark}
        className="group absolute top-2 right-4 p-2 bg-black/60 rounded-full hover:cursor-pointer hover:bg-white"
      >
        <img src={`${isBookmarked ? "/icon-bookmark-full.svg" : "icon-bookmark-empty.svg"}`} className="group-hover:filter-black" alt="" />
      </button>
      <div className="p-2">
        <p className="text-sm text-grey flex gap-1 items-center">
          {item.release_date?.slice(0, 4) || item.first_air_date?.slice(0, 4)} •{" "}
          <img src={`${item.media_type === "movie" ? "/icon-category-movie.svg" : "/icon-category-tv.svg"}`} className="inline" alt="" />
          {item.media_type === "movie" ? " Movie" : " TV Series"}
        </p>
        <p className="text-white text-sm truncate">
          {item.title || item.name}
        </p>
      </div>
    </div>
    );
}