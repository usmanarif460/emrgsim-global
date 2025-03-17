import "./index.scss";
import Header from "../ProfileHeader";
import logo from "../../assets/saudi/logo.png";
import { useHistory } from "react-router-dom";

type Props = {};

const TermsAndConditions = (props: Props) => {
  const totalData = 1000; // 1GB in MB
  const usedData = 500; // Used data in MB
  const remainingData = totalData - usedData;
  const usedPercentage = (usedData / totalData) * 100;
  const history = useHistory();
  return (
    <div className="Profile">
      <Header />
      <div className="content">
        <div className="content-sub">
          <div className="c1">
            <img src={logo} alt="" />
            <div className="c2">
              <p>Your current data plan:</p>
              <p>
                <strong>1GB · 3 days left</strong>
              </p>
            </div>
          </div>

          <div className="c3">
            <div className="inner">
              <div>
                <p>
                  <strong>5MB</strong>
                </p>
                <p>used</p>
              </div>
              <div>
                <p>
                  <strong>995MB</strong>
                </p>
                <p>remaining</p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${usedPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="btn">
          <button type="button" onClick={() => history.push("/data-plans")}>
            Buy more Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
