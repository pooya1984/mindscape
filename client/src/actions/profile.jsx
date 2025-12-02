import api from "../utils/api";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ADD_FOLLOWER,
  ACCOUNT_DELETED,
  ADD_FOLLOWERS,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await api.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message || 'Error loading profile' },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await api.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message || 'Error loading profiles' },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await api.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message || 'Error loading profile' },
    });
  }
};

// Create or update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const res = await api.post("/api/profile", formData);

    dispatch({
      type: GET_PROFILE,
      payload: res,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errorMsg = err.message || 'Error saving profile';
    
    if (errorMsg.includes('errors')) {
      dispatch(setAlert(errorMsg, "danger"));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: errorMsg },
    });
  }
};

// // Add follower
export const addFollower = (profileId, formData) => async (dispatch) => {
  try {
    const res = await api.post(`/api/profile/follower/${formData}`, formData);

    dispatch({
      type: ADD_FOLLOWER,
      payload: res,
    });

    dispatch(setAlert("success"));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.message || 'Error adding follower' },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT be undone!")) {
    try {
      await api.delete("/api/profile");

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert("Your account has been permanantly deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.message || 'Error deleting account' },
      });
    }
  }
};
