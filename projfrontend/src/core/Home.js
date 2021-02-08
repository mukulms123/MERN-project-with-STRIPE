import React, {useState, useEffect} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.err) {
        setError(data.err);
      }
      setProducts(data);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Tshirts page">
      <div className="row text-center">
        <h1 className="text-white">All of T-Shirts</h1>
        <div className="row">
          {products.map((product, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
