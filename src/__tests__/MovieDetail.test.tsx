import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MovieDetail from "../components/MovieDetail";

interface Movie {
  episode_id: number;
  title: string;
  release_date: string;
  opening_crawl: string;
  director: string;
  producer: string;
  rating: number;
}

const mockMovie: Movie = {
  episode_id: 1,
  title: "The Phantom Menace",
  release_date: "1999-05-19",
  opening_crawl: "Turmoil has engulfed the Galactic Republic.",
  director: "George Lucas",
  producer: "Rick McCallum",
  rating: 6.5,
};

describe("MovieDetail Component", () => {
  it("renders movie details when movie data is provided", () => {
    render(<MovieDetail movie={mockMovie} />);

    expect(screen.getByText("The Phantom Menace")).toBeInTheDocument();
    expect(screen.getByText(/1999-05-19/)).toBeInTheDocument();
    expect(screen.getByText("George Lucas")).toBeInTheDocument();
    expect(screen.getByText("6.5")).toBeInTheDocument();
    expect(screen.getByText(/Turmoil has engulfed/i)).toBeInTheDocument();
  });

  it("shows a placeholder message when no movie is selected", () => {
    render(<MovieDetail movie={null} />);
    expect(
      screen.getByText("Select a movie to see details")
    ).toBeInTheDocument();
  });
});
