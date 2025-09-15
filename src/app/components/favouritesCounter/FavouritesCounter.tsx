"use client";
import "./FavouritesCounter.scss";
import { useMainContext } from "@/app/context/MainContext";
import HeartIconFilled from "../ui/Icons/HeartIconFilled";

function FavouritesCounter() {
  const { favorites, setDisplayFavorites, displayFavorites } = useMainContext();

  return (
    <section className="favorites">
      <button onClick={() => setDisplayFavorites(!displayFavorites)}>
        <HeartIconFilled className="favorites__icon" />
        <span className="favorites__text">{favorites.length}</span>
      </button>
    </section>
  );
}

export default FavouritesCounter;
