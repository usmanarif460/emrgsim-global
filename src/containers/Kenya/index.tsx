import logo from "../../assets/saudi/logo.png";
import hero from "../../assets/hero.jpeg";

import "./index.scss";

type Props = {
  ad: () => void;
};

const Kenya = (props: Props) => {
  return (
    <div className="kenya">
      <div className="image">
        <div>
          <img
            src={logo}
            onClick={() => {
              props.ad();
            }}
            alt=""
          />
          <div className="desc">
            <h1>GlobalConnect</h1>
            <h4>
              POWERED BY <b>EMRGSIM</b>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kenya;
