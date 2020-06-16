import React from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../img/mindscape.png";
import Login from "../auth/Login";
import Alert from "../layout/Alert";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <img className="logo" src={logo} />
      <div className="light-overlay">
        <div className="landing-inner">
          <Alert />
          <Login />
          <p className=" m-1">Don't have an account?</p>
          <Link to="/register" className="btn btn-outline-success">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Landing;
