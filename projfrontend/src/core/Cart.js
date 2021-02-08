import React, {useEffect, useState} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {loadCart} from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  const loadAllProducts = () => {
    return (
      <div>
        <h2 className="text-white">This section is to load products</h2>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setReload={setReload}
              reload={reload}
            />
          );
        })}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div className="">
        <h2 className="text-white">This section is to load products</h2>
      </div>
    );
  };

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  return (
    <Base title="Cart Page" description="Ready to checkout!">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts()}</div>
        <div className="col-6">
          <StripeCheckout products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart;
