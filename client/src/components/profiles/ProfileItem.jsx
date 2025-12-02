import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonText
} from '@ionic/react';
import UserAvatar from "react-user-avatar";

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    location,
  },
}) => {
  return (
    <IonItem lines="none" style={{ marginBottom: '8px' }}>
      <div className="avatar-glow" slot="start">
        <IonAvatar>
          <UserAvatar size="56" name={name || "User"} src={avatar || undefined} />
        </IonAvatar>
      </div>
      <IonLabel>
        <h2 style={{ fontWeight: 700 }}>{name}</h2>
        <IonText color="medium">
          <p>{status}</p>
        </IonText>
        {location && (
          <IonText color="medium">
            <p>{location}</p>
          </IonText>
        )}
      </IonLabel>
      <Link to={`/profile/${_id}`}>
        <IonButton fill="solid" size="small">
          View
        </IonButton>
      </Link>
    </IonItem>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
