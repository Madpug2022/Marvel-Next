import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FavoriteButton from "./FavoriteButton";
import "@testing-library/jest-dom";
import { CharactersI } from "@/app/interfaces/Characters";
import createMockCharacter from "@/app/test/MockCharacter";
import MainContext, { MainContextValue } from "@/app/context/MainContext";

const mockCharacter: CharactersI = createMockCharacter();

const createMockContextValue = (
  overrides: Partial<MainContextValue> = {}
): MainContextValue => ({
  characters: { data: { results: [] } },
  isLoading: false,
  error: null,
  setSearchTerm: jest.fn(),
  favorites: [],
  setFavorites: jest.fn(),
  displayFavorites: false,
  setDisplayFavorites: jest.fn(),
  addToFavorites: jest.fn(),
  removeFromFavorites: jest.fn(),
  isFavorite: jest.fn(() => false),
  refreshFavorites: jest.fn(),
  ...overrides,
});

const MockMainProvider = ({
  children,
  contextValue,
}: {
  children: React.ReactNode;
  contextValue: MainContextValue;
}) => {
  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithContext = (
  contextOverrides: Partial<MainContextValue> = {}
) => {
  const mockContextValue = createMockContextValue(contextOverrides);

  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <MockMainProvider contextValue={mockContextValue}>
          <FavoriteButton character={mockCharacter} />
        </MockMainProvider>
      </QueryClientProvider>
    ),
    mockContextValue,
  };
};

describe("FavoriteButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    queryClient.clear();
  });

  test("should display empty heart when character is not in favorites", async () => {
    renderWithContext({
      isFavorite: jest.fn(() => false),
    });

    await waitFor(() => {
      expect(screen.getByTestId("heart-empty")).toBeInTheDocument();
    });
  });

  test("should add character to favorites when clicking the empty heart button", async () => {
    const mockAddToFavorites = jest.fn();
    let isFavoriteState = false;

    const mockIsFavorite = jest.fn(() => isFavoriteState);

    renderWithContext({
      isFavorite: mockIsFavorite,
      addToFavorites: mockAddToFavorites,
    });

    await waitFor(() => {
      expect(screen.getByTestId("heart-empty")).toBeInTheDocument();
    });

    const favoriteButton = screen.getByTestId("favorite-btn");
    fireEvent.click(favoriteButton);

    expect(mockAddToFavorites).toHaveBeenCalledWith(mockCharacter);

    isFavoriteState = true;

    const updatedContextValue = createMockContextValue({
      isFavorite: jest.fn(() => true),
      addToFavorites: mockAddToFavorites,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <MockMainProvider contextValue={updatedContextValue}>
          <FavoriteButton character={mockCharacter} />
        </MockMainProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("heart-filled")).toBeInTheDocument();
    });
  });

  test("should remove character from favorites when clicking the filled heart button", async () => {
    const mockRemoveFromFavorites = jest.fn();

    renderWithContext({
      isFavorite: jest.fn(() => true),
      removeFromFavorites: mockRemoveFromFavorites,
    });

    await waitFor(() => {
      expect(screen.getByTestId("heart-filled")).toBeInTheDocument();
    });

    const favoriteButton = screen.getByTestId("favorite-btn");
    fireEvent.click(favoriteButton);

    expect(mockRemoveFromFavorites).toHaveBeenCalledWith(mockCharacter.id);
  });

  test("should display filled heart when character is already in favorites", async () => {
    renderWithContext({
      isFavorite: jest.fn(() => true),
    });

    await waitFor(() => {
      expect(screen.getByTestId("heart-filled")).toBeInTheDocument();
    });
  });

  test("should handle errors gracefully", async () => {
    const mockAddToFavorites = jest
      .fn()
      .mockRejectedValue(new Error("API Error"));
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    renderWithContext({
      isFavorite: jest.fn(() => false),
      addToFavorites: mockAddToFavorites,
    });

    const favoriteButton = screen.getByTestId("favorite-btn");
    fireEvent.click(favoriteButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error updating favorite:",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});
