import {
  ADD_FOLLOWERS,
  GET_FOLLOWERS,
  FOLLOWERS_ERROR,
  // TODO:make REMOVE_FOLLOWER
  // REMOVE_FOLLOWERS
} from "../actions/types";

const initialState = {
  followers: [],
  follower: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: payload,
        loading: false,
      };
    case ADD_FOLLOWERS:
      return {
        ...state,
        followers: [payload, ...state.followers],
        loading: false,
      };
    case FOLLOWERS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
