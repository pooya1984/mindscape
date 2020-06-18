import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import logo from "../../img/mindscape.png";
import Alert from "../layout/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <section className="landing">
      <img className="logo" alt="DUBLAJ" src={logo} />
      <div className="light-overlay">
        <div className="landing-inner my-4">
          <Alert />
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                className="text-center lead"
                type="email"
                name="email"
                value={email}
                onChange={(e) => onchange(e)}
                placeholder="Enter your Email"
              />
              <input
                className="text-center lead"
                type="text"
                name="name"
                value={name}
                onChange={(e) => onchange(e)}
                placeholder="User name"
              />
              <input
                className="text-center lead"
                type="password"
                name="password"
                value={password}
                onChange={(e) => onchange(e)}
                placeholder="Password"
              />
              <input
                className="text-center lead"
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => onchange(e)}
                placeholder="Confirm Password"
              />
              <input
                type="submit"
                value="Register"
                className="btn p-3 btn-outline-success"
              />
            </div>
            <p className=" m-1">Already have an account?</p>
            <Link to="/" className="btn btn-outline-primary">
              Log In
            </Link>
          </form>
        </div>
      </div>
    </section>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
