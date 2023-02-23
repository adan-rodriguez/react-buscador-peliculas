function MoviesList({ movies }) {
  return (
    <ul className="movies">
      {movies.map((movie) => (
        <li className="movie" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  );
}

export function Movies({ movies, search }) {
  if (search.length < 3) return <p>Aquí se mostrarán los resultados</p>;
  if (search.length >= 3 && movies.length === 0)
    return <p>No se encontraron resultados</p>;
  return <MoviesList movies={movies} />;
}
