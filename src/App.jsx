import "./App.css";
import { useRef } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import SortIcon from "./icons/SortIcon";
import { useError } from "./hooks/useError";

export default function App() {
  const { search, updateSearch } = useSearch();
  const previousSearch = useRef(search);
  const { error, updateError } = useError();
  const { movies, obtainMovies, loading, sort, updateSort } = useMovies({
    search,
    previousSearch,
    updateError,
  });

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

  // const debounceGetMovies = debounce(async (search) => {
  //   await obtainMovies(search);
  // }, 500);

  const handleChangeMovieInput = (e) => {
    const newSearch = e.target.value;
    updateSearch(newSearch);
  };

  const handleSubmitMovieForm = (e) => {
    e.preventDefault();
    obtainMovies(search);
  };

  return (
    <>
      <header>
        <div>
          <img src="/logo.png" alt="Logo de Movie Search" className="logo" />
          <form onSubmit={(e) => handleSubmitMovieForm(e, { search })}>
            <input
              type="text"
              id="search"
              value={search}
              onChange={handleChangeMovieInput}
              placeholder="Batman, Superman, Spiderman..."
              maxLength="208"
            />
            <div>
              <p>Ingresa al menos tres caracteres</p>
              <button type="submit">Buscar</button>
            </div>
          </form>
        </div>
        <button
          onClick={updateSort}
          title={
            sort ? "No ordenar alfabéticamente" : "Ordenar alfabéticamente"
          }
          className={`sort-btn ${sort ? "active" : "disabled"}`}
        >
          <SortIcon />
        </button>
      </header>
      <main>
        {error ? <p>{error}</p> : <Movies movies={movies} loading={loading} />}
      </main>
    </>
  );
}
