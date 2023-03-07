import { useCallback } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";
import { useSortMovies } from "./hooks/useSortMovies";

export default function App() {
  const { sort, handleSort } = useSortMovies();
  const { search, updateSearch } = useSearch();
  const { movies, loading, getMovies } = useMovies(search, sort);

  const debounceGetMovies = useCallback(
    debounce(async (search) => {
      await getMovies(search);
    }, 500),
    [getMovies]
  );

  const handleChange = (e) => {
    const newSearch = e.target.value;
    if (newSearch.startsWith(" ")) return; // if (newSearch === " ") return;
    updateSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getMovies(search);
          }}
        >
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Batman, Superman, Spiderman..."
            name="search"
          />
          <small>Ingresa al menos tres caracteres</small>
          <button type="submit">Buscar</button>
        </form>
        <label>
          Ordenar alfabéticamente
          <input
            type="checkbox"
            name="sort"
            onChange={handleSort}
            value={sort}
          />
        </label>
      </header>
      <main>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <Movies movies={movies} search={search} />
        )}
      </main>
    </>
  );
}
