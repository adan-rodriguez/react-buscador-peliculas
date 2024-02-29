function MoviesList({ movies }) {
  const imageOnErrorHandler = (event) => {
    event.target.src =
      "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";
    event.target.alt = "404 POSTER NOT FOUND";
  };

  return (
    <section className="movie-section">
      <p>
        {movies.length === 0
          ? "0 resultados"
          : movies.length === 1
          ? "1 resultado"
          : `${movies.length} resultados`}
      </p>
      <ul>
        {movies.map(({ id, title, image, year }) => (
          <li key={id}>
            <article>
              <h2>{title}</h2>
              <p>{year}</p>
              <img
                src={image}
                alt={`Poster de ${title}`}
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
  return <MoviesList movies={movies} />;
}
