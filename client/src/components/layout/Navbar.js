import React, { Fragment } from "react";
import UserAvatar from "react-user-avatar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../img/mindscape.png";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  let src = "";
  const srcf = async () => {
    try {
      src = require(`../../img/profilePics/${user._id}.png`);
    } catch (error) {
      src = src;
    }
  };
  srcf();

  const authLinks = (
    <Fragment>
      <Fragment className="nav-profile">
        <Link to="/dashboard">
          <UserAvatar size="50" name={user && user.name} src={src} />
        </Link>
      </Fragment>

      {/* <!-- Collapse button --> */}
      <button
        class="navbar-toggler toggler-example"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="light-text">
          <i class="fas fa-bars fa-1x"></i>
        </span>
      </button>

      {/* <!-- Collapsible content --> */}
      <div class="collapse navbar-collapse" id="navbarSupportedContent1">
        {/* <!-- Links --> */}
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/posts">
              <i class="fab fa-mendeley"></i> <span className="hide-sm"></span>
            </Link>
          </li>
          <li className="nav-item">
            <a onClick={logout} href="/">
              <i class="fas fa-power-off danger"></i>
              <span className="hide-sm"></span>
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const guestLinks = <div className="guestLinks"></div>;

  return (
    <nav className="navbar ">
      <div class="navbar-header navbar-brand">
        <img alt="DUBLAJ" src={logo} />
      </div>
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
