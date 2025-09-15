import { CharactersI } from "../../interfaces/Characters";

import "./characterCard.scss";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Link from "next/link";
import placeholder from "@/app/assets/images/Avengers_logo.webp";
import Image from "next/image";

const CharacterCard = ({ character }: { character: CharactersI }) => {
  const portraitRatio = "portrait_xlarge";

  return (
    <Link href={`/${character.id}`}>
      <li className="character-card">
        <div className="character-card__image">
          <Image
            width={150}
            height={225}
            src={
              character.thumbnail
                ? `${character.thumbnail.path}/${portraitRatio}.${character.thumbnail.extension}`
                : placeholder.src
            }
            alt={character.name}
          />{" "}
        </div>
        <div className="character-card__info">
          <p className="character-card__name">{character.name}</p>
          <FavoriteButton character={character} />
        </div>
      </li>
    </Link>
  );
};

export default CharacterCard;
