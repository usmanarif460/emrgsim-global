import { useState, useEffect } from "react";

import "./index.scss";

import { international } from "../../language";
import common from "../../language/english/common.json";
import phone from "../../assets/globephone.jpeg";
import logo from "../../assets/saudi/logo.png";

type User = {
  firstName: string;
  lastName: string;
  eVisa: string;
};

type Props = {
  onNext: (user: User) => void;
  disableBack: () => void;
};

const Home = (props: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("philip@peakbw.com");
  const [eVisa, setEVisa] = useState("");

  const sendEmail = function () {
    fetch("/api/email", {
      method: "GET",
    })
      .then(() => {
        console.log("done");
      })
      .catch((err: Error | string) => {
        console.warn(err);
      });
  };

  useEffect(() => {
    document.title = international(common.EmrgMobile);
    props.disableBack();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="Home">
      <div className="header-logo">
        <img src={logo} />
      </div>
      <div className="content-area">
        <form
          onSubmit={(ev) => {
            props.onNext({
              firstName,
              lastName,
              eVisa,
            });
            sendEmail();
            ev.preventDefault();
          }}
        >
          <div className="content-area-body">
            <h2>Create account</h2>
            <label>First Name</label>
            <input
              type="text"
              autoCapitalize="on"
              value={firstName.trim()}
              required
              onChange={(ev) => setFirstName(ev.target.value)}
            />
            <label>Last Name</label>
            <input
              type="text"
              autoCapitalize="on"
              value={lastName.trim()}
              required
              onChange={(ev) => setLastName(ev.target.value)}
            />
            <label hidden>Email</label>
            <input
              hidden
              type="text"
              autoCapitalize="off"
              value={email.trim()}
              required
              onChange={(ev) => setEmail(ev.target.value)}
            />
            <label>eVisa Application Number</label>
            <input
              type="text"
              autoCapitalize="off"
              value={eVisa.trim()}
              required
              onChange={(ev) => setEVisa(ev.target.value)}
            />
            <div className="next-area">
              <button
                type="submit"
                disabled={firstName === "" || lastName === "" || eVisa === ""}
              >
                Next
              </button>
              <p className="login">
                Already have an account? <b>Sign in</b>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
