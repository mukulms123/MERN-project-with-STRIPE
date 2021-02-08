import React, {useEffect, useState} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth/helper";
import {deleteProduct, getProducts} from "./helper/adminapicall";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const {user, token} = isAuthenticated();

  const preload = () => {
    getProducts().then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisProduct = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.err) {
        console.log(data.err);
      } else {
        preload(data);
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage products here">
      <Link className="btn btn-info my-4" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <h2 className=" text-white mb-4">All products:</h2>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total 3 products</h2>

          {products.map((product, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{product.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/${product._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      deleteThisProduct(product._id, user._id, token);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageProducts;
