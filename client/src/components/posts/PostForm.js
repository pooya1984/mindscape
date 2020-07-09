import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import MicRecorder from "mic-recorder-to-mp3";
import Navbar from "../layout/Navbar";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const PostForm = ({ addPost, post: { posts, loading }, match }) => {
  const [formData, setFormData] = useState({
    text: "",
    title: "",
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });

  const { isRecording, isBlocked, text } = formData;

  const start = () => {
    if (isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          setFormData({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        setFormData({ blobURL, isRecording: false });
      })

      .catch((e) => console.log(e));
  };

  useEffect(() => {
    addPost(match.params.id);

    setFormData({
      text: "",
      title: "",
      blobURL: "",
    });
  }, [loading, addPost, match.params.id]);

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
      <div className="post-form">
        <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
          <button
            className="btn btn-outline-success"
            onClick={start}
            disabled={isRecording}
          >
            Record
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={stop}
            disabled={!isRecording}
          >
            Stop
          </button>
          <textarea
            className="form-control border border-primary"
            name="text"
            cols="10"
            rows="5"
            placeholder="Free your Mind"
            value={text}
            onChange={(e) => onChange(e)}
            required
          />

          {/* TODO: it should be linked in posts component */}
          <div className="submit">
            <input
              type="submit"
              className="btn btn-outline-warning my-1"
              value="Submit"
            />
          </div>
        </form>
      </div>
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
