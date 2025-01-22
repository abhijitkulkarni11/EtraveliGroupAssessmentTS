import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "./MovieList";

const mockMovies = [
  {
    id: 1,
    episode: 1,
    title: "Episode I - The Phantom Menace",
    releaseDate: "1999-05-19",
    rating: 3,
  },
  {
    id: 2,
    episode: 2,
    title: "Episode II - Attack of the Clones",
    releaseDate: "2002-05-16",
    rating: 4,
  },
];

describe("MovieList Component", () => {
  test("renders a list of movies", () => {
    render(<MovieList movies={mockMovies} onSelectMovie={jest.fn()} />);

    // Check if movies are displayed
    expect(
      screen.getByText(/Episode I - The Phantom Menace/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Episode II - Attack of the Clones/i)
    ).toBeInTheDocument();
  });

  test("calls onSelectMovie when a movie is clicked", () => {
    const mockSelectMovie = jest.fn();
    render(<MovieList movies={mockMovies} onSelectMovie={mockSelectMovie} />);

    // Click on the first movie
    fireEvent.click(screen.getByText(/Episode I - The Phantom Menace/i));

    // Ensure the onSelectMovie callback was called
    expect(mockSelectMovie).toHaveBeenCalledWith(mockMovies[0]);
  });
});
