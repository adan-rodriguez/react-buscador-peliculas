const MOVIES_API_KEY = "31d2e0f2";

export const searchMovies = async ({ search }) => {
  const API_URL = `https://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&s=${search}`;

  try {
    const response = await fetch(API_URL);
    const { Search } = await response.json();
    const movies = Array.isArray(Search) ? Search : [];
    return movies.map(({ imdbID, Title, Poster, Year }) => ({
      id: imdbID,
      title: Title,
      year: Year,
      image: Poster,
    }));
  } catch (error) {
    throw new Error("Oops... ha ocurrido un error");
  }
};
