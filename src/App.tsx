import React, { useState, useEffect } from "react";
import MovieList from "./components/MovieList";
import MovieDetail from "./components/MovieDetail";
import "./App.css";

// Define the Movie type
interface Movie {
  id: number;
  episode: number;
  title: string;
  releaseDate: string;
  description: string;
  director: string;
  rating: number; // Mock rating between 1 and 5
}

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("");

  // Fetch movies from the API
  useEffect(() => {
    fetch("https://swapi.dev/api/films/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const formattedMovies: Movie[] = data.results.map(
          (movie: any, index: number) => ({
            id: index + 1,
            episode: index + 1,
            title: movie.title,
            releaseDate: movie.release_date,
            description: movie.opening_crawl,
            director: movie.director,
            rating: Math.floor(Math.random() * 5) + 1, // Mock ratings (1 to 5)
          })
        );
        setMovies(formattedMovies);
        setFilteredMovies(formattedMovies);
      });
  }, []);

  // Handle search functionality
  useEffect(() => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = movies.filter(
      (movie) =>
        movie.title.toLowerCase().includes(lowerCaseSearch) ||
        movie.director.toLowerCase().includes(lowerCaseSearch) ||
        movie.description.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredMovies(filtered);
  }, [searchTerm, movies]);

  // Handle sorting
  const handleSort = (sortType: string) => {
    let sortedMovies = [...filteredMovies];
    if (sortType === "year") {
      sortedMovies.sort(
        (a, b) =>
          new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      );
    } else if (sortType === "episode") {
      sortedMovies.sort((a, b) => a.episode - b.episode);
    } else if (sortType === "rating") {
      sortedMovies.sort((a, b) => b.rating - a.rating);
    }
    setFilteredMovies(sortedMovies);
    setSortBy(sortType);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="sort-container">
          <label htmlFor="sort-by">Sort by:</label>
          <select
            id="sort-by"
            value={sortBy}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="year">Year</option>
            <option value="episode">Episode</option>
            <option value="rating">Rating</option>
          </select>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <div className="content">
        <MovieList movies={filteredMovies} onSelectMovie={setSelectedMovie} />
        <MovieDetail selectedMovie={selectedMovie} />
      </div>
    </div>
  );
};

export default App;
