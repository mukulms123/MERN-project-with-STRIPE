import React, {useEffect, useState} from "react";
import Base from "../core/Base";
import {getCategories} from "./helper/adminapicall";
import {Link} from "react-router-dom";

const ManageCategories = () => {
  const [values, setValues] = useState({categories: [], error: ""});

  const {categories, error} = values;

  const preload = () => {
    getCategories().then((data) => {
      if (data.err) {
        setValues({...values, error: data.err});
      } else {
        console.log(data);
        setValues({...values, categories: data});
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <Base title="Welcome admin" description="Manage products here">
      <h2 className="mb-4">All Categories:</h2>
      <Link className="btn btn-info" to={`/admin/dashboard`}>
        <span className="">Admin Home</span>
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">Total Categories</h2>
          {categories.map((category, index) => {
            return (
              <div className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left" key={index}>
                    {" "}
                    {category.name}
                  </h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success"
                    to={`/admin/product/update/productId`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button onClick={() => {}} className="btn btn-danger">
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

export default ManageCategories;
