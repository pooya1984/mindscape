import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import UserAvatar from "react-user-avatar";

const ProfilePosts = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, title, name, blobURL, user, likes, comments, date },
  showActions,
}) => {
  let src = "";
  try {
    src = require(`../../img/profilePics/${user}.png`);
  } catch (error) {
    src = "";
  }
  
  return user === auth.user._id ? (
    <div className="post">
      <div>
        {/* posts picture */}
        <Link to={`/profile/${user}`}>
          <UserAvatar size="100" name={name || "User"} src={src || undefined} />

          <h4 className="text-secondary">{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">{title}</p>
        <p className="my-1">{text}</p>
        {blobURL && <audio src={blobURL} controls="controls" />}

        <p className="post-date">
          Posted on {moment(date).format('YYYY/MM/DD')}
        </p>

        {showActions && (
          <Fragment>
            <button
              onClick={() => addLike(_id)}
              type="button"
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-thumbs-up" />{" "}
              <span>{likes.length > 0 && <span>{likes.length}</span>}</span>
            </button>
            <button
              onClick={() => removeLike(_id)}
              type="button"
              className="btn btn-outline-secondary"
            >
              <i className="fas fa-thumbs-down" />
            </button>
            <Link to={`/posts/${_id}`} className="btn btn-outline-secondary">
              <i class="far fa-comments" />{" "}
              {comments.length > 0 && (
                <span className="comment-count">{comments.length}</span>
              )}
            </Link>
            {!auth.loading && user === auth.user._id && (
              <button
                onClick={() => deletePost(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
            )}
          </Fragment>
        )}
      </div>
      <div className="post-line"></div>
    </div>
  ) : (
    ""
  );
};

ProfilePosts.defaultProps = {
  showActions: true,
};

ProfilePosts.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  ProfilePosts
);
