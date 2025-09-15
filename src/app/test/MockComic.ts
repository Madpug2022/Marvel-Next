import { ComicI } from "../interfaces/Comics";

const createMockComic = (overrides: Partial<ComicI> = {}): ComicI => {
  return {
    id: 1,
    title: "Amazing Spider-Man",
    thumbnail: {
      path: "http://example.com/image",
      extension: "jpg",
    },
    dates: [{ type: "onsaleDate", date: "2023-11-01T00:00:00Z" }],
    ...overrides,
  };
};

export default createMockComic;
