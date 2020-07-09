import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Navbar from "../../components/layout/Navbar";
import FollowerTop from "./FollowerTop";
import { getCurrentProfile } from "../../actions/profile";

const Follower = ({
  getCurrentProfile,
  profile: { profile, loading },
  match,
}) => {
  useEffect(() => {
    getCurrentProfile(match.params.id);
  }, [getCurrentProfile, match.params.id]);

  // console.log(followers);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Fragment>
          <Spinner />
          <div style={{ textAlign: "center" }}>There is no followers yet</div>
        </Fragment>
      ) : (
        <Fragment>
          <Navbar />

          <div style={{ textAlign: "center" }} className="d-flex my-1">
            {profile.followers.map((follow) => (
              <FollowerTop
                key={profile.followers}
                follow={follow}
                profileId={profile.id}
              />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Follower.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Follower);
