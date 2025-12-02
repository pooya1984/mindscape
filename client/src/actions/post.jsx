import api from "../utils/api";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await api.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error loading posts' },
    });
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/api/posts/like/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error updating like' },
    });
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const res = await api.put(`/api/posts/unlike/${id}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error removing like' },
    });
  }
};

// Delete post
export const deletePost = (id) => async (dispatch) => {
  try {
    await api.delete(`/api/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error deleting post' },
    });
  }
};

// Add post
export const addPost = (formData, audio) => async (dispatch) => {
  try {
    const res = await api.post("/api/posts", { ...formData, audio });

    dispatch({
      type: ADD_POST,
      payload: res,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error creating post' },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error loading post' },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/api/posts/comment/${postId}`, formData);

    dispatch({
      type: ADD_COMMENT,
      payload: res,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error adding comment' },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    await api.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error deleting comment' },
    });
  }
};

// Get post by ID
export const getPostById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/api/posts/user/${userId}`);

    dispatch({
      type: GET_POST,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error loading user posts' },
    });
  }
};

// Get current users posts
export const getCurrentPost = () => async (dispatch) => {
  try {
    const res = await api.get("/api/posts/me");

    dispatch({
      type: GET_POST,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.message || 'Error loading your posts' },
    });
  }
};
