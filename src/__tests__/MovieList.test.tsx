import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieList from "../components/MovieList";

interface Movie {
  episode_id: number;
  title: string;
  release_date: string;
  rating: number;
}

const mockMovies: Movie[] = [
  {
    episode_id: 1,
    title: "The Phantom Menace",
    release_date: "1999-05-19",
    rating: 6.5,
  },
  {
    episode_id: 2,
    title: "Attack of the Clones",
    release_date: "2002-05-16",
    rating: 6.6,
  },
];

describe("MovieList Component", () => {
  it("renders a list of movies", () => {
    render(<MovieList movies={mockMovies} onMovieSelect={jest.fn()} />);

    const movieTitles = screen.getAllByText(/Episode/i);
    expect(movieTitles).toHaveLength(2);
    expect(screen.getByText("The Phantom Menace")).toBeInTheDocument();
    expect(screen.getByText("Attack of the Clones")).toBeInTheDocument();
  });

  it("triggers onMovieSelect when a movie is clicked", () => {
    const onMovieSelectMock = jest.fn();
    render(<MovieList movies={mockMovies} onMovieSelect={onMovieSelectMock} />);

    const movie = screen.getByText("The Phantom Menace");
    fireEvent.click(movie);

    expect(onMovieSelectMock).toHaveBeenCalledTimes(1);
    expect(onMovieSelectMock).toHaveBeenCalledWith(mockMovies[0]);
  });

  it("shows a placeholder message when no movies are available", () => {
    render(<MovieList movies={[]} onMovieSelect={jest.fn()} />);
    expect(screen.getByText("No movies available")).toBeInTheDocument();
  });
});
