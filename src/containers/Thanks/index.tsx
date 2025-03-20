import HeaderLarge from "../HeaderNew";

import logo from "../../assets/saudi/logo.webp";
import success from "../../assets/saudi/success.webp";
import circle from "../../assets/saudi/circle.webp";
import lines from "../../assets/saudi/lines.webp";

import cellPhone from "../../assets/saudi/group-1.webp";

import "./index.scss";

import barcode from "../../assets/barcode.png";
import Product from "../../types/product";
import { useEffect, useState } from "react";
import Header from "../../components/header";

type Props = {
  eid: string;
  product: Product;
  pId: string;
  next: () => void;
};

const Thanks = (props: Props) => {
  const [timeout, setTimeout] = useState<number>(-1);
  const sendEID = (bypass?: boolean) => {
    console.log(props.pId);
    console.log({
      product_id: props.product.id,
      device: {
        id: props.eid,
        eid: props.eid,
        operating_system: "ios",
        model: "iPhone",
      },
    });
    fetch("/api/activate_product", {
      method: "POST",
      body: JSON.stringify({
        email: "test@test.com",
        first_name: "firstname",
        last_name: "lastname",
        country_of_residence: "US",
        product_id: props.pId,
        device: {
          id: props.eid,
          eid: props.eid,
          operating_system: "ios",
          model: "iPhone",
        },
        bypass: bypass,
      }),
    })
      .then((resp) => {
        if (resp.status === 403) {
          throw Error("not ready");
        }
        return resp.json();
      })
      .then((data: { message: string }) => {
        if (data.message === "SUCCESS") {
          return;
        }

        console.warn(data.message);
        alert(`Unable to activate, please check your EID: ${data.message}`);
      })
      .catch((err: Error) => {
        if (err.message === "not ready") {
          setTimeout(timeout + 1);
          return;
        }
        console.warn(err);
        alert(
          `Unable to activate, please check your connection: ${err.message}`
        );
      });
  };

  useEffect(() => {
    sendEID();
  }, []);

  useEffect(() => {
    const t = window.setTimeout(sendEID, 1000);
    return () => {
      clearTimeout(t);
    };
  }, [timeout]);

  return (
    <div className="Thanks">
      <Header className="bg-primary centred">
        <img src={logo} alt="" height={86.47} width={80} />
      </Header>

      <div className="modal">
        <div className="dialog">
          <div className="thumbnail">
            <img src={success} alt="" className="phone" />
          </div>
          <div className="content">
            <h3 className="content-heading">Success</h3>
            <p className="content-description">
              Your eSIM is ready, Please click the link below to Instal it.
            </p>
            <button type="button" onClick={props.next}>
              Install eSIM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
