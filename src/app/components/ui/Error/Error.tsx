import "./error.scss";
import { MdError } from "react-icons/md";

function Error() {
  return (
    <div className="error">
      <MdError className="icon" />
      <h3>HYDRA is attacking our servers, please retry in a moment</h3>
    </div>
  );
}

export default Error;
