import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addFollower } from "../../actions/profile";
import UserAvatar from "react-user-avatar";

const ProfileTop = ({
  auth,
  profile: { status, location, social, loading, user, _id },
  addFollower,
}) => {
  let src = "";
  const srcf = async () => {
    try {
      src = require(`../../img/profilePics/${user._id}.png`);
    } catch (error) {
      src = "";
    }
  };
  srcf();

  const name = user.name;
  const profileId = _id;
  const userId = user._id;

  const [followerData, setFollowerData] = useState({
    status,
    location,
    social,
    name,
    userId,
    _id,
  });

  console.log(profileId);

  // TODO:make action and reducer for followerData
  // useEffect(() => {
  //   addFollower(followerData);

  //   setFollowerData({
  //     status,
  //     location,
  //     social,
  //     name,
  //   });
  // }, [loading, addFollower]);

  // console.log(addFollower);

  const followHandler = () => {
    addFollower(profileId, followerData);
    setFollowerData({
      status,
      location,
      social,
      name,
      userId,
      _id,
    });
  };

  return (
    <div className="xxx">
      <div className="profile-top p-2">
        <UserAvatar size="200" name={name && name} src={src} />
        <h1 className="large">{name}</h1>
        <p className="lead">{status}</p>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
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
            <a
              href={social.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x" />
            </a>
          )}
        </div>
        {/* follower button */}
        {userId === auth.user._id ? (
          ""
        ) : (
          <button className="btn btn-outline-success" onClick={followHandler}>
            Follow
          </button>
        )}
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  addFollower: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addFollower })(ProfileTop);
