import "./App.css";
import { useCallback, useRef } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";
import { searchMovies } from "./services/movies";

export default function App() {
  const { search, getSearch } = useSearch();
  const { movies, getMovies, loading, getLoading, sort, getSort } = useMovies();
  const previousSearch = useRef(search);

  // const obtainMovies = async (search) => {
  //   if (previousSearch.current === search) return;
  //   // setError(null);
  //   previousSearch.current = search;

  //   if (search.length < 3) {
  //     getMovies([]);
  //     return;
  //   }

  //   getLoading(true);

  //   try {
  //     const newMovies = await searchMovies({ search });
  //     getMovies(newMovies);
  //   } catch (error) {
  //     // setError(error.message);
  //   } finally {
  //     getLoading(false);
  //   }
  // };

  const obtainMovies = useCallback(async (search) => {
    if (previousSearch.current === search) return;
    // setError(null);
    previousSearch.current = search;

    if (search.length < 3) {
      // movies.length > 0 && getMovies([]);
      getMovies([]);
      return;
    }

    getLoading(true);

    try {
      const newMovies = await searchMovies({ search });
      getMovies(newMovies);
    } catch (error) {
      // setError(error.message);
    } finally {
      getLoading(false);
    }
  }, []);

  // const debounceGetMovies = debounce(async (search) => {
  //   await obtainMovies(search);
  // }, 500);

  const debounceGetMovies = useCallback(
    debounce(async (search) => {
      await obtainMovies(search);
    }, 500),
    [obtainMovies] // no estoy seguro de que sea necesaria esta dependencia
  );

  const handleChange = (e) => {
    const newSearch = e.target.value;
    if (newSearch.startsWith(" ")) return; // if (newSearch === " ") return;
    getSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            obtainMovies(search);
          }}
        >
          <input
            type="text"
            id="search"
            value={search}
            onChange={handleChange}
            placeholder="Batman, Superman, Spiderman..."
          />
          <p>Ingresa al menos tres caracteres</p>
          <button type="submit">Buscar</button>
        </form>
        <label>
          Ordenar alfabéticamente
          <input type="checkbox" id="sort" value={sort} onChange={getSort} />
        </label>
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </>
  );
}
