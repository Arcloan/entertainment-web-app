import { searchMulti, fetchPopular } from "@/lib/tmdb";
import RecommendedCard from "@/components/RecommendedCard";

export default async function HomePage(props: {
  searchParams: Promise<{
    query: string;
  }>;
}) {
  const query = (await props.searchParams).query?.trim();
  const popular = await fetchPopular();
  const moviesTrending = popular.filter((item: { media_type: string; }) => item.media_type === "movie");
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

    return (
      <main className="bg-darkestBlue p-4 md:p-6 lg:p-8 grid grid-cols-1">
        <h2 className="text-xl h-max mb-8">Search results for &quot;{query}&quot;</h2>

        <section className="mb-4">
          <h3 className="text-white text-lg mb-3">Movies</h3>
          {movies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie) => ( 
                  <RecommendedCard type={"movie"} key={movie.id} item={movie} />
                ))}
            </div>
          ) : (
            <p className="text-grey">No movie results.</p>
          )}
        </section>

      </main>
    );
    }


  return (
    <main className="bg-darkestBlue min-h-screen p-4 md:p-6 lg:p-8 grid grid-cols-1">
      <section>
            <div>
              <h2 className="text-white text-xl mb-8">Movies</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-min">
                  {moviesTrending.map((movie: { id: number; backdrop_path: string, title: string ; name: string ; poster_path: string; release_date?: string | undefined; first_air_date?: string | undefined; media_type: string; }) => (
                    <RecommendedCard type={"movie"} key={movie.id} item={movie} />
                  ))}
              </div>
            </div>
        </section>
    </main>
  );
}