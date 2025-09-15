import "./Header.scss";
import logo from "../../assets/images/marvel-logo.png";
import FavouritesCounter from "../favouritesCounter/FavouritesCounter";
import Image from "next/image";
import Link from "next/link";

function Header() {
  return (
    <header className="header">
      <Link href="/" className="header__logo">
        <Image src={logo} alt="Marvel Logo" />
      </Link>
      <FavouritesCounter />
    </header>
  );
}

export default Header;
