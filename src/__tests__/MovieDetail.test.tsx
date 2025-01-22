import React from "react";
import { render, screen } from "@testing-library/react";
import MovieDetail from "../components/MovieDetail";

const mockMovie = {
  id: 1,
  episode: 1,
  title: "The Phantom Menace",
  releaseDate: "1999-05-19",
  description: "Turmoil has engulfed...",
  director: "George Lucas",
  rating: 4,
};

describe("MovieDetail Component", () => {
  test("renders movie details when a movie is selected", () => {
    render(<MovieDetail selectedMovie={mockMovie} />);

    expect(screen.getByText("The Phantom Menace")).toBeInTheDocument();
    expect(screen.getByText("Turmoil has engulfed...")).toBeInTheDocument();
    expect(screen.getByText("Directed by: George Lucas")).toBeInTheDocument();
    expect(screen.getByText("Release Date: 1999-05-19")).toBeInTheDocument();
  });

  test("displays placeholder when no movie is selected", () => {
    render(<MovieDetail selectedMovie={null} />);

    expect(
      screen.getByText("Select a movie to see details.")
    ).toBeInTheDocument();
  });
});
