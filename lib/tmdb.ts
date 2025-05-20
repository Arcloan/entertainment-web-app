const TMDB_API = "https://api.themoviedb.org/3";
const TOKEN = process.env.TMDB_API_TOKEN;

export async function fetchTrending() {
  const res = await fetch(`${TMDB_API}/trending/all/day`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  const data = await res.json();
  return data.results;
}

export async function fetchPopular() {
  const res = await fetch("https://api.themoviedb.org/3/trending/all/week", {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch recommended");

  const data = await res.json();
  return data.results;
}

export async function searchMulti(query: string) {
  const res = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
    next: { revalidate: 0 },
  });

  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.results;
}