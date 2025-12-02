import React from "react";
import { IonSpinner, IonContent } from '@ionic/react';

const Spinner = () => {
  return (
    <IonContent className="ion-padding">
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%' 
      }}>
        <IonSpinner name="crescent" style={{ width: '100px', height: '100px' }} />
      </div>
    </IonContent>
  );
};

export default Spinner;
