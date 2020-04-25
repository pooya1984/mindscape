import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
// import ProfileTop from "./ProfileTop";
// import ProfileAbout from "./ProfileAbout";
import { getPostById } from "../../actions/post";
import PostItem from "../posts/PostItem";

const DashboardPost = ({
  getPostById,
  post: { posts, loading },
  // auth,
  match,
}) => {
  useEffect(() => {
    getPostById();
  }, [getPostById]);

  return (
    <Fragment>
      {posts === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="profile-grid my-1">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
            {/* <ProfileAbout profile={profile} /> */}
            <div className="profile-exp bg-white p-2"></div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

DashboardPost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  // auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  // auth: state.auth,
});

export default connect(mapStateToProps, { getPostById })(DashboardPost);
