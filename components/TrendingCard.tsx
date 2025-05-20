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
  const { movieIds, tvIds, dispatch  } = useBookmark();
  const isBookmarked = (item.media_type == "tv" && tvIds.indexOf(item.id) !== -1) || (item.media_type == "movie" && movieIds.indexOf(item.id) !== -1);

  const toggleBookmark = () => {
    dispatch({ type: isBookmarked ? "REMOVE" : "ADD", payload: {id: item.id, mediaType: item.media_type as "movie" | "tv"} });
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
        className="group absolute top-2 right-4 p-2 bg-black/60 rounded-full hover:cursor-pointer hover:bg-white z-10"
      >
        <img src={`${isBookmarked ? "/icon-bookmark-full.svg" : "icon-bookmark-empty.svg"}`} className="group-hover:filter-black" alt="" />
      </button>
      <div className="hidden group-hover:grid absolute w-full h-[230px] rounded-lg top-0 left-0 bg-black/50">
        <button className="absolute place-self-center text-white flex items-center gap-4 py-2 px-4 rounded-full bg-white/30 hover:cursor-pointer"><img src="/icon-play.svg" alt="" /><p>Play</p></button>
      </div>
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