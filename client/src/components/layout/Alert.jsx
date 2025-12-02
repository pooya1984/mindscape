import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { IonAlert } from '@ionic/react';

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <IonAlert
      key={alert.id}
      isOpen={true}
      header={alert.alertType === 'danger' ? 'Error' : 'Success'}
      message={alert.msg}
      buttons={['OK']}
      cssClass={`alert-${alert.alertType}`}
    />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
