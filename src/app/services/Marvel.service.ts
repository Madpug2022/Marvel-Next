const MARVEL_API = {
  getCharacters: async (limit: number) => {
    const response = await fetch(`/api/marvel/characters?limit=${limit}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
  getCharacterById: async (id: string) => {
    const response = await fetch(`/api/marvel/characters/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  },
  getCharacterByName: async (name: string) => {
    const response = await fetch(`/api/marvel/characters?name=${name}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
  getComics: async (collectionURI: string) => {
    const response = await fetch(
      `/api/marvel/comics?collectionURI=${encodeURIComponent(collectionURI)}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  },
};

export default MARVEL_API;
