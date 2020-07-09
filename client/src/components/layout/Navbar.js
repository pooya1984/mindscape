import React, { Fragment } from "react";
import UserAvatar from "react-user-avatar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import logo from "../../img/mindnav.png";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  let src = "";
  const srcf = async () => {
    try {
      src = require(`../../img/profilePics/${user._id}.png`);
    } catch (error) {
      src = "";
    }
  };
  srcf();

  const authLinks = (
    <Fragment>
      <Fragment>
        <Link to="/dashboard">
          <UserAvatar size="50" name={user && user.name} src={src} />
        </Link>
      </Fragment>
      <li className="nav-item">
        <Link to="/posts">
          <i className="fas fa-swatchbook"></i>{" "}
          <span className="hide-sm"></span>
        </Link>
      </li>

      {/* <!-- Collapse button --> */}
      <button
        className="navbar-toggler toggler-example"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent1"
        aria-controls="navbarSupportedContent1"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="light-text">
          <i className="fas fa-bars fa-1x"></i>
        </span>
      </button>

      {/* <!-- Collapsible content --> */}
      <div className="collapse navbar-collapse" id="navbarSupportedContent1">
        {/* <!-- Links --> */}
        <ul className="navbar-nav col mr-auto">
          <li className="nav-item">
            <Link to={`/follower/${user && user._id}`}>
              <i className="fab fa-mendeley"></i>{" "}
              <span className="hide-sm"></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/post-form">
              <i className="fab fa-teamspeak"></i>{" "}
              <span className="hide-sm"></span>
            </Link>
          </li>
          <li className="nav-item">
            <a onClick={logout} href="/">
              <i className="fas fa-power-off"></i>
              <span className="hide-sm"></span>
            </a>
          </li>
        </ul>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <div className="guestLinks">
      <div style={{ color: "white" }}>Sign In</div>
    </div>
  );

  return (
    <nav className="navbar ">
      <div className="navbar-header navbar-brand">
        <img alt="mindscape" src={logo} />
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
