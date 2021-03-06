import { combineReducers } from "redux";
import "bootstrap/dist/css/bootstrap.min.css";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";
import follower from "./follower";

export default combineReducers({ alert, auth, profile, post, follower });
