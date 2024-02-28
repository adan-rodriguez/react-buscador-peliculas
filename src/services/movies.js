const MOVIES_API_KEY = "31d2e0f2";

export const searchMovies = async ({ search }) => {
  const API_URL = `https://www.omdbapi.com/?apikey=${MOVIES_API_KEY}&s=${search}`;

  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const movies = data.Search || [];
    return movies.map((movie) => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster,
    }));
  } catch (error) {
    throw new Error("Oops... ha ocurrido un error");
  }
};
