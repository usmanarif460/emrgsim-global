import { useEffect, useState } from "react";
import { international } from "../../language";

import creditCard from "../../assets/kenya/kaa/credit-card.png";
import paypal from "../../assets/kenya/kaa/paypal.png";
import applePay from "../../assets/kenya/kaa/apple-pay.png";
import googlePay from "../../assets/kenya/kaa/google-pay.png";

import "./index.scss";
import common from "../../language/english/common.json";
import Product from "../../types/product";
import Header from "../HeaderSmall";

type User = {
  firstName: string;
  lastName: string;
};

type Props = {
  enabledBack: () => void;
  product: Product;
  user: User;
  onPurchase: (email: string) => void;
};

const Purchase = (props: Props) => {
  useEffect(() => {
    document.title = international(common.EmrgMobile);
    props.enabledBack();
    window.scrollTo(0, 0);
  }, []);

  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: "credit-card",
      label: "Credit Card",
      img: creditCard,
      disabled: false,
    },
    { id: "paypal", label: "PayPal", img: paypal, disabled: true },
    { id: "apple-pay", label: "Apple Pay", img: applePay, disabled: true },
    { id: "google-pay", label: "Google Pay", img: googlePay, disabled: true },
  ];

  return (
    <div className="Purchase">
      <Header />
      <div className="content-area-large">
        <h1 className="heading mb-6">Payment</h1>
        <h2>Cart Summary</h2>
        <div className="product">
          <div className="bi-display">
            <p className="data">
              {props.product.data}
              {props.product.data_unit}({props.product.duration}{" "}
              {props.product.duration_unit})
            </p>
            <p className="dur">${props.product.price}</p>
          </div>
          <div className="bi-display tax">
            <p className="data">Tax</p>
            <p className="dur">${(props.product.price * 0.15).toFixed(2)}</p>
          </div>
          <div className="bi-display total">
            <p className="data">Total</p>
            <p className="dur">${(props.product.price * 1.15).toFixed(2)}</p>
          </div>
        </div>
        <div className="payment">
          <h2>Select payment method</h2>
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`selection relative ${
                method.disabled ? "disabled" : ""
              } ${selectedPayment === method.id ? "selected" : ""}`}
            >
              <input
                type="radio"
                name="payment"
                value={method.id}
                disabled={method.disabled}
                hidden
                onChange={() => setSelectedPayment(method.id)}
              />
              <div
                className={`radio ${
                  selectedPayment === method.id
                    ? "radio-checked"
                    : "radio-unchecked"
                } mr-4`}
              >
                <div></div>
              </div>
              <img src={method.img} alt={method.label} />
              <p>{method.label}</p>
            </label>
          ))}
        </div>
        {selectedPayment === "credit-card" && (
          <form
            onSubmit={(ev) => {
              props.onPurchase("test@email.com");
              ev.preventDefault();
            }}
          >
            <div className="credit-card">
              <div className="info">
                <h3 className="text-primary">Card Number</h3>
                <input type="text" autoComplete="cc-number" required />
              </div>
              <div className="info">
                <h3 className="text-primary">Cardholder Name</h3>
                <input type="text" autoComplete="cc-name" required />
              </div>
              <div className="bi-display">
                <div className="info">
                  <h3 className="text-primary">Expiry Date</h3>
                  <input type="text" autoComplete="cc-exp" required />
                </div>
                <div className="info">
                  <h3 className="text-primary">CW/CVC</h3>
                  <input type="text" autoComplete="cc-csc" required />
                </div>
              </div>
              <div className="save">
                <input type="checkbox" />
                <p>Save card for future payments</p>
              </div>
              <div className="submit">
                <button type="submit">Submit Payment</button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Purchase;
