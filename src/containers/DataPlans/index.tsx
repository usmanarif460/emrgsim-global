import { useEffect, useRef, useState } from "react";
import selfe from "../../assets/saudi/selfe.png";
import "./index.scss";
import cellPhone from "../../assets/saudi/group-1.png";

import { international } from "../../language";
import common from "../../language/english/common.json";
import Product from "../../types/product";
import { ImSpinner9 } from "react-icons/im";
import Header from "../PlansHeader";
import { useHistory } from "react-router-dom";

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

const DataPlans = (props: Props) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [page, setPage] = useState<number>(1);
  const [scrollBottom, setScrollBottom] = useState<number | null>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const [fetchingProducts, setFetchingProducts] = useState<boolean>(false);
  const [productIndex, setProductIndex] = useState<number>(-1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = international(common.EmrgMobile);
    props.enableBack();
    fetchData(page);
  }, []);

  useEffect(() => {
    if (scrollBottom != null && scrollBottom <= window.innerHeight + 200) {
      fetchData(page);
    }
  }, [scrollBottom]);

  function fetchData(page: number) {
    if (fetchingProducts) {
      return;
    }

    setFetchingProducts(true);

    fetch(`/api/products?page=${page}`)
      .then((res: Response) => {
        if (res.status < 200 || res.status >= 300) {
          throw new Error(`${res.status}`);
        }
        return res.json();
      })
      .then((resp: ProductResponse) => {
        if (!resp.data) {
          throw new Error(`no response data`);
        }

        let newProductsMap = new Map<string, Product>();
        let newProducts = [...products];
        products.forEach((product) => {
          newProductsMap.set(product.id, product);
        });

        let start = newProducts.length % productsMeta.length;
        resp.data.forEach((product, i) => {
          if (
            !newProductsMap.has(product.id) &&
            product.sim_types.includes("ESIM")
          ) {
            product.data = productsMeta[start].data;
            product.data_unit = productsMeta[start].data_unit;
            product.duration = productsMeta[start].duration;
            product.duration_unit = productsMeta[start].duration_unit;
            product.price = productsMeta[start].price;
            product.name = `${product.data} ${product.data_unit} ${product.duration}
                     ${product.duration_unit}`;
            newProductsMap.set(product.id, product);
            newProducts.push(product);
            start++;
            start = newProducts.length % productsMeta.length;
          }
        });
        setProducts(newProducts);
        setPage(resp._metadata.page + 1);
      })
      .catch((err) => {
        console.debug(err);
      })
      .finally(() => {
        setFetchingProducts(false);
      });
  }

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
          if (productRef != null && productRef.current != null) {
            setScrollBottom(productRef.current.getBoundingClientRect().bottom);
          }
        }}
      >
        <div className="heading-header">
          <h2>Select a data plan</h2>
        </div>
        <div className="products">
          {products.slice(0, 3).map((prod, i) => {
            const id = prod.id;
            const idx = i;
            const product = prod;
            return (
              <div
                key={id}
                className={
                  productIndex === i
                    ? "product product-selected"
                    : "product product-not-selected"
                }
                onClick={() => setProductIndex(idx)}
              >
                <div className="input">
                  <input
                    type="radio"
                    checked={productIndex === i}
                    className="hidden"
                    onChange={(ev) => {
                      if (ev.target.checked) {
                        setProductIndex(idx);
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
            onClick={(ev) => {
              props.onPlanSelection(products[productIndex]);
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
