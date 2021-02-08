import React, {useState, useEffect} from "react";
import Base from "../core/Base";
import {Link} from "react-router-dom";
import {getProduct, updateProduct, getCategories} from "./helper/adminapicall";
import {isAuthenticated} from "../auth/helper/index";

const UpdateProduct = ({match}) => {
  const {user, token} = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: "false",
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    categories,
    category,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  const preloaded = (productId) => {
    getProduct(productId).then((data) => {
      if (data.err) {
        setValues({...values, error: data.err});
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category._id,
          stock: data.stock,
          formData: new FormData(),
        });
        preloadCategories();
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data) => {
      if (data.err) {
        setValues({...values, error: data.err});
      } else {
        setValues({categories: data, formData: new FormData()});
      }
    });
  };

  useEffect(() => {
    preloaded(match.params.productId);
  }, []);

  //TODO:
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: "", loading: true});
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.err) {
          setValues({...values, error: data.err});
        } else {
          setValues({
            ...values,
            name: "",
            photo: "",
            description: "",
            price: "",
            stock: "",
            loading: false,
            createdProduct: data.name,
          });
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({...values, [name]: value});
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{display: createdProduct ? "" : "none"}}
      >
        <h4>{createdProduct} was updated</h4>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger mt-3"
        style={{display: error ? "" : "none"}}
      >
        <h4>{error}</h4>
      </div>
    );
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group my-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group my-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option value={category}>Old</option>
          {categories &&
            categories.map((cate, index) => {
              return (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              );
            })}
        </select>
      </div>
      <div className="form-group my-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Add Product"
      description="Welcome to Prodcut creation section"
      className="container bg-info p-4"
    >
      {successMessage()}
      {errorMessage()}
      <Link className="btn btn-md btn-success mb-3" to="/admin/dashboard">
        Admin Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2 ">{createProductForm()}</div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
