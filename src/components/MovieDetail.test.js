import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetail from "./MovieDetail";

const mockMovie = {
  id: 1,
  title: "Episode I - The Phantom Menace",
  description: "A long time ago in a galaxy far, far away...",
  director: "George Lucas",
  releaseDate: "1999-05-19",
  rating: 3,
  poster: "https://via.placeholder.com/150x200.png?text=Episode+I",
};

describe("MovieDetail Component", () => {
  test("renders movie details when a movie is selected", () => {
    render(<MovieDetail selectedMovie={mockMovie} />);

    // Check if the movie details are displayed
    expect(
      screen.getByText(/Episode I - The Phantom Menace/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A long time ago in a galaxy far, far away/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/George Lucas/i)).toBeInTheDocument();
    expect(screen.getByText(/1999-05-19/i)).toBeInTheDocument();
    expect(screen.getByText(/⭐{3}/i)).toBeInTheDocument();
  });

  test("renders placeholder text when no movie is selected", () => {
    render(<MovieDetail selectedMovie={null} />);

    // Check if the placeholder text is displayed
    expect(
      screen.getByText(/Select a movie to see details/i)
    ).toBeInTheDocument();
  });
});
