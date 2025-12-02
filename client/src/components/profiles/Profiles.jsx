import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  IonContent,
  IonText,
  IonList
} from '@ionic/react';
import Spinner from "../layout/Spinner";
import Navbar from "../../components/layout/Navbar";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <Fragment>
      <Navbar />
      {loading ? (
        <Spinner />
      ) : (
        <IonContent className="ion-padding">
          <div style={{ marginBottom: '20px' }}>
            <h1 style={{ fontWeight: 700, fontSize: '28px', margin: '0 0 8px 0' }}>Community</h1>
            <IonText color="medium">
              <p style={{ margin: 0 }}>Connect with other users in the community</p>
            </IonText>
          </div>
          <IonList style={{ background: 'transparent' }}>
            {profiles && profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <IonText className="ion-text-center">
                <h4>No profiles found...</h4>
              </IonText>
            )}
          </IonList>
        </IonContent>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
