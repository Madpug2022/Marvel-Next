import { LiaCubeSolid } from "react-icons/lia";
import "./Loader.scss";

function Loader({ text }: { text?: string }) {
  return (
    <div className="loader">
      <LiaCubeSolid className="icon" />
      {text && <span className="text">{text}</span>}
    </div>
  );
}

export default Loader;
