import { useEffect, useState } from "react";
import { BiCheckCircle } from "react-icons/bi";
import { ImSpinner9 } from "react-icons/im";

import "./index.scss";

import { international } from "../../language";
import common from "../../language/english/common.json";
import Product from "../../types/product";
import User from "../../types/user";
import HeaderLarge from "../HeaderNew";

type Props = {
  disableBack: () => void;
  onContinue: (eid: string) => void;
  product: Product;
  user: User;
  viewPlan: () => void;
  dontSubmit: boolean;
};

const EID = (props: Props) => {
  const [eid, setEID] = useState<string>("");
  const [isActivating, setIsActivating] = useState<boolean>(false);
  const [activated, setActivated] = useState<boolean>(false);
  const [errorActivating, setErrorActivating] = useState<string | null>("");

  const activateSIM = function (
    eid: string,
    done: (err: string | null) => void
  ) {
    fetch("/api/activate_product", {
      method: "POST",
      body: JSON.stringify({
        email: props.user.email,
        first_name: props.user.firstName,
        last_name: props.user.lastName,
        country_of_residence: "US",
        product_id: props.product.id,
        device: {
          id: eid,
          eid: eid,
          operating_system: "ios",
          model: "iPhone",
        },
      }),
    })
      .then((resp) => {
        return resp.json();
      })
      .then((data: { message: string }) => {
        if (data.message === "SUCCESS") {
          done(null);
          return;
        }

        console.warn(data.message);
        done("Unable to activate, please check your EID");
      })
      .catch((err: Error | string) => {
        console.warn(err);
        done("Unable to activate, please check your connection.");
      });
  };

  useEffect(() => {
    document.title = international(common.EmrgMobile);
    props.disableBack();
  });

  return (
    <div className="EID">
      {(isActivating || activated) && (
        <div className="activating">
          {activated ? (
            <h1 style={{ fontSize: "38px" }}>Success!</h1>
          ) : (
            <div>
              <h1>eSIM Setup</h1>
              <div className="spinner">
                <ImSpinner9 />
              </div>
            </div>
          )}
          <p>
            You should have received <br /> a notification to install your eSIM
          </p>
        </div>
      )}
      <HeaderLarge />
      {errorActivating && (
        <div className="above-header-notch">
          <p className="error">{errorActivating}</p>
        </div>
      )}
      <div className="content-area-large">
        <h1>Thanks for your order!</h1>
        {props.dontSubmit ? (
          <h2>Complete the steps below.</h2>
        ) : (
          <h2>
            Complete the steps below to install your eSIM and get connected!
          </h2>
        )}
        <ol>
          <li>
            Go to your phone <b>Settings</b>
          </li>
          <li>
            Select <b>General</b>, then <b>About</b>
          </li>
          <li>
            Scroll down and select <b>EID</b>
          </li>
          <li>Copy the EID (long hold to copy)</li>
          <li>Paste it below</li>
        </ol>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            if (props.dontSubmit) {
              return;
            }
            if (!isActivating) {
              setIsActivating(true);
              setTimeout(() => {
                activateSIM(eid, (err: string | null) => {
                  setErrorActivating(err);
                  if (err == null) {
                    setActivated(true);
                  }
                  setIsActivating(false);
                });
              }, 1000);
            }
          }}
        >
          <input
            type="text"
            placeholder="Enter EID"
            value={eid}
            onChange={(ev) => setEID(ev.target.value.trim())}
          />
          {!props.dontSubmit && !activated && (
            <button disabled={eid.length === 0}>Install eSIM</button>
          )}
          {!props.dontSubmit && activated && (
            <button disabled={!activated} onClick={() => props.viewPlan()}>
              View Plan
            </button>
          )}
          {props.dontSubmit && (
            <button onClick={() => props.onContinue(eid)}>Continue</button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EID;
