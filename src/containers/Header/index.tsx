import cellPhone from "../../assets/saudi/group-1.webp";
import circle from "../../assets/kenya/kaa/circle-white.png";

import "./index.scss";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="Header">
      <img className="cell" src={cellPhone} alt="" />
    </div>
  );
};

export default Header;
