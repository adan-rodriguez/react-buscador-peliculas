function MoviesList({ movies }) {
  const imageOnErrorHandler = (event) => {
    console.log("error");
    event.target.src =
      "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";
  };

  return (
    <section className="movie-section">
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <article>
              <h2>{movie.title}</h2>
              <p>{movie.year}</p>
              <img
                src={movie.image}
                alt={movie.title}
                loading="lazy"
                onError={imageOnErrorHandler}
              />
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Movies({ movies }) {
  if (movies.length === 0) return <p>No se encontraron resultados</p>;
  return <MoviesList movies={movies} />;
}
