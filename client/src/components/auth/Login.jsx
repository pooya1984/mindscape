import React, { Fragment, useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton 
} from '@ionic/react';
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/tabs/home" />;
  }

  return (
    <form className="form" onSubmit={(e) => onSubmit(e)} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
        <IonLabel position="floating" style={{ fontWeight: 600 }}>Email Address</IonLabel>
        <IonInput
          type="email"
          name="email"
          value={email}
          onIonChange={(e) => onchange(e)}
        />
      </IonItem>
      <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
        <IonLabel position="floating" style={{ fontWeight: 600 }}>Password</IonLabel>
        <IonInput
          type="password"
          name="password"
          value={password}
          onIonChange={(e) => onchange(e)}
          minlength={6}
        />
      </IonItem>
      <IonButton 
        expand="block" 
        type="submit"
        color="primary"
        className="ion-margin-top"
        size="large"
        style={{ fontWeight: 700 }}
      >
        Sign In
      </IonButton>
    </form>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
