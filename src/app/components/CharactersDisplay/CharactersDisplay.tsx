"use client";
import { useMainContext } from "@/app/context/MainContext";
import { CharactersI } from "../../interfaces/Characters";
import CharacterCard from "../CharacterCard/CharacterCard";
import Error from "../ui/Error/Error";
import Loader from "../ui/loader/Loader";
import "./CharactersDisplay.scss";

function CharacterDisplay() {
  const { characters, isLoading, error, favorites, displayFavorites } =
    useMainContext();

  const results: CharactersI[] = characters?.data?.results || [];

  if (isLoading) return <Loader text="Loading characters..." />;

  if (error) return <Error />;

  return (
    <main className="characters-display">
      <ul className="characters-display__list">
        {displayFavorites
          ? favorites.map((character: CharactersI) => (
              <CharacterCard key={character.id} character={character} />
            ))
          : results.map((character: CharactersI) => (
              <CharacterCard key={character.id} character={character} />
            ))}
      </ul>
    </main>
  );
}

export default CharacterDisplay;
