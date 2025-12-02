import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonText,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonList
} from '@ionic/react';
import { logoTwitter, logoFacebook, logoYoutube, logoInstagram, personOutline, shareOutline } from 'ionicons/icons';
import { createProfile, getCurrentProfile } from "../../actions/profile";

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
}) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    location: "",
    status: "",
    twitter: "",
    facebook: "",
    youtube: "",
    instagram: "",
  });

  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    getCurrentProfile([getCurrentProfile]);

    setFormData({
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]);

  const { location, status, twitter, facebook, youtube, instagram } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <IonHeader>
        <IonToolbar style={{
          '--background': 'rgba(10, 25, 41, 0.95)',
          backdropFilter: 'blur(40px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/tabs/profile" />
          </IonButtons>
          <IonTitle>Edit Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent style={{
        '--background': 'rgba(10, 25, 41, 0.98)',
        backdropFilter: 'blur(50px)',
        position: 'relative',
        zIndex: 1000
      }}>
        <div className="ion-padding">
          {/* Segment Tabs */}
          <IonSegment 
          value={activeTab} 
          onIonChange={e => setActiveTab(e.detail.value)}
          style={{
            marginBottom: '20px'
          }}
        >
          <IonSegmentButton value="profile">
            <IonIcon icon={personOutline} />
            <IonLabel>Profile Info</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="social">
            <IonIcon icon={shareOutline} />
            <IonLabel>Social Links</IonLabel>
          </IonSegmentButton>
          </IonSegment>

          <form onSubmit={(e) => onSubmit(e)}>
            {/* Profile Info Tab */}
            {activeTab === 'profile' && (
            <div>
              <IonText>
                <h3>Profile Information</h3>
              </IonText>
              
              <IonList style={{ background: 'transparent' }}>
                <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
                  <IonLabel position="floating">Status</IonLabel>
                  <IonInput
                    type="text"
                    name="status"
                    value={status}
                    onIonChange={(e) => onChange(e)}
                  />
                </IonItem>

                <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
                  <IonLabel position="floating">Location</IonLabel>
                  <IonInput
                    type="text"
                    name="location"
                    value={location}
                    onIonChange={(e) => onChange(e)}
                  />
                </IonItem>
                <IonText color="medium">
                  <p style={{ fontSize: '12px', marginTop: '-8px', marginBottom: '16px', paddingLeft: '16px' }}>
                    City & state suggested (eg. Boston, MA)
                  </p>
                </IonText>
              </IonList>
              </div>
            )}

            {/* Social Links Tab */}
            {activeTab === 'social' && (
            <div>
              <IonText>
                <h3>Social Network Links</h3>
              </IonText>
              
              <IonList style={{ background: 'transparent' }}>
                <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
                  <IonIcon icon={logoTwitter} slot="start" color="primary" />
                  <IonLabel position="floating">Twitter URL</IonLabel>
                  <IonInput
                    type="text"
                    name="twitter"
                    value={twitter}
                    onIonChange={(e) => onChange(e)}
                  />
                </IonItem>

                <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
                  <IonIcon icon={logoFacebook} slot="start" color="primary" />
                  <IonLabel position="floating">Facebook URL</IonLabel>
                  <IonInput
                    type="text"
                    name="facebook"
                    value={facebook}
                    onIonChange={(e) => onChange(e)}
                  />
                </IonItem>

                <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
                  <IonIcon icon={logoYoutube} slot="start" color="danger" />
                  <IonLabel position="floating">YouTube URL</IonLabel>
                  <IonInput
                    type="text"
                    name="youtube"
                    value={youtube}
                    onIonChange={(e) => onChange(e)}
                  />
                </IonItem>

                <IonItem lines="none" className="glass-input" style={{ marginBottom: '16px' }}>
                  <IonIcon icon={logoInstagram} slot="start" color="secondary" />
                  <IonLabel position="floating">Instagram URL</IonLabel>
                  <IonInput
                    type="text"
                    name="instagram"
                    value={instagram}
                    onIonChange={(e) => onChange(e)}
                  />
                </IonItem>
              </IonList>
              </div>
            )}

            {/* Save Button - Always visible */}
            <div style={{ paddingTop: '20px' }}>
            <IonButton 
              expand="block" 
              type="submit"
              color="primary"
              style={{ fontWeight: 700 }}
              size="large"
            >
              Save Changes
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  EditProfile
);
