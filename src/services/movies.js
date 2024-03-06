const API_KEY = import.meta.env.VITE_API_KEY;

export const getMovies = async ({ search }) => {
  const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`;

  const response = await fetch(API_URL);
  if (!response.ok) throw new Error();
  const { Search } = await response.json();
  const movies = Array.isArray(Search) ? Search : [];
  return movies.map(({ imdbID, Title, Poster, Year }) => ({
    id: imdbID,
    title: Title,
    year: Year,
    image: Poster,
  }));
};
