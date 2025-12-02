import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonBadge,
  IonAvatar,
  IonText
} from '@ionic/react';
import { thumbsUpOutline, thumbsDownOutline, chatbubbleOutline, trashOutline } from 'ionicons/icons';
import { addLike, removeLike, deletePost } from "../../actions/post";
import UserAvatar from "react-user-avatar";

const PostItem = ({
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

  return (
    <IonCard>
      <IonCardHeader>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link to={`/profile/${user}`}>
            <IonAvatar>
              <UserAvatar size="50" name={name || "User"} src={src || undefined} />
            </IonAvatar>
          </Link>
          <div>
            <Link to={`/profile/${user}`}>
              <IonCardTitle>{name}</IonCardTitle>
            </Link>
            <IonText color="medium">
              <small>
                {moment(date).format('YYYY/MM/DD')}
              </small>
            </IonText>
          </div>
        </div>
      </IonCardHeader>

      <IonCardContent>
        {title && <h3>{title}</h3>}
        <p>{text}</p>
        {blobURL && <audio src={blobURL} controls style={{ width: '100%' }} />}

        {showActions && (
          <div className="action-buttons">
            <IonButton
              fill="outline"
              size="small"
              onClick={() => addLike(_id)}
            >
              <IonIcon icon={thumbsUpOutline} slot="start" />
              {likes.length > 0 && <IonBadge color="primary">{likes.length}</IonBadge>}
            </IonButton>
            
            <IonButton
              fill="outline"
              size="small"
              onClick={() => removeLike(_id)}
            >
              <IonIcon icon={thumbsDownOutline} />
            </IonButton>
            
            <Link to={`/posts/${_id}`}>
              <IonButton fill="outline" size="small">
                <IonIcon icon={chatbubbleOutline} slot="start" />
                {comments.length > 0 && <IonBadge color="secondary">{comments.length}</IonBadge>}
              </IonButton>
            </Link>
            
            {!auth.loading && user === auth.user._id && (
              <IonButton
                color="danger"
                size="small"
                onClick={() => deletePost(_id)}
              >
                <IonIcon icon={trashOutline} />
              </IonButton>
            )}
          </div>
        )}
      </IonCardContent>
    </IonCard>
  );
};

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
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
  PostItem
);
