"use client";
import {
  createContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import { CharactersI } from "../interfaces/Characters";
import { useQuery } from "@tanstack/react-query";
import MARVEL_API from "../services/Marvel.service";
import FAVORITES_API from "../services/Favorites.service";

export interface MainContextValue {
  characters: { data: { results: CharactersI[] } } | null;
  isLoading: boolean;
  error: unknown;
  setSearchTerm: (searchTerm: string) => void;
  favorites: CharactersI[];
  setFavorites: (favorites: CharactersI[]) => void;
  displayFavorites: boolean;
  setDisplayFavorites: (displayFavorites: boolean) => void;
  addToFavorites: (character: CharactersI) => Promise<void>;
  removeFromFavorites: (id: number) => Promise<void>;
  isFavorite: (id: number) => boolean;
  refreshFavorites: () => Promise<void>;
}

const MainContext = createContext<MainContextValue>({
  characters: { data: { results: [] } },
  isLoading: false,
  error: null,
  setSearchTerm: () => {},
  favorites: [],
  setFavorites: () => {},
  displayFavorites: false,
  setDisplayFavorites: () => {},
  addToFavorites: async () => {},
  removeFromFavorites: async () => {},
  isFavorite: () => false,
  refreshFavorites: async () => {},
});

export default MainContext;

export const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favorites, setFavorites] = useState<CharactersI[]>([]);
  const [displayFavorites, setDisplayFavorites] = useState<boolean>(false);

  const DEFAULT_CHARACTERS_LIMIT = 50;
  const STALE_TIME = 24 * 60 * 60 * 1000;
  const CACHE_TIME = 48 * 60 * 60 * 1000;

  const {
    data: characters,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["characters", DEFAULT_CHARACTERS_LIMIT, searchTerm],
    queryFn: () => {
      if (searchTerm !== "") {
        return MARVEL_API.getCharacterByName(searchTerm);
      } else {
        return MARVEL_API.getCharacters(DEFAULT_CHARACTERS_LIMIT);
      }
    },
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: true,
  });

  const getFavorites = useCallback(async () => {
    try {
      const response = await FAVORITES_API.getFavorites();
      setFavorites(response);
    } catch (error) {
      console.error("Error al cargar favoritos:", error);
      setFavorites([]);
    }
  }, []);

  const addToFavorites = useCallback(
    async (character: CharactersI) => {
      try {
        await FAVORITES_API.addTofavorites(character);
        await getFavorites();
      } catch (error) {
        console.error("Error al agregar a favoritos:", error);
      }
    },
    [getFavorites]
  );

  const removeFromFavorites = useCallback(
    async (id: number) => {
      try {
        await FAVORITES_API.removeFromFavorites(id);
        await getFavorites();
      } catch (error) {
        console.error("Error al eliminar de favoritos:", error);
      }
    },
    [getFavorites]
  );

  const isFavorite = useCallback(
    (id: number): boolean => {
      return favorites.some((character) => String(character.id) === String(id));
    },
    [favorites]
  );

  const refreshFavorites = useCallback(async () => {
    await getFavorites();
  }, [getFavorites]);

  useEffect(() => {
    getFavorites();
  }, [getFavorites]);

  const contextValue = useMemo(
    () => ({
      characters,
      isLoading,
      error,
      setSearchTerm,
      favorites,
      setFavorites,
      displayFavorites,
      setDisplayFavorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      refreshFavorites,
    }),
    [
      characters,
      favorites,
      setFavorites,
      setSearchTerm,
      isLoading,
      error,
      displayFavorites,
      setDisplayFavorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite,
      refreshFavorites,
    ]
  );

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export const useMainContext = (): MainContextValue => {
  const context = useContext(MainContext);
  if (!context) {
    throw new Error("useMainContext must be used within a MainProvider");
  }
  return context;
};
