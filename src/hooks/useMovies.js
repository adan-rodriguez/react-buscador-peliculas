import { useMemo, useState } from "react";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);

  // const [error, setError] = useState(null);

  const getMovies = (movies) => {
    setMovies(movies);
  };

  const getLoading = (bool) => {
    setLoading(bool);
  };

  const getSort = () => {
    setSort(!sort);
  };

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return {
    movies: sortedMovies,
    loading,
    getMovies,
    getLoading,
    sort,
    getSort /* error */,
  };
}
