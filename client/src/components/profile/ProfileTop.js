import React, { useState } from "react";
import PropTypes from "prop-types";
import UserAvatar from "react-user-avatar";

const ProfileTop = ({
  profile: {
    status,
    location,
    social,
    user: { name, avatar, _id },
  },
}) => {
  let src = "";
  const srcf = async () => {
    try {
      src = require(`../../img/profilePics/${_id}.png`);
    } catch (error) {
      src = src;
    }
  };
  srcf();

  const followHandler = (e) => ({});

  return (
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
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram fa-2x" />
          </a>
        )}
      </div>
      <button
        className="btn btn-outline-success"
        followHandler={(e) => followHandler(e)}
      >
        Follow
      </button>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;
