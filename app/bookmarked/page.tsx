"use client";

import { useEffect, useState } from "react";
import { useBookmark } from "@/context/BookmarkContext";
import { fetchItemById } from "@/lib/tmdb";
import RecommendedCard from "@/components/RecommendedCard";

export default function BookmarkedPage() {
  const { movieIds, tvIds } = useBookmark();
  const [movies, setMovies] = useState<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string;
    backdrop_path: string;
  }[]>([]);
  const [tvShows, setTvShows] = useState<{
    id: number;
    title?: string;
    name?: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    media_type: string;
    backdrop_path: string;
  }[]>([]);
  console.log(tvShows, movies);

  useEffect(() => {
    async function fetchData() {
      let abort = false;
      try {
        const movieResults = await Promise.all(
          movieIds.map((id) => fetchItemById(id, "movie"))
        );

        const tvResults = await Promise.all(
          tvIds.map((id) => fetchItemById(id, "tv"))
        );
        
        
      } catch (error) {
        console.error("Failed to fetch bookmarked items", error);
      }
    }

    fetchData();
  }, [movieIds, tvIds]);

  return (
    <main className="p-6 space-y-10">
        <>
          <section>
            <h2 className="text-xl font-light text-white mb-4">Bookmarked Movies</h2>
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => ( 
                  <RecommendedCard key={movie.id} item={movie} />
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
                {tvShows.map((movie) => ( 
                  <RecommendedCard key={movie.id} item={movie} />
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