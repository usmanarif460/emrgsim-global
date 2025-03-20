import cellPhone from "../../assets/saudi/new-group.webp";

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
