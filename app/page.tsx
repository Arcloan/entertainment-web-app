import TrendingSlider from "@/components/TrendingSlider";
import RecommendedSection from "@/components/RecommendedSection";
import { searchMulti } from "@/lib/tmdb";
import RecommendedCard from "@/components/RecommendedCard";
import { SkeletonGrid } from "@/components/SkeletonGrid";
import { Suspense } from "react";

interface Props {
  searchParams: { query?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const query = (await searchParams).query?.trim();
  if (query) {
    const results : {
      id: number;
      title: string;
      name: string;
      poster_path: string;
      release_date?: string;
      first_air_date?: string;
      media_type: string;
      backdrop_path: string;
    }[] = await searchMulti(query);
    const movies = results.filter(r => r.media_type === "movie");
    const tv = results.filter(r => r.media_type === "tv");

    return (
      <main className="bg-darkestBlue min-h-screen p-4 md:p-6 lg:p-8 grid grid-cols-1">
        <h2 className="text-xl mb-4">Search results for &quot;{query}&quot;</h2>

        <section className="mb-10">
          <h3 className="text-white text-lg mb-3">Movies</h3>
          {movies.length > 0 ? (
            <Suspense fallback={<SkeletonGrid />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {movies.map((movie) => ( 
                <RecommendedCard type={"movie"} key={movie.id} item={movie} />
              ))}
            </div>
            </Suspense>
          ) : (
            <p className="text-grey">No movie results.</p>
          )}
        </section>

        <section>
          <h3 className="text-white text-lg mb-3">TV Series</h3>
          {tv.length > 0 ? (
            <Suspense fallback={<SkeletonGrid />}>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tv.map((item) => (
                <RecommendedCard type={"tv"} key={item.id} item={item} />
              ))}
            </div>
            </Suspense>
          ) : (
            <p className="text-grey">No TV series results.</p>
          )}
        </section>
      </main>
    );
    }


  return (
    <main className="bg-darkestBlue min-h-screen p-4 md:p-6 lg:p-8 grid grid-cols-1">
      <Suspense fallback={<SkeletonGrid />}>
        <TrendingSlider />
      </Suspense>
      <Suspense fallback={<SkeletonGrid />}>
        <RecommendedSection />
      </Suspense>
    </main>
  );
}