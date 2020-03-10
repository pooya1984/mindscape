import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

import "./App.css";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        {/* <Navbar /> */}
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute
            exact
            path="/create-profile"
            component={CreateProfile}
          />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/post-form" component={PostForm} />
          <PrivateRoute exact path="/posts/:id" component={Post} />
          <PrivateRoute
            exact
            path="/dashboardPost/:id"
            component={DashboardPost}
          />
        </Switch>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
