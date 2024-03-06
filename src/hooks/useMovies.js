import { useCallback, useEffect, useMemo, useState } from "react";
import { getMovies } from "../services/movies";
import debounce from "just-debounce-it";

export function useMovies({ search, previousSearch, updateError }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(false);

  const obtainMovies = useCallback(async (search) => {
    if (previousSearch.current === search) return;
    updateError(null);
    previousSearch.current = search;

    if (search.length < 3) {
      // movies.length > 0 && getMovies([]); // no funciona xq movies.length siempre es 0
      setMovies([]);
      return;
    }

    setLoading(true);

    try {
      const newMovies = await getMovies({ search });
      setMovies(newMovies);
    } catch (error) {
      updateError(
        "El buscador no funciona en este momento. Intenta de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedGetMovies = useCallback(
    debounce(async (search) => {
      await obtainMovies(search);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedGetMovies(search);
  }, [search]);

  const updateSort = () => {
    setSort(!sort);
  };

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies;
  }, [sort, movies]);

  return {
    movies: sortedMovies,
    obtainMovies,
    loading,
    sort,
    updateSort,
  };
}
