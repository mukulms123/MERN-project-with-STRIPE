import React, {useState} from "react";
import Base from "../core/Base";
import {Redirect} from "react-router-dom";

import {signin, authenticate, isAuthenticated} from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    email: "mukul@gmail.com",
    password: "12345",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const {email, password, error, loading, didRedirect} = values;

  const {user} = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({...values, error: false, [name]: event.target.value});
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({...values, error: false, loading: true});
    signin({email, password})
      .then((data) => {
        if (data.err) {
          setValues({...values, error: data.err, loading: false});
        } else {
          authenticate(data, () => {
            setValues({...values, didRedirect: true});
          });
        }
      })
      .catch(console.log("Signin request failed"));
  };

  const performRedirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                value={email}
                className="form-control"
                type="text"
                onChange={handleChange("email")}
                name=""
                id=""
              />
            </div>
            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                value={password}
                className="form-control"
                type="password"
                onChange={handleChange("password")}
                name=""
                id=""
              />
            </div>
            <div class="d-grid gap-2 py-2">
              <button
                onClick={onSubmit}
                className="btn btn-success"
                type="button"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorsMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{display: error ? "" : "none"}}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin Page" description="This is a Signin page">
      {loadingMessage()}
      {errorsMessage()}
      {signInForm()}
      {performRedirect()}
    </Base>
  );
};

export default Signin;
