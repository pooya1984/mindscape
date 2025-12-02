import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import PostForm from "./components/posts/PostForm";
import Post from "./components/post/Post";
import DashboardPost from "./components/post/DashboardPost";
import PrivateRoute from "./components/routing/PrivateRoute";
import UploadPic from "./components/profile-forms/UploadPic";
import Follower from "./components/profile/Follower";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utills/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/follower/:id" element={<PrivateRoute component={Follower} />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/create-profile" element={<PrivateRoute component={CreateProfile} />} />
            <Route path="/edit-profile" element={<PrivateRoute component={EditProfile} />} />
            <Route path="/posts" element={<PrivateRoute component={Posts} />} />
            <Route path="/post-form" element={<PrivateRoute component={PostForm} />} />
            <Route path="/posts/:id" element={<PrivateRoute component={Post} />} />
            <Route path="/upload-pic" element={<PrivateRoute component={UploadPic} />} />
            <Route path="/dashboardPost/:id" element={<DashboardPost />} />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
