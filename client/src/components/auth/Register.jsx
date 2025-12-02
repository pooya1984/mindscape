import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton,
  IonImg,
  IonText 
} from '@ionic/react';
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import logo from "../../img/mindscape.png";
import Alert from "../layout/Alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const onchange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("password do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/tabs/home" />;
  }

  return (
    <IonContent className="ion-padding" style={{ '--background': 'linear-gradient(135deg, #f0f5ff 0%, rgba(17, 133, 254, 0.1) 100%)' }}>
      <div className="ion-text-center" style={{ marginTop: '20px' }}>
        <IonImg src={logo} style={{ width: '200px', margin: '0 auto 16px' }} />
        <h1 style={{ fontWeight: 700, fontSize: '28px', margin: '0 0 8px 0' }}>Create Account</h1>
        <IonText color="medium">
          <p>Join the community today</p>
        </IonText>
      </div>
      <Alert />
      <form className="form" onSubmit={(e) => onSubmit(e)} style={{ maxWidth: '500px', margin: '0 auto' }}>
        <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
          <IonLabel position="floating" style={{ fontWeight: 600 }}>Email</IonLabel>
          <IonInput
            type="email"
            name="email"
            value={email}
            onIonChange={(e) => onchange(e)}
          />
        </IonItem>
        <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
          <IonLabel position="floating" style={{ fontWeight: 600 }}>User Name</IonLabel>
          <IonInput
            type="text"
            name="name"
            value={name}
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
          />
        </IonItem>
        <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
          <IonLabel position="floating" style={{ fontWeight: 600 }}>Confirm Password</IonLabel>
          <IonInput
            type="password"
            name="password2"
            value={password2}
            onIonChange={(e) => onchange(e)}
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
          Create Account
        </IonButton>
        <div className="ion-text-center ion-margin-top">
          <IonText>Already have an account?</IonText>
          <Link to="/">
            <IonButton fill="clear" color="primary"
              style={{ textDecoration: 'underline' }}>
              Sign In
            </IonButton>
          </Link>
        </div>
      </form>
    </IonContent>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default connect(mapStateToProps, { setAlert, register })(Register);
