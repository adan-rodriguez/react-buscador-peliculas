import "./App.css";
import { useRef } from "react";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import SortIcon from "./components/icons/SortIcon";
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

  const handleChangeMovieInput = (e) => {
    updateSearch(e.target.value);
  };

  const handleSubmitMovieForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get("search");
    obtainMovies(search);
  };

  return (
    <>
      <header>
        <div>
          <img src="/logo.avif" alt="Logo de Movie Search" className="logo" />
          <form onSubmit={handleSubmitMovieForm}>
            <input
              id="search"
              name="search"
              type="text"
              value={search}
              onChange={handleChangeMovieInput}
              placeholder="Batman, Superman, Spiderman..."
              required
              minLength="3"
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
      <footer>
        Made by{" "}
        <a
          href="https://www.linkedin.com/in/adan-gabriel-rodriguez"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn de Adán Rodríguez"
        >
          Adán Rodríguez
        </a>
      </footer>
    </>
  );
}
