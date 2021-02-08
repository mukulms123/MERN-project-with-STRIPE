import React, {useState, useEffect} from "react";
import {addItemToCart} from "./helper/cartHelper";
import ImageHelper from "./helper/ImageHelper";
import {Redirect} from "react-router-dom";
import {removeItemFromCart} from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setReload = (f) => f, //function(f){return f}//
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "5";

  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <div class="d-grid gap-2 py-2">
          <button
            onClick={addToCart}
            className="btn btn-block btn-outline-success mt-2 mb-2"
          >
            Add to Cart
          </button>
        </div>
      )
    );
  };

  const showRemoveToCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <div class="d-grid gap-2 py-2">
          <button
            onClick={() => {
              removeItemFromCart(product._id);
              setReload(!reload);
            }}
            className="btn btn-block btn-outline-danger mt-2 mb-2"
            type="button"
          >
            Remove from cart
          </button>
        </div>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getRedirect(redirect)}
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveToCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
