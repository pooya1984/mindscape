// import React, { Fragment, useEffect } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import Spinner from "../layout/Spinner";
// import Navbar from "../../components/layout/Navbar";
// import ProfileTop from "./ProfileTop";
// import PostItem from "../posts/PostItem";
// import { getPostById } from "../../actions/post";

// const Profile = ({ post: { posts , loading } }) => {
//   return (
//     <Fragment>
//       {posts === null || loading ? (
//         <Spinner />
//       ) : (
//         <Fragment>
//           <Navbar />
//           <div className="posts">
//             {posts.map((post) => (
//               <PostItem key={post._id} post={post} />
//             ))}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// Profile.propTypes = {
//   getPostById: PropTypes.func.isRequired,
//   profile: PropTypes.object.isRequired,
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   post: state.post,
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { getPostById })(Profile);

// Befor
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Navbar from "../../components/layout/Navbar";
import ProfileTop from "./ProfileTop";
import { getProfileById } from "../../actions/profile";
import PostItem from "../posts/PostItem";
import { post } from "request";
import ProfilePosts from "../posts/ProfilePosts";

const Profile = ({
  getProfileById,
  profile: { profile, loading },
  post: { posts },
  auth,
  match,
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  // const [follow, setFollow] = useState({
  //   location: "",
  //   name: "",
  // });

  // const { location } = follow;

  // const followHandler = (e) =>
  //   setFollow({ ...follow, [profile.location]: profile.location });
  // console.log("follow", location);

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Navbar />

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
          </div>
        </Fragment>
      )}

      {/* <button
        className="btn btn-outline-success"
        followHandler={(e) => followHandler(e)}
      >
        Follow
      </button> */}
      {/* <Fragment>
        {posts.map((post) => (
          <ProfilePosts key={post._id} post={post} />
        ))}{" "}
      </Fragment> */}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  post: state.post,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
