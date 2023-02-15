import { useCallback, useState } from "react";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies } from "./hooks/useMovies";
import { useSearch } from "./hooks/useSearch";
import debounce from "just-debounce-it";

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce((search) => {
      getMovies({ search });
    }, 500),
    [getMovies]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    getMovies({ search });
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    // if (newSearch === " ") return;
    if (newSearch.startsWith(" ")) return;
    updateSearch(newSearch);
    debounceGetMovies(newSearch);
  };

  const handleSort = () => {
    setSort(!sort);
  };

  return (
    <>
      <header>
        <h1>Buscador de películas</h1>
        <form onSubmit={handleSubmit}>
          <input
            onChange={handleChange}
            value={search}
            type="text"
            placeholder="Matrix, Batman, Superman..."
            name="search"
          />
          <label>
            Ordenar
            <input
              type="checkbox"
              name="sort"
              onChange={handleSort}
              value={sort}
            />
          </label>
          <button type="submit">Buscar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </header>
      <main>{loading ? <p>Cargando...</p> : <Movies movies={movies} />}</main>
    </>
  );
}

export default App;
