"use client";

import { useEffect, useState } from "react";
import { useBookmark } from "@/context/BookmarkContext";
import { fetchItemById } from "@/lib/tmdb";
import { useSearchParams } from "next/navigation";
import RecommendedCard from "@/components/RecommendedCard";

export default function BookmarkedPage() {
  const { movieIds, tvIds } = useBookmark();
  const [movies, setMovies] = useState<{
    id: number;
    title: string;
    name: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string;
    backdrop_path: string;
  }[]>([]);
  const [tvShows, setTvShows] = useState<{
    id: number;
    title: string;
    name: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string;
    backdrop_path: string;
  }[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let abort = false;
    async function fetchData() {
      try {
        const [movieResults, tvResults] = await Promise.all([await Promise.all(
          movieIds.map((id) => fetchItemById(id, "movie"))
        ), await Promise.all(
          tvIds.map((id) => fetchItemById(id, "tv"))
        )])
        setMovies(movieResults);
        setTvShows(tvResults);
        
      } catch (error) {
        console.error("Failed to fetch bookmarked items", error);
      }
    }

    fetchData();
    return () => {abort = true};
  }, [movieIds, tvIds]);

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query")?.toLowerCase() ?? "";

  const filteredMovies = movies.filter((movie) =>
    movie!.title!.toLowerCase().includes(searchQuery)
  );

  const filteredTvShows = tvShows.filter((tv) =>
    (tv.name || "").toLowerCase().includes(searchQuery)
  );
  console.log(filteredMovies);

  return (
    <main className="p-4 md:p-6 lg:p-8 space-y-10">
        <>
          <section>
            <h2 className="text-xl font-light text-white mb-4">Bookmarked Movies</h2>
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredMovies.map((movie) => ( 
                  <RecommendedCard type={"movie"} key={movie.id} item={movie} />
                  ))}
              </div>
            ) : (
              <p className="text-gray-400">No bookmarked movies</p>
            )}
          </section>

          <section>
            <h2 className="text-xl font-light text-white mb-4">Bookmarked TV Series</h2>
            {tvShows.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredTvShows.map((tv) => ( 
                  <RecommendedCard type={"tv"} key={tv.id} item={tv} />
                  ))}
                </div>
            ) : (
              <p className="text-gray-400">No bookmarked TV series</p>
            )}
          </section>
        </>
    </main>
  );
}