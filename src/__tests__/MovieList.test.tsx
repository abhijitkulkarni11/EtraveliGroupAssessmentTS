import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "../components/MovieList";

const mockMovies = [
  {
    id: 1,
    episode: 1,
    title: "The Phantom Menace",
    releaseDate: "1999-05-19",
    description: "Turmoil has engulfed...",
    director: "George Lucas",
    rating: 4,
  },
  {
    id: 2,
    episode: 2,
    title: "Attack of the Clones",
    releaseDate: "2002-05-16",
    description: "There is unrest in the Galactic Senate...",
    director: "George Lucas",
    rating: 3,
  },
];

describe("MovieList Component", () => {
  test("renders movie list", () => {
    render(<MovieList movies={mockMovies} onSelectMovie={jest.fn()} />);

    expect(screen.getByText("The Phantom Menace")).toBeInTheDocument();
    expect(screen.getByText("Attack of the Clones")).toBeInTheDocument();
  });

  test("calls onSelectMovie when a movie is clicked", () => {
    const mockSelectMovie = jest.fn();
    render(<MovieList movies={mockMovies} onSelectMovie={mockSelectMovie} />);

    const firstMovie = screen.getByText("The Phantom Menace");
    fireEvent.click(firstMovie);

    expect(mockSelectMovie).toHaveBeenCalledWith(mockMovies[0]);
  });
});
