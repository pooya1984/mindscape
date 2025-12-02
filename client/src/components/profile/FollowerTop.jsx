import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFollower } from "../../actions/profile";
import UserAvatar from "react-user-avatar";

const FollowerTop = ({
  profile: { profile },
  follow: { name, location, user, _id },
  addFollower,
}) => {
  let src = "";
  try {
    src = require(`../../img/profilePics/${user._id}.png`);
  } catch (error) {
    src = "";
  }

  const profileId = profile._id;
  const userId = profile.user._id;
  const profileLocation = profile.location;
  const profileName = profile.user.name;

  const [followerData, setFollowerData] = useState({
    location,
    name,
    userId,
    _id,
  });

  console.log(profileId);

  const followHandler = () => {
    addFollower(profileId, followerData);
  };

  return (
    <div className="follower-top">
      <div className="d-flex">
        <UserAvatar size="50" name={name || "User"} src={src || undefined} />
        <div className="d-flex flex-column">
          <p>{name}</p>
          <p>{location}</p>
        </div>
      </div>

      <button
        className="btn btn-sm btn-outline-success"
        onClick={followHandler}
      >
        accept
      </button>
      {/* <div className="icons my-1">
        {social && social.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter fa-2x" />
          </a>
        )}
        {social && social.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook fa-2x" />
          </a>
        )}
        {social && social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin fa-2x" />
          </a>
        )}
        {social && social.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-youtube fa-2x" />
          </a>
        )}
        {social && social.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        )}
      </div> */}
    </div>
  );
};

FollowerTop.propTypes = {
  addFollower: PropTypes.func.isRequired,
  followers: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { addFollower })(FollowerTop);
