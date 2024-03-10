import { memo } from "react";

const imageOnErrorHandler = ({ target: image }) => {
  image.src =
    "https://static.displate.com/857x1200/displate/2022-04-15/7422bfe15b3ea7b5933dffd896e9c7f9_46003a1b7353dc7b5a02949bd074432a.jpg";
  image.alt = "404 POSTER NOT FOUND";
};

export const Movies = memo(function Movies({ movies, loading }) {
  console.log("render");
  return (
    <section className="movie-section">
      {loading ? (
        <p>Cargando películas...</p>
      ) : (
        <>
          <p>
            {movies.length === 0
              ? "0 resultados"
              : movies.length === 1
              ? "1 resultado"
              : `${movies.length} resultados`}
          </p>
          <ul>
            {movies.map(({ id, title, image, year }) => (
              <Movie key={id} title={title} image={image} year={year} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
});

function Movie({ title, year, image }) {
  return (
    <li>
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
  );
}
