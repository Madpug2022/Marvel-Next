"use client";
import { CharactersI } from "../../interfaces/Characters";
import "./favoriteButton.scss";
import { useMainContext } from "@/app/context/MainContext";
import HeartIconFilled from "../ui/Icons/HeartIconFilled";
import HeartIcon from "../ui/Icons/HeartIcon";

function FavoriteButton({ character }: { character: CharactersI }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMainContext();

  const isCharacterFavorite = isFavorite(character.id);

  const handleFavorite = async (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    try {
      if (isCharacterFavorite) {
        await removeFromFavorites(character.id);
      } else {
        await addToFavorites(character);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
    }
  };

  return (
    <button
      className="favorite-btn"
      onClick={handleFavorite}
      data-testid="favorite-btn"
    >
      {isCharacterFavorite ? (
        <HeartIconFilled className="icon favorited" testId="heart-filled" />
      ) : (
        <HeartIcon className="icon unfavorited" testId="heart-empty" />
      )}
    </button>
  );
}

export default FavoriteButton;
