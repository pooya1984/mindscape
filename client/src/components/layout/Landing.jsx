import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  IonContent,
  IonImg,
  IonText,
  IonButton
} from '@ionic/react';
import logo from "../../img/mindscape.png";
import Login from "../auth/Login";
import Alert from "../layout/Alert";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/tabs/home" />;
  }
  return (
    <IonContent className="ion-padding" style={{ '--background': 'linear-gradient(135deg, #f0f5ff 0%, rgba(17, 133, 254, 0.1) 100%)' }}>
      <div className="ion-text-center" style={{ marginTop: '40px' }}>
        <IonImg src={logo} style={{ width: '300px', margin: '0 auto 20px' }} />
        <h1 style={{ fontWeight: 700, fontSize: '32px', margin: '0 0 8px 0' }}>Welcome to MindScape</h1>
        <IonText color="medium">
          <p style={{ fontSize: '16px' }}>Share your thoughts and connect with others</p>
        </IonText>
      </div>
      <Alert />
      <Login />
      <div className="ion-text-center ion-margin-top">
        <IonText>Don't have an account?</IonText>
        <Link to="/register">
          <IonButton fill="solid" color="primary" className="ion-margin-top" expand="block" size="large">
            Sign Up
          </IonButton>
        </Link>
      </div>
    </IonContent>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
