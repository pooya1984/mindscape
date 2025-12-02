import React, { Fragment } from "react";
import UserAvatar from "react-user-avatar";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonAvatar,
  IonImg
} from '@ionic/react';
import { logOutOutline, bookOutline, createOutline } from 'ionicons/icons';
import { logout } from "../../actions/auth";
import logo from "../../img/mindnav.png";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  let src = "";
  try {
    src = require(`../../img/profilePics/${user?._id}.png`);
  } catch (error) {
    src = "";
  }

  const authLinks = (
    <Fragment>
      <IonButtons slot="start">
        <Link to="/tabs/profile">
          <div className="avatar-glow">
            <IonAvatar style={{ width: '36px', height: '36px' }}>
              <UserAvatar size="36" name={user?.name || "User"} src={src || undefined} />
            </IonAvatar>
          </div>
        </Link>
      </IonButtons>
      
      <IonTitle>
        <IonImg src={logo} style={{ height: '36px', width: 'auto' }} />
      </IonTitle>

      <IonButtons slot="end">
        <Link to="/tabs/home">
          <IonButton fill="clear">
            <IonIcon icon={bookOutline} />
          </IonButton>
        </Link>
        <Link to="/tabs/post">
          <IonButton fill="clear">
            <IonIcon icon={createOutline} />
          </IonButton>
        </Link>
        <IonButton onClick={logout} fill="clear">
          <IonIcon icon={logOutOutline} />
        </IonButton>
      </IonButtons>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <IonTitle>
        <IonImg src={logo} style={{ height: '40px', width: 'auto' }} />
      </IonTitle>
      <IonButtons slot="end">
        <IonButton color="light">Sign In</IonButton>
      </IonButtons>
    </Fragment>
  );

  return (
    <IonHeader>
      <IonToolbar>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </IonToolbar>
    </IonHeader>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
