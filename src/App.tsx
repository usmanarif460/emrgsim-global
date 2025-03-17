import { useEffect, useState } from "react";

import {
  Switch,
  Route,
  Redirect,
  useHistory,
  withRouter,
  useLocation,
} from "react-router-dom";

import "./App.scss";

import Home from "./containers/Home";
import Verification from "./containers/Verification";
import DataPlans from "./containers/DataPlans";
import Cart from "./containers/Cart";
import Purchase from "./containers/Purchase";
import EID from "./containers/EID";
import Product from "./types/product";
import User from "./types/user";
import Kenya from "./containers/Kenya";
import Profile from "./containers/Profile";
import Ad from "./containers/Ad";
import Passport from "./containers/Passport";
import TermsAndConditions from "./containers/TermsAndConditions";
import Thanks from "./containers/Thanks";
import Agent from "./containers/Agent";
import AgentScan from "./containers/AgentScan";
import AgentVerify from "./containers/AgentVerify";

function App() {
  const history = useHistory();
  const location = useLocation();
  const [verification, setVerification] = useState(0);
  const [enableBackArrow, setEnableBackArrow] = useState(false);
  const [eid, setEID] = useState("");
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState<Product>({
    id: "NRMshvhs7EjyYdn-2obO7bu_7NzAeNmGWhTvX8_CYVo=",
    name: "string",
    sim_types: ["ESIM"],
    duration: 1,
    duration_unit: "DAYS",
    data: 1,
    data_unit: "GB",
    price: 20,
    price_currency: "$",
    footprint_code: "string",
  });
  const [user, setUser] = useState<User>({
    firstName: "",
    lastName: "",
    eVisa: "",
    email: "",
  });

  // useEffect(() => {
  //     if (user && user.email && location.pathname === '/purchase') {
  //         history.push('/eid')
  //     }
  // })
  //
  // useEffect(() => {
  //     if (product != null && history.location.pathname === '/data-plans') {
  //         history.push('/cart')
  //     }
  // }, [product])
  //
  // useEffect(() => {
  //     if (verification && history.location.pathname === '/verification') {
  //         history.push('/data-plans')
  //     }
  // }, [verification])
  //
  // useEffect(() => {
  //     if (user == null || user.firstName === '' || user.lastName === '' || user.eVisa === '') {
  //         return
  //     }
  //     if (history.location.pathname === '/' || history.location.pathname === '' || history.location.pathname === '/kenya') {
  //         history.push('/verification')
  //     }
  //     return
  // }, [user])
  //
  // useEffect(() => {
  //     if (eid != '' && history.location.pathname === '/eid') {
  //         history.push('/activate')
  //     }
  // }, [eid])

  console.log(product);
  return (
    <div className="App">
      {enableBackArrow ? (
        <div className="nav-back" onClick={() => history.goBack()}>
          &larr;
        </div>
      ) : null}
      <div>
        <Switch>
          <Route path="/" exact>
            <Kenya ad={() => history.push("/ad")} />
          </Route>
          <Route path="/agent">
            <Kenya ad={() => history.push("/agent-login")} />
          </Route>
          <Route path="/agent-login">
            <Agent login={() => history.push("/agent-scan")} />
          </Route>
          <Route path="/agent-scan">
            <AgentScan next={() => history.push("/agent-verify")} />
          </Route>
          <Route path="/agent-verify">
            <AgentVerify next={() => history.push("/agent-scan")} />
          </Route>
          <Route path="/ad">
            <Ad createAccount={() => history.push("/create-account")} />
          </Route>

          <Route path="/create-account">
            <Home
              disableBack={() => setEnableBackArrow(false)}
              onNext={() => history.push("/verification")}
            />
          </Route>

          <Route path="/verification">
            <Verification
              enableBack={() => setEnableBackArrow(true)}
              setVerificationNumber={() =>
                history.push("/terms-and-conditions")
              }
            />
          </Route>
          <Route path="/data-plans">
            <DataPlans
              enableBack={() => setEnableBackArrow(true)}
              onPlanSelection={(product) => {
                console.log(product);
                setProduct(product);
                setProductId(product.id);
                history.push("/verification");
              }}
            />
          </Route>

          <Route path="/terms-and-conditions">
            <TermsAndConditions next={() => history.push("/purchase")} />
          </Route>
          <Route path="/purchase">
            <Purchase
              product={{
                ...product,
                id: productId,
              }}
              enabledBack={() => setEnableBackArrow(true)}
              user={user}
              onPurchase={(email: string) => history.push("/eid")}
            />
          </Route>
          <Route path="/eid">
            <EID
              disableBack={() => setEnableBackArrow(false)}
              onContinue={(eid: string) => {
                setEID(eid);
                history.push("/thanks");
              }}
              user={user}
              product={{ ...product }}
              viewPlan={() => {}}
              dontSubmit
            />
          </Route>
          <Route path="/thanks">
            <Thanks
              eid={eid}
              pId={product.id}
              product={{
                ...product,
                id: productId,
              }}
              next={() => history.push("/plan")}
            />
          </Route>
          <Route path="/plan">
            <Profile />
          </Route>
          <Redirect from="*" to="/" />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(App);
