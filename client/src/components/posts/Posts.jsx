import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/react';
import { add } from 'ionicons/icons';
import Spinner from "../layout/Spinner";
import Navbar from "../../components/layout/Navbar";
import PostItem from "./PostItem";
import { getPosts } from "../../actions/post";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      <IonContent className="ion-padding">
        <div className="posts">
          {posts && Array.isArray(posts) && posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
        
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <Link to="/post-form">
            <IonFabButton>
              <IonIcon icon={add} />
            </IonFabButton>
          </Link>
        </IonFab>
      </IonContent>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
