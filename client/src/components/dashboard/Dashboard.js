import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Navbar from "../../components/layout/Navbar";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import CreateProfile from "../profile-forms/CreateProfile";
import Posts from "../posts/Posts";
import Alert from "../layout/Alert";
import DashboardPost from "../post/DashboardPost";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: {
    // user: { _id },
    profile,
    loading
  }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <div className="d-flex">
        <p className="lead p-4">
          {/* <img
              src={user.avatar}
              className="rounded img-thumbnail p-2"
              alt="profile-picture"
            /> */}
          Welcom {user && user.name}
        </p>
      </div>
      {profile !== null ? (
        <Fragment>
          <section className="d-flex  justify-content-around">
            <i class="fa fa-cog dropdown ">
              <div
                class=" dropdown-toggle"
                id="navbardrop"
                data-toggle="dropdown"
              ></div>
              <div class="dropdown-menu border-0">
                <DashboardActions />
                <div className="my-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => deleteAccount()}
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </i>
          </section>
          <div>
            <p>{profile.user.name}</p>
            <img
              src={profile.user.avatar}
              className="rounded img-thumbnail p-2"
              alt="profile-picture"
            />{" "}
            <p>{profile.status}</p>
          </div>
          {/* <Link to={`/dashboardPost/${_id}`} className="btn btn-primary">
            View posts
          </Link> */}
        </Fragment>
      ) : (
        <Fragment>
          <Alert />
          <p>You have not yet setup a profile, please add some info</p>
          {/* <CreateProfile /> */}
        </Fragment>
      )}

      {/* <Posts /> */}
      {/* TODO: create user posts */}
      <DashboardPost />
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  setAlert,
  getCurrentProfile,
  deleteAccount
})(Dashboard);
