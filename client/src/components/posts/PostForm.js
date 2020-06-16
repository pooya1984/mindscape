import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import MicRecorder from "mic-recorder-to-mp3";
import Navbar from "../layout/Navbar";
// import PostAudio from "./PostAudio";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const PostForm = ({ addPost, post: { posts, loading }, match }) => {
  const [formData, setFormData] = useState({
    text: "",
    title: "",
    isRecording: false,
    blobURL: "",
    isBlocked: false,
  });
  // const [audio, setAudio] = useState({
  //   isRecording: false,
  //   blobURL: "",
  //   isBlocked: false,
  // });

  const { isRecording, blobURL, isBlocked, title, text } = formData;

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
        // this.setState((this.crt.style.crtDisplay = "block"));
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
  }, [loading, addPost]);

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
    // setAudio({
    //   isRecording: false,
    //   blobURL: "hfher",
    //   isBlocked: false,
    // });
  };

  // const { title, text } = formData;

  return (
    <Fragment>
      <Navbar />
      {/* <div className="post-form-title">
        <h1>Free your Mind</h1>
      </div> */}
      <div className="post-form">
        <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
          <button
            class="btn btn-outline-success"
            onClick={start}
            disabled={isRecording}
          >
            Record
          </button>
          <button
            class="btn btn-outline-danger"
            onClick={stop}
            disabled={!isRecording}
          >
            Stop
          </button>
          {/* <audio
          src={blobURL}
          controls="controls"
        /> */}
          {/* <textarea
            className="form-control"
            name="title"
            cols="5"
            rows="1"
            placeholder="Title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          /> */}
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

// import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { addPost } from "../../actions/post";

// const PostForm = ({ addPost }) => {
//   const [text, setText] = useState("");

//   return (
//     <div className="post-form">
//       <div className="bg-primary p">
//         <h3>Say Something...</h3>
//       </div>
//       <form
//         className="form my-1"
//         onSubmit={e => {
//           e.preventDefault();
//           addPost({ text });
//           setText("");
//         }}
//       >
//         <textarea
//           name="text"
//           cols="30"
//           rows="5"
//           placeholder="Create a post"
//           value={text}
//           onChange={e => setText(e.target.value)}
//           required
//         />
//         <input type="submit" className="btn btn-dark my-1" value="Submit" />
//       </form>
//     </div>
//   );
// };

// PostForm.propTypes = {
//   addPost: PropTypes.func.isRequired
// };

// export default connect(null, { addPost })(PostForm);
