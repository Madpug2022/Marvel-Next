export interface ComicI {
  id: number;
  title: string;
  dates: DatesI[];
  thumbnail: ThumbnailI;
}

interface DatesI {
  type: string;
  date: string;
}

interface ThumbnailI {
  path: string;
  extension: string;
}
