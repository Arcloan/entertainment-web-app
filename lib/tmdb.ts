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
    }
  });

  if (!res.ok) throw new Error("Search failed");
  const data = await res.json();
  return data.results;
}

export async function fetchItemById(id: number, type: "movie" | "tv") {
  const res = await fetch(`https://api.themoviedb.org/3/${type}/${id}`,
    {headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMGYyZmE3NDc2NjFiMWY3NDZiODE1YThlNTY4ZDkzMiIsIm5iZiI6MTc0NzA4MDk5NS4zMywic3ViIjoiNjgyMjU3MjMwNDIxZDE0ZWUyMmQxY2IzIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.WWVExIG1oPeTPEWbtjUBFudLrDYPV3lV6QqI3LGntkA`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
}