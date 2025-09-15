"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import MARVEL_API from "@/app/services/Marvel.service";
import "./style.scss";
import Loader from "@/app/components/ui/loader/Loader";
import Error from "@/app/components/ui/Error/Error";
import { CharactersI } from "@/app/interfaces/Characters";
import FavoriteButton from "@/app/components/FavoriteButton/FavoriteButton";
import ComicList from "@/app/components/ComicList/ComicList";
import Image from "next/image";

const STALE_TIME = 24 * 60 * 60 * 1000;
const CACHE_TIME = 24 * 60 * 60 * 1000;

function Page() {
  const params = useParams();
  const id = params?.id as string;

  const { data, isLoading, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => MARVEL_API.getCharacterById(id),
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
    enabled: !!id,
  });

  if (isLoading) {
    return <Loader text="Loading character data..." />;
  }

  if (error) {
    return <Error />;
  }

  if (!data?.data?.results?.[0]) {
    return (
      <main className="char-page">
        <div className="char-page__container">
          <p>Character not found</p>
        </div>
      </main>
    );
  }

  const result: CharactersI = data.data.results[0];
  const collectionURI = result.comics.collectionURI;

  return (
    <main className="char-page">
      <section className="char-page__container">
        <div className="description">
          <div className="description__img">
            <Image
              width={300}
              height={450}
              src={`${result.thumbnail.path}.${result.thumbnail.extension}`}
              alt={result.name}
            />
          </div>
          <div className="description__info">
            <div className="description__info__name">
              <h2>{result.name}</h2>
              <FavoriteButton character={result} />
            </div>
            <p>{result.description || "No description available"}</p>
          </div>
        </div>
      </section>
      <ComicList searchUri={collectionURI} />
    </main>
  );
}

export default Page;
