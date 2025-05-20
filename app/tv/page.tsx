import { searchMulti, fetchPopular } from "@/lib/tmdb";
import RecommendedCard from "@/components/RecommendedCard";

interface Props {
  searchParams: { query?: string };
}

export default async function HomePage({ searchParams }: Props) {
  const query = (await searchParams).query?.trim();
  const popular = await fetchPopular();
  const tvTrending = popular.filter((item: { media_type: string; }) => item.media_type === "tv");
  if (query) {
    const results : {
      id: number;
      title?: string;
      name?: string;
      poster_path: string;
      release_date?: string;
      first_air_date?: string;
      media_type: string;
      backdrop_path: string;
    }[] = await searchMulti(query);
    const tvSeries = results.filter(r => r.media_type === "tv");

    return (
      <main className="bg-darkestBlue p-4 md:p-6 lg:p-8 grid grid-cols-1">
        <h2 className="text-xl h-max mb-8">Search results for &quot;{query}&quot;</h2>

        <section className="mb-4">
          <h3 className="text-white text-lg mb-3">Tv Series</h3>
          {tvSeries.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {tvSeries.map((tv) => ( 
                <RecommendedCard key={tv.id} item={tv} />
              ))}
            </div>
          ) : (
            <p className="text-grey">No TV series results.</p>
          )}
        </section>

      </main>
    );
    }


  return (
    <main className="bg-darkestBlue min-h-screen p-4 md:p-6 lg:p-8 grid grid-cols-1">
      <section>
            <div>
              <h2 className="text-white text-xl mb-8">Tv Series</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 auto-cols-min">
                {tvTrending.map((movie: { id: number; backdrop_path: string, title?: string | undefined; name?: string | undefined; poster_path: string; release_date?: string | undefined; first_air_date?: string | undefined; media_type: string; }) => (
                  <RecommendedCard key={movie.id} item={movie} />
                ))}
              </div>
            </div>
        </section>
    </main>
  );
}