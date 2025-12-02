import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IonContent,
  IonButton,
  IonTextarea,
  IonCard,
  IonCardContent
} from '@ionic/react';
import { addPost } from "../../actions/post";
import Navbar from "../layout/Navbar";

const PostForm = ({ addPost, post: { posts, loading } }) => {
  const { id } = useParams();
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  
  const [formData, setFormData] = useState({
    text: "",
    title: "",
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });

  const { isRecording, isBlocked, text } = formData;

  useEffect(() => {
    // Check microphone permission
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        setFormData(prev => ({ ...prev, isBlocked: false }));
        stream.getTracks().forEach(track => track.stop());
      })
      .catch(() => {
        setFormData(prev => ({ ...prev, isBlocked: true }));
      });
  }, []);

  const start = async () => {
    if (isBlocked) {
      console.log("Permission Denied");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const blobURL = URL.createObjectURL(blob);
        setFormData(prev => ({ ...prev, blobURL, isRecording: false }));
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setFormData(prev => ({ ...prev, isRecording: true }));
    } catch (e) {
      console.error('Error starting recording:', e);
    }
  };

  const stop = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  useEffect(() => {
    if (id) {
      addPost(id);
    }
    setFormData({
      text: "",
      title: "",
      blobURL: "",
    });
  }, [loading, addPost, id]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  const onSubmit = (e) => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      text: "",
      title: "",
      blobURL: "",
    });
  };

  return (
    <Fragment>
      <Navbar />
      <IonContent className="ion-padding">
        <IonCard className="glass-panel">
          <IonCardContent>
            <h2 style={{ marginTop: 0, fontWeight: 700 }}>Create a Post</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="ion-margin-bottom" style={{ display: 'flex', gap: '8px' }}>
                <IonButton
                  fill="solid"
                  color="success"
                  onClick={start}
                  disabled={isRecording}
                  expand="block"
                >
                  🎤 Record
                </IonButton>
                <IonButton
                  fill="solid"
                  color="danger"
                  onClick={stop}
                  disabled={!isRecording}
                  expand="block"
                >
                  ⏹️ Stop
                </IonButton>
              </div>
              
              <IonTextarea
                className="glass-input"
                name="text"
                rows={8}
                placeholder="What's on your mind? Share your thoughts..."
                value={text}
                onIonChange={(e) => onChange(e)}
                required
                style={{
                  '--padding-top': '16px',
                  '--padding-bottom': '16px',
                  fontSize: '16px'
                }}
              />

              <IonButton 
                expand="block" 
                type="submit"
                color="primary"
                className="ion-margin-top"
                size="large"
                style={{ fontWeight: 700 }}
              >
                Post
              </IonButton>
            </form>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </Fragment>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { addPost })(PostForm);
