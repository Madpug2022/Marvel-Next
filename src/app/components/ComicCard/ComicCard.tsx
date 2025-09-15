import Image from "next/image";
import getYearFromDate from "../../helpers/getYearFromDate";
import { ComicI } from "../../interfaces/Comics";
import "./comicCard.scss";

function ComicCard({ comic }: { comic: ComicI }) {
  return (
    <li className="comic-card">
      <div className="comic-card__img">
        <Image
          width={150}
          height={225}
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
        />
      </div>
      <div className="comic-card__info">
        <h4>{comic.title}</h4>
        <p>
          {comic.dates?.[0]?.date
            ? getYearFromDate(comic.dates[0].date)
            : "Unknown"}
        </p>{" "}
      </div>
    </li>
  );
}

export default ComicCard;
