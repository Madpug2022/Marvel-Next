export interface CharactersI {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: ThumbnailI;
  resourceURI: string;
  comics: ComicsI;
  events: EventsI;
  series: SeriesI;
  stories: StoriesI;
  urls: UrlsI[];
}

interface ThumbnailI {
  extension: string;
  path: string;
}

interface ComicsI {
  available: number;
  collectionURI: string;
  items: ItemsI[];
  returned: number;
}

interface ItemsI {
  resourceURI: string;
  name: string;
  type?: string;
}

interface EventsI {
  available: number;
  collectionURI: string;
  items: ItemsI[];
  returned: number;
}

interface SeriesI {
  available: number;
  collectionURI: string;
  items: ItemsI[];
  returned: number;
}

interface StoriesI {
  available: number;
  collectionURI: string;
  items: ItemsI[];
  returned: number;
}

interface UrlsI {
  type: string;
  url: string;
}
