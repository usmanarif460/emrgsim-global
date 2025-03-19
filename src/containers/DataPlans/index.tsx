import { useEffect, useRef, useState } from "react";
import selfe from "../../assets/saudi/selfe.png";
import "./index.scss";
import cellPhone from "../../assets/saudi/group-1.png";

import { international } from "../../language";
import common from "../../language/english/common.json";
import Product from "../../types/product";
import { ImSpinner9 } from "react-icons/im";
import Header from "../PlansHeader";

type ProductResponse = {
  data: Array<Product>;
  _metadata: {
    page: number;
  };
};

const productsMeta = [
  {
    data: 1,
    data_unit: "GB",
    duration: 3,
    duration_unit: "days",
    price: 6,
  },
  {
    data: 3,
    data_unit: "GB",
    duration: 14,
    duration_unit: "days",
    price: 12,
  },
  {
    data: 5,
    data_unit: "GB",
    duration: 14,
    duration_unit: "days",
    price: 20,
  },
];

type Props = {
  enableBack: () => void;
  onPlanSelection: (product: Product) => void;
};

const DataPlans = ({ enableBack, onPlanSelection }: Props) => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: "69YtBXSZ2pP1jm1aR3Qo0A5g7LbudFBShHmFR2f02qo=",
      name: "100MB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 30,
      duration_unit: "DAYS",
      data: 100,
      data_unit: "MB",
      price: 4.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
    {
      id: "cZWNW5REQrA__CXY2s9THXDJTZylapEe9KMAp7RN53g=",
      name: "75MB 7-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 7,
      duration_unit: "DAYS",
      data: 75,
      data_unit: "MB",
      price: 3.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
    {
      id: "J8asuny_AuWm8lceTwnARK1b3hS_hsZ7CkyAQFECbok=",
      name: "50MB 1-Day - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 1,
      duration_unit: "DAYS",
      data: 50,
      data_unit: "MB",
      price: 4.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
  ]);

  const [page, setPage] = useState<number>(1);
  const [scrollBottom, setScrollBottom] = useState<number | null>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const [fetchingProducts, setFetchingProducts] = useState<boolean>(false);
  const [productIndex, setProductIndex] = useState<number>(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = international(common.EmrgMobile);
    enableBack();
  }, []);

  useEffect(() => {
    if (scrollBottom != null && scrollBottom <= window.innerHeight + 200) {
      // fetchData(page);
    }
  }, [scrollBottom]);

  return (
    <div className="DataPlans">
      {products.length === 0 && (
        <div className="activating">
          <div>
            <div className="spinner">
              <ImSpinner9 />
            </div>
            <h1>Loading...</h1>
          </div>
        </div>
      )}
      <Header />

      <div
        className="content-area-large"
        ref={productRef}
        onScroll={() => {
          if (productRef.current) {
            setScrollBottom(productRef.current.getBoundingClientRect().bottom);
          }
        }}
      >
        <div className="heading-header">
          <h2>Select a data plan</h2>
        </div>
        <div className="products">
          {products.slice(0, 3).map((prod, i) => {
            return (
              <div
                key={prod.id}
                className={
                  productIndex === i
                    ? "product product-selected"
                    : "product product-not-selected"
                }
                onClick={() => setProductIndex(i)}
              >
                <div className="input">
                  <input
                    type="radio"
                    checked={productIndex === i}
                    className="hidden"
                    onChange={(ev) => {
                      if (ev.target.checked) {
                        setProductIndex(i);
                      }
                    }}
                  />
                  <div
                    className={
                      productIndex === i ? "radio-selected" : "radio-default"
                    }
                  >
                    <div></div>
                  </div>
                </div>
                <div className="data-area">
                  <p className="data">
                    {prod.data}
                    {prod.data_unit}
                  </p>
                  <p className="dur">
                    {prod.duration} {prod.duration_unit}
                  </p>
                </div>
                <p className="cost">${prod.price}</p>
              </div>
            );
          })}
        </div>
        <div className="submit">
          <button
            type="button"
            disabled={productIndex === -1}
            onClick={() => {
              onPlanSelection(products[productIndex]);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataPlans;
