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
      // movies.length > 0 && getMovies([]); // no funciona xq movies.length siempre es 0
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
        <div>
          <img src="/logo.png" alt="Logo de Movie Search" className="logo" />
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
            <div>
              <p>Ingresa al menos tres caracteres</p>
              <button type="submit">Buscar</button>
            </div>
          </form>
        </div>
        <button
          onClick={getSort}
          title={
            sort ? "No ordenar alfabéticamente" : "Ordenar alfabéticamente"
          }
          className={`sort-btn ${sort ? "active" : "disabled"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M15 10v-5c0 -1.38 .62 -2 2 -2s2 .62 2 2v5m0 -3h-4" />
            <path d="M19 21h-4l4 -7h-4" />
            <path d="M4 15l3 3l3 -3" />
            <path d="M7 6v12" />
          </svg>
        </button>
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </>
  );
}
