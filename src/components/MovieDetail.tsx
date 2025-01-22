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

interface MovieDetailProps {
  selectedMovie: Movie | null;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ selectedMovie }) => {
  if (!selectedMovie) {
    return <div className="movie-detail">Select a movie to see details.</div>;
  }

  return (
    <div className="movie-detail">
      <h2>{selectedMovie.title}</h2>
      <p>{selectedMovie.description}</p>
      <img
        src={`https://via.placeholder.com/150x200.png?text=${selectedMovie.title.replace(
          /\s/g,
          "+"
        )}`}
        alt={selectedMovie.title}
        className="movie-poster"
      />
      <p>
        <strong>Directed by:</strong> {selectedMovie.director}
      </p>
      <p>
        <strong>Release Date:</strong> {selectedMovie.releaseDate}
      </p>
      <p>
        <strong>Average Rating:</strong>{" "}
        {Array(selectedMovie.rating).fill("⭐").join("")}
      </p>
    </div>
  );
};

export default MovieDetail;
