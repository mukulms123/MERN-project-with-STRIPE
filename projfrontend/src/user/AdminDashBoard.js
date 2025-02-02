import React from "react";
import Base from "../core/Base";
import {isAuthenticated} from "../auth/helper/index";
import {Link} from "react-router-dom";

const AdminDashBoard = () => {
  const {
    user: {name, email},
  } = isAuthenticated();

  const adminLeft = () => {
    return (
      <div className="card">
        <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link to="/admin/create/category" className="nav-link text-success">
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/categories" className="nav-link text-success">
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/create/product" className="nav-link text-success">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/orders" className="nav-link text-success">
              Manage Orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link to="/admin/products" className="nav-link text-success">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminRight = () => {
    return (
      <div className="card mb-4">
        <h4 className="card-header">Admin Information</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-info mr-2 ">Name:</span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-info mr-2 ">Email:</span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-danger mr-2 ">Admin Area</span>
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Base
      title="Welcome to admin area"
      description="Manage all of your products here"
      className="container bg-success p-4"
    >
      <div className="row">
        <div className="col-3">{adminLeft()}</div>
        <div className="col-9">{adminRight()}</div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
