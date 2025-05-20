import { fetchTrending } from "@/lib/tmdb";
import TrendingCard from "./TrendingCard";

export default async function TrendingSlider() {
  const trending = await fetchTrending();

  return (
    <section className="mt-6">
      <h2 className="text-white text-xl mb-3">Trending</h2>
      <div className="flex overflow-x-auto space-x-4 pb-2">
        {trending.map((item: { id: number; poster_path: string; first_air_date?: string; release_date?: string; media_type: string; backdrop_path: string; title: string; name: string; }) => (
          <TrendingCard key={item.id} item={item}></TrendingCard>
        ))}
      </div>
    </section>
  );
}