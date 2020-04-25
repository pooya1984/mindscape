import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../img/DUBLAJ-logo-bw.png";

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="far fa-address-card">
            {" "}
            <span className="hide-sm"></span>
          </i>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" /> <span className="hide-sm"></span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="fas fa-home" /> <span className="hide-sm"></span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm"></span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = <div className="guestLinks"></div>;

  return (
    <nav className="navbar bg-light">
      <Link to="/">
        <img className="nav-logo" alt="DUBLAJ" src={logo} />
      </Link>

      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
