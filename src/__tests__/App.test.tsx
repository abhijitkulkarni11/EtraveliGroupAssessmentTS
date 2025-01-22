import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  test("renders the app with sort options and a movie list", async () => {
    render(<App />);

    // Check if sort dropdown is rendered
    expect(screen.getByLabelText(/Sort by:/i)).toBeInTheDocument();

    // Wait for movies to load
    await waitFor(() => {
      expect(
        screen.getByText(/Episode I - The Phantom Menace/i)
      ).toBeInTheDocument();
    });
  });

  test("sorts movies by rating", async () => {
    render(<App />);

    // Wait for movies to load
    await waitFor(() => {
      expect(
        screen.getByText(/Episode I - The Phantom Menace/i)
      ).toBeInTheDocument();
    });

    // Select "Rating" in the sort dropdown
    fireEvent.change(screen.getByLabelText(/Sort by:/i), {
      target: { value: "rating" },
    });

    // Check that the first movie is now the one with the highest rating
    const movieItems = screen.getAllByRole("listitem");
    expect(movieItems[0]).toHaveTextContent(/⭐{4,5}/i); // Ensure high-rating movies are first
  });
});
