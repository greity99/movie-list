import React from "react";
import Movie from "./Movie";

export default function Movies({ movies, onDeleteMovie }) {
  return (
    <ul id="movies">
      {movies.map((movie) => (
        <Movie
          key={movie.title}
          title={movie.title}
          grade={movie.grade}
          onDelete={() => onDeleteMovie(movie.title)}
        />
      ))}
    </ul>
  );
}