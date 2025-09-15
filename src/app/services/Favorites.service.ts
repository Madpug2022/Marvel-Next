import { CharactersI } from "../interfaces/Characters";

const FAVORITES_KEY = "marvel_favorites";

const FAVORITES_API = {
  addTofavorites: async (character: CharactersI): Promise<void> => {
    const characterWithStringId = {
      ...character,
      id: String(character.id),
    };

    const currentFavorites = await FAVORITES_API.getFavorites();

    const exists = currentFavorites.some(
      (fav) => String(fav.id) === String(characterWithStringId.id)
    );

    if (!exists) {
      const updatedFavorites = [...currentFavorites, characterWithStringId];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  },

  getFavorites: async (): Promise<CharactersI[]> => {
    try {
      const favoritesJson = localStorage.getItem(FAVORITES_KEY);
      return favoritesJson ? JSON.parse(favoritesJson) : [];
    } catch (error) {
      console.error("Error recovering data:", error);
      return [];
    }
  },

  removeFromFavorites: async (id: number): Promise<void> => {
    const currentFavorites = await FAVORITES_API.getFavorites();
    const updatedFavorites = currentFavorites.filter(
      (character) => String(character.id) !== String(id)
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  },

  clearAllFavorites: async (): Promise<void> => {
    localStorage.removeItem(FAVORITES_KEY);
  },

  isFavorite: async (id: number): Promise<boolean> => {
    const favorites = await FAVORITES_API.getFavorites();
    return favorites.some((character) => String(character.id) === String(id));
  },
};

export default FAVORITES_API;
