import { fetchPopular } from "@/lib/tmdb";
import RecommendedCard from "@/components/RecommendedCard"

export default async function RecommendedSection() {
  const results = await fetchPopular();

  const movies = results.filter((item: { media_type: string; }) => item.media_type === "movie");
  const tvShows = results.filter((item: { media_type: string; }) => item.media_type === "tv");

  return (
    <section className="mt-10">
      <div>
        <h2 className="text-white text-xl mb-4">Recommended Movies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-min">
          {movies.map((movie: { id: number; backdrop_path: string, title: string ; name: string ; poster_path: string; release_date?: string | undefined; first_air_date?: string | undefined; media_type: string; }) => (
            <RecommendedCard type={"movie"} key={movie.id} item={movie} />
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-white text-xl mb-4">Recommended TV Series</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-min">
          {tvShows.map((tv: { id: number; backdrop_path: string; title: string ; name: string ; poster_path: string; release_date?: string | undefined; first_air_date?: string | undefined; media_type: string; }) => (
            <RecommendedCard type={"tv"} key={tv.id} item={tv} />
          ))}
        </div>
      </div>
    </section>
  );
}