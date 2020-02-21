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

      {profile !== null ? (
        <Fragment>
          <div className="m-5 border border-info border-top-0 border-left-0 border-right-0 ">
            <section className="m-5 p-5 d-flex  justify-content-around">
              <img
                src={profile.user.avatar}
                className="rounded img-thumbnail p-2"
                alt="profile-picture"
              />{" "}
              <div className="d-column">
                <p>{profile.user.name}</p>
                <p>{profile.status}</p>
              </div>
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
          </div>
          {/* <Link to={`/dashboardPost/${_id}`} className="btn btn-primary">
            View posts
          </Link> */}
        </Fragment>
      ) : (
        <Fragment>
          <Alert />
          <p className="lead p-4">Welcom {user && user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <CreateProfile />
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
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, {
  setAlert,
  getCurrentProfile,
  deleteAccount
})(Dashboard);
