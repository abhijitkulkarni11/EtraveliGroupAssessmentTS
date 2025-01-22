import React from "react";

interface Movie {
  id: number;
  episode: number;
  title: string;
  releaseDate: string;
  description: string;
  director: string;
  rating: number;
}

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  return (
    <div className="movie-list">
      <ul>
        {movies.map((movie) => (
          <li
            key={movie.id}
            onClick={() => onSelectMovie(movie)}
            className="movie-item"
          >
            <div className="movie-info">
              <span className="episode">{`Episode ${movie.episode}`}</span>
              <span className="title">{movie.title}</span>
            </div>
            <div className="extra-info">
              <span className="rating">
                {Array(movie.rating).fill("⭐").join("")}
              </span>
              <span className="release-date">{movie.releaseDate}</span>
            </div>
          </li>
        ))}
      </ul>
      {movies.length === 0 && <p>No movies match your search.</p>}
    </div>
  );
};

export default MovieList;
