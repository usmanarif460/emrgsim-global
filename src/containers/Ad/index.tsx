import logo from "../../assets/saudi/logo.webp";
import sim from "../../assets/saudi/sim.svg";
import dollar from "../../assets/saudi/]dollar.svg";

import "./index.scss";
import Header from "../../components/header";
import ChoiceButton from "../../components/choice-button";
import { useHistory } from "react-router-dom";
import { useState } from "react";

type Props = {
  createAccount: () => void;
};

const Ad = (props: Props) => {
  const [selected, setSelected] = useState<null | "selected_1" | "selected_2">(
    null
  );
  const history = useHistory();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    history.push("data-plans");
  }
  return (
    <div className="container overflow-y-auto">
      <Header className="bg-primary centred">
        <img src={logo} alt="" height={86.47} width={80} />
      </Header>
      <div className="content ">
        <h1 className="heading-one mb-4">Cheap data bundles in minutes</h1>
        <p className="description mb-6">
          Get quick access to affordable data bundles and save on roaming!
        </p>
        <div className="buttons mb-8">
          <ChoiceButton
            vector={sim}
            heading="Get a new EmrgSIM"
            description="I’m new here and I’d like to get connected"
            onClick={() => setSelected("selected_1")}
            selected={selected === "selected_1"}
          />
          <ChoiceButton
            vector={dollar}
            heading="Top up data"
            description="I’m a regular and I need a little
top up on my data"
            onClick={() => setSelected("selected_2")}
            selected={selected === "selected_2"}
          />
        </div>
        {selected && (
          <form onSubmit={handleSubmit}>
            <p className="description mb-4">
              Enter your email address below and we’ll send you a link to top up
              your data
            </p>
            <div className="mb-10">
              <div className="question">
                <label htmlFor="firstName">First Name</label>
                <input name="first-name" id="firstName" required />
              </div>
              <div className="question">
                <label htmlFor="lastName">Last Name</label>
                <input name="last-name" id="lastName" required />
              </div>
              <div className="question">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="middle-name-optional"
                  type="email"
                  placeholder=""
                  required
                />
              </div>
              <div className="question">
                <label htmlFor="lastName">eVisa Application Number</label>
                <input name="last-name" id="lastName" required />
              </div>
            </div>
            <div className="centred">
              <button className="mx-auto" type="submit">
                Done
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Ad;
