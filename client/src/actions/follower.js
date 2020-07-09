import axios from "axios";
import { setAlert } from "./alert";
import { ADD_FOLLOWERS, GET_FOLLOWERS, FOLLOWERS_ERROR } from "./types";

// Get followers
export const getFollowers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/follower");

    dispatch({
      type: GET_FOLLOWERS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FOLLOWERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add followers
export const addFollower = (followerData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/follower", followerData, config);

    dispatch({
      type: ADD_FOLLOWERS,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: FOLLOWERS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
