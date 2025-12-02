import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { 
  IonApp, 
  IonRouterOutlet, 
  IonTabs, 
  IonTabBar, 
  IonTabButton, 
  IonIcon, 
  IonLabel,
  setupIonicReact 
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home, person, create, people } from 'ionicons/icons';
import { Provider } from 'react-redux';
import store from './store';

// Components
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import ProfileDashboard from './components/dashboard/ProfileDashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import PostForm from './components/posts/PostForm';
import Post from './components/post/Post';
import DashboardPost from './components/post/DashboardPost';
import PrivateRoute from './components/routing/PrivateRoute';
import UploadPic from './components/profile-forms/UploadPic';
import Follower from './components/profile/Follower';

// Actions
import { loadUser } from './actions/auth';
import setAuthToken from './utills/setAuthToken';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/ionic-reset.css';
import './theme/variables.css';
import './theme/overrides.css';
import './styles/glassmorphism.css';

setupIonicReact({
  mode: 'md'
});

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App: React.FC = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Public Routes */}
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/home">
              <Redirect to="/tabs/home" />
            </Route>
            <Route path="/profiles">
              <Profiles />
            </Route>
            <Route path="/profile/:id">
              <Profile />
            </Route>

            {/* Tabs Routes */}
            <Route path="/tabs">
              <IonTabs>
                <IonRouterOutlet>
                  <Route exact path="/tabs/home">
                    <PrivateRoute component={Posts} />
                  </Route>
                  <Route exact path="/tabs/profile">
                    <PrivateRoute component={ProfileDashboard} />
                  </Route>
                  <Route exact path="/tabs/post">
                    <PrivateRoute component={PostForm} />
                  </Route>
                  <Route exact path="/tabs/community">
                    <PrivateRoute component={Profiles} />
                  </Route>
                  
                  {/* Other authenticated routes */}
                  <Route path="/tabs/follower/:id">
                    <PrivateRoute component={Follower} />
                  </Route>
                  <Route path="/tabs/dashboard">
                    <PrivateRoute component={ProfileDashboard} />
                  </Route>
                  <Route path="/tabs/create-profile">
                    <PrivateRoute component={CreateProfile} />
                  </Route>
                  <Route path="/tabs/edit-profile">
                    <PrivateRoute component={EditProfile} />
                  </Route>
                  <Route path="/tabs/posts">
                    <PrivateRoute component={Posts} />
                  </Route>
                  <Route path="/tabs/posts/:id">
                    <PrivateRoute component={Post} />
                  </Route>
                  <Route path="/tabs/upload-pic">
                    <PrivateRoute component={UploadPic} />
                  </Route>
                  <Route path="/tabs/dashboardPost/:id">
                    <DashboardPost />
                  </Route>
                  
                  <Route exact path="/tabs">
                    <Redirect to="/tabs/home" />
                  </Route>
                </IonRouterOutlet>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="home" href="/tabs/home">
                    <IonIcon icon={home} />
                    <IonLabel>Home</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="community" href="/tabs/community">
                    <IonIcon icon={people} />
                    <IonLabel>Community</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="post" href="/tabs/post">
                    <IonIcon icon={create} />
                    <IonLabel>Post</IonLabel>
                  </IonTabButton>

                  <IonTabButton tab="profile" href="/tabs/profile">
                    <IonIcon icon={person} />
                    <IonLabel>Profile</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              </IonTabs>
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
