import React, {useState} from "react";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper/index";
// import {cartEmpty, loadCart} from "./helper/cartHelper";
import StripeCheckoutButton from "react-stripe-checkout";
import {API, PK} from "../backend";
import {cartEmpty} from "./helper/cartHelper";
// import {createOrder} from "./helper/orderHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  // const [data, setData] = useState({
  //   loading: false,
  //   success: false,
  //   error: "",
  //   address: "",
  // });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalPrice = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  const makePayment = (token) => {
    const body = {
      token,
      products,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(`${API}/stripepayment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showStripeButton = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey={PK}
        token={makePayment}
        amount={getFinalPrice() * 100}
        currency="INR"
        name="Buy Tshirts"
      >
        <button className="btn btn-success">Pay with Stripe</button>
      </StripeCheckoutButton>
    ) : (
      <Link className="btn btn-warning" to="/signin">
        Signup to Pay
      </Link>
    );
  };

  return (
    <div>
      <h3 className="text-white"> Stripe Checkout loaded {getFinalPrice()}</h3>
      {showStripeButton()}
    </div>
  );
};

export default StripeCheckout;
