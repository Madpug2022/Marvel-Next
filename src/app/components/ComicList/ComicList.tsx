import Loader from "../ui/loader/Loader";
import Error from "../ui/Error/Error";
import ComicCard from "../ComicCard/ComicCard";
import { ComicI } from "../../interfaces/Comics";
import "./comicList.scss";
import { useQuery } from "@tanstack/react-query";
import MARVEL_API from "@/app/services/Marvel.service";

function ComicList({ searchUri }: { searchUri: string }) {
  const STALE_TIME = 24 * 60 * 60 * 1000;
  const CACHE_TIME = 24 * 60 * 60 * 1000;

  const {
    data: comicsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comics", searchUri],
    queryFn: () => MARVEL_API.getComics(searchUri),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!searchUri,
  });

  if (isLoading) {
    return <Loader text="Loading comics..." />;
  }

  if (error) {
    return <Error />;
  }

  const comics: ComicI[] = comicsData.data.results;

  return (
    <section className="comic-list">
      <h3>Comics</h3>
      <ul className="comic-list__list custom-scrollbar">
        {comics.map((comic) => (
          <ComicCard key={comic.id} comic={comic} />
        ))}
      </ul>
    </section>
  );
}

export default ComicList;
