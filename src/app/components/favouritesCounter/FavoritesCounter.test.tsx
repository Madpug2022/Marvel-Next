import { render, screen, fireEvent } from "@testing-library/react";
import FavouritesCounter from "./FavouritesCounter";
import "@testing-library/jest-dom";

const mockSetDisplayFavorites = jest.fn();
const mockDisplayFavorites = false;
const mockFavorites = [
  { id: 1, name: "Character 1" },
  { id: 2, name: "Character 2" },
];

jest.mock("../../context/MainContext", () => ({
  useMainContext: () => ({
    favorites: mockFavorites,
    setDisplayFavorites: mockSetDisplayFavorites,
    displayFavorites: mockDisplayFavorites,
  }),
}));

const renderWithContext = () => {
  return {
    ...render(<FavouritesCounter />),
  };
};

describe("FavouritesCounter", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should toggle displayFavorites when clicking the button", () => {
    renderWithContext();

    expect(screen.getByText("2")).toBeInTheDocument();

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSetDisplayFavorites).toHaveBeenCalledTimes(1);
    expect(mockSetDisplayFavorites).toHaveBeenCalledWith(true);
  });

  test("should display the correct number of favorites", () => {
    renderWithContext();

    expect(
      screen.getByText(mockFavorites.length.toString())
    ).toBeInTheDocument();
  });
});
