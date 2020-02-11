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
  post: { post, loading },
  auth: { user },
  match
}) => {
  useEffect(() => {
    getPostById();
  }, [getPostById]);

  return (
    <Fragment>
      {post === null || loading ? <Spinner /> : <Fragment>has</Fragment>}
    </Fragment>
  );
};

DashboardPost.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(mapStateToProps, { getPostById })(DashboardPost);
