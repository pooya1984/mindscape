import React from "react";
import MicRecorder from "mic-recorder-to-mp3";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
// const crtDisplay = {
//   display: "none",
// };

class PostAudio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
    };
  }

  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true });
        })
        .catch((e) => console.error(e));
    }
  };

  stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
        this.setState((this.crt.style.crtDisplay = "block"));
      })

      .catch((e) => console.log(e));
  };

  // componentDidMount() {
  //   navigator.getUserMedia({ audio: true },
  //     () => {
  //       console.log('Permission Granted');
  //       this.setState({ isBlocked: false });
  //     },
  //     () => {
  //       console.log('Permission Denied');
  //       this.setState({ isBlocked: true })
  //     },
  //   );
  // }

  render() {
    console.log("blobURL", this.state.blobURL);

    return (
      <div className="App">
        <header className="App-header">
          <button onClick={this.start} disabled={this.state.isRecording}>
            Record
          </button>
          <button onClick={this.stop} disabled={!this.state.isRecording}>
            Stop
          </button>
          <audio
            src={this.state.blobURL}
            controls="controls"
            ref={(ctr) => (this.ctr = ctr)}
            // style={crtDisplay}
          />
        </header>
      </div>
    );
  }
}

export default PostAudio;
