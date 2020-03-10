import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

const PostForm = ({ addPost, post: { posts, loading }, match }) => {
  const [formData, setFormData] = useState({
    text: "",
    title: ""
  });

  useEffect(() => {
    addPost(match.params.id);

    setFormData({
      text: "",
      title: ""
    });
  }, [loading, addPost]);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    addPost(formData);
    setFormData({
      text: "",
      title: ""
    });
  };

  const { title, text } = formData;

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>ADD new Dublaj...</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <textarea
          name="title"
          cols="5"
          rows="1"
          placeholder="Title"
          value={title}
          onChange={e => onChange(e)}
          required
        />
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Description"
          value={text}
          onChange={e => onChange(e)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
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
