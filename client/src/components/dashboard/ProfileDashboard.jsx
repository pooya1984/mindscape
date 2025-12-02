import React, { Fragment, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonButton,
  IonAvatar,
  IonText,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonModal,
  IonSegment,
  IonSegmentButton
} from '@ionic/react';
import {
  settingsOutline,
  createOutline,
  trashOutline,
  mailOutline,
  locationOutline,
  briefcaseOutline,
  logoTwitter,
  logoFacebook,
  logoLinkedin,
  logoInstagram,
  peopleOutline,
  heartOutline,
  chatbubbleOutline,
  listOutline,
  close,
  cogOutline
} from 'ionicons/icons';
import UserAvatar from "react-user-avatar";
import moment from "moment";
import Spinner from "../layout/Spinner";
import Navbar from "../layout/Navbar";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { getPosts } from "../../actions/post";

const ProfileDashboard = ({
  getCurrentProfile,
  getPosts,
  deleteAccount,
  auth: { user, loading: authLoading },
  profile: { profile, loading: profileLoading },
  post: { posts, loading: postLoading }
}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTab, setModalTab] = useState('settings');

  useEffect(() => {
    getCurrentProfile();
    getPosts();
  }, [getCurrentProfile, getPosts]);

  let src = "";
  try {
    if (user) {
      src = require(`../../img/profilePics/${user._id}.png`);
    }
  } catch (error) {
    src = "";
  }

  if (profileLoading || authLoading) {
    return <Spinner />;
  }

  if (!profile) {
    return (
      <Fragment>
        <Navbar />
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Welcome {user?.name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonText>
                <p>You haven't set up a profile yet. Please create your profile to get started.</p>
              </IonText>
              <Link to="/tabs/create-profile">
                <IonButton expand="block" color="primary">
                  Create Profile
                </IonButton>
              </Link>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <IonContent>
        {/* Profile Header - Cover Style */}
        <div style={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(17, 133, 254, 0.3) 0%, rgba(29, 161, 242, 0.2) 100%)',
          padding: '80px 20px 20px',
          marginBottom: '-60px'
        }}>
          {/* Settings Icon */}
          <IonButton 
            fill="clear"
            onClick={() => setShowModal(true)}
            style={{ position: 'absolute', top: '16px', right: '16px' }}
          >
            <IonIcon icon={cogOutline} slot="icon-only" size="large" color="light" />
          </IonButton>
        </div>

        {/* Profile Section - No Card */}
        <div style={{ padding: '0 16px', marginBottom: '20px' }}>
          {/* Avatar and Name - Side by side */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginTop: '-50px' }}>
            <div className="avatar-glow">
              <IonAvatar style={{ width: '100px', height: '100px', border: '4px solid var(--ion-background-color)' }}>
                <UserAvatar size="100" name={user?.name || "User"} src={src || undefined} />
              </IonAvatar>
            </div>
            
            {/* Name and Status */}
            <div style={{ flex: 1, marginTop: '50px' }}>
              <IonText>
                <h2 style={{ margin: '4px 0', fontWeight: 700, fontSize: '24px' }}>{profile?.user?.name || user?.name}</h2>
              </IonText>
              <IonText color="medium">
                <p style={{ margin: '4px 0', fontSize: '14px' }}>@{user?.name?.toLowerCase().replace(/\s+/g, '-') || 'username'}</p>
              </IonText>
            </div>
          </div>

          {/* Bio/Status */}
          <div style={{ marginTop: '16px' }}>
            <IonText color="medium">
              <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IonIcon icon={briefcaseOutline} /> {profile.status}
              </p>
            </IonText>
            {profile.location && (
              <IonText color="medium">
                <p style={{ margin: '4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <IonIcon icon={locationOutline} /> {profile.location}
                </p>
              </IonText>
            )}
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '16px', marginRight: '4px' }}>{posts?.filter(p => p.user === user?._id).length || 0}</span>
              <IonText color="medium">
                <span style={{ fontSize: '14px' }}>Posts</span>
              </IonText>
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: '16px', marginRight: '4px' }}>0</span>
              <IonText color="medium">
                <span style={{ fontSize: '14px' }}>Followers</span>
              </IonText>
            </div>
            <div>
              <span style={{ fontWeight: 700, fontSize: '16px', marginRight: '4px' }}>0</span>
              <IonText color="medium">
                <span style={{ fontSize: '14px' }}>Following</span>
              </IonText>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Link to="/tabs/edit-profile" style={{ flex: 1 }}>
              <IonButton expand="block" fill="outline">
                Edit Profile
              </IonButton>
            </Link>
          </div>
        </div>

        {/* Tabs Section */}
        <div style={{ padding: '0 12px' }}>
          <IonSegment value="posts" style={{ marginBottom: '12px' }}>
            <IonSegmentButton value="posts">
              <IonLabel>Posts</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="replies">
              <IonLabel>Replies</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="media">
              <IonLabel>Media</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="likes">
              <IonLabel>Likes</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {/* Posts List */}
        <div className="ion-padding">
          <IonText>
            <h3>My Posts</h3>
          </IonText>
          
          {postLoading ? (
            <Spinner />
          ) : posts && posts.filter(p => p.user === user?._id).length > 0 ? (
            <IonList>
              {posts
                .filter(post => post.user === user?._id)
                .map((post) => (
                <IonCard key={post._id}>
                  <IonCardHeader>
                    <IonCardTitle>{post.title || "Post"}</IonCardTitle>
                    <IonText color="medium">
                      <small>{moment(post.date).format('YYYY/MM/DD')}</small>
                    </IonText>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonText>
                      <p>{post.text}</p>
                    </IonText>
                    <div className="ion-margin-top">
                      <IonBadge color="primary" className="ion-margin-end">
                        <IonIcon icon={heartOutline} /> {post.likes?.length || 0}
                      </IonBadge>
                      <IonBadge color="secondary">
                        <IonIcon icon={chatbubbleOutline} /> {post.comments?.length || 0}
                      </IonBadge>
                    </div>
                    <div className="ion-margin-top">
                      <Link to={`/tabs/posts/${post._id}`}>
                        <IonButton size="small" fill="outline">View</IonButton>
                      </Link>
                    </div>
                  </IonCardContent>
                </IonCard>
              ))}
            </IonList>
          ) : (
            <IonCard>
              <IonCardContent>
                <IonText className="ion-text-center">
                  <p>No posts yet. Start by creating a post!</p>
                </IonText>
                <Link to="/tabs/post">
                  <IonButton expand="block">Create Post</IonButton>
                </Link>
              </IonCardContent>
            </IonCard>
          )}
        </div>

        {/* Settings & Activity Modal */}
        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Settings & Activity</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          
          <IonContent>
            {/* Segment Tabs */}
            <IonSegment value={modalTab} onIonChange={e => setModalTab(e.detail.value)}>
              <IonSegmentButton value="settings">
                <IonIcon icon={settingsOutline} />
                <IonLabel>Settings</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="activity">
                <IonIcon icon={listOutline} />
                <IonLabel>Activity</IonLabel>
              </IonSegmentButton>
            </IonSegment>

            {/* Settings Tab */}
            {modalTab === 'settings' && (
              <div className="ion-padding">
                <IonText>
                  <h3>Profile Settings</h3>
                </IonText>
                
                <IonList>
                  <Link to="/tabs/edit-profile" style={{ textDecoration: 'none' }} onClick={() => setShowModal(false)}>
                    <IonItem button>
                      <IonIcon icon={createOutline} slot="start" />
                      <IonLabel>Edit Profile</IonLabel>
                    </IonItem>
                  </Link>

                  <Link to="/tabs/upload-pic" style={{ textDecoration: 'none' }} onClick={() => setShowModal(false)}>
                    <IonItem button>
                      <IonIcon icon={peopleOutline} slot="start" />
                      <IonLabel>Change Profile Picture</IonLabel>
                    </IonItem>
                  </Link>

                  <IonItem>
                    <IonIcon icon={mailOutline} slot="start" />
                    <IonLabel>
                      <h3>Email</h3>
                      <p>{user?.email}</p>
                    </IonLabel>
                  </IonItem>

                  <IonItem button lines="none" onClick={() => {
                    if (window.confirm('Are you sure? This cannot be undone!')) {
                      deleteAccount();
                      setShowModal(false);
                    }
                  }}>
                    <IonIcon icon={trashOutline} slot="start" color="danger" />
                    <IonLabel color="danger">Delete Account</IonLabel>
                  </IonItem>
                </IonList>

                {profile?.bio && (
                  <IonCard className="ion-margin-top">
                    <IonCardHeader>
                      <IonCardTitle>Bio</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>
                        <p>{profile.bio}</p>
                      </IonText>
                    </IonCardContent>
                  </IonCard>
                )}

                {profile?.skills && profile.skills.length > 0 && (
                  <IonCard className="ion-margin-top">
                    <IonCardHeader>
                      <IonCardTitle>Skills</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      {profile.skills.map((skill, index) => (
                        <IonBadge key={index} color="primary" className="ion-margin-end ion-margin-bottom">
                          {skill}
                        </IonBadge>
                      ))}
                    </IonCardContent>
                  </IonCard>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {modalTab === 'activity' && (
              <div className="ion-padding">
                <IonText>
                  <h3>Recent Activity</h3>
                </IonText>
                
                <IonList>
                  {/* Posts Activity */}
                  {posts && posts.filter(p => p.user === user?._id).map((post) => (
                    <IonItem key={`post-${post._id}`}>
                      <IonIcon icon={createOutline} slot="start" color="primary" />
                      <IonLabel>
                        <h3>Created a post</h3>
                        <p>{post.text?.substring(0, 50)}...</p>
                        <p>{moment(post.date).format('YYYY/MM/DD HH:mm')}</p>
                      </IonLabel>
                    </IonItem>
                  ))}

                  {/* Likes Activity */}
                  {posts && posts.flatMap(post => 
                    post.likes?.filter(like => like.user === user?._id).map(like => ({
                      postId: post._id,
                      postText: post.text,
                      date: post.date
                    }))
                  ).filter(Boolean).map((like, index) => (
                    <IonItem key={`like-${index}`}>
                      <IonIcon icon={heartOutline} slot="start" color="danger" />
                      <IonLabel>
                        <h3>Liked a post</h3>
                        <p>{like.postText?.substring(0, 50)}...</p>
                        <p>{moment(like.date).format('YYYY/MM/DD HH:mm')}</p>
                      </IonLabel>
                    </IonItem>
                  ))}

                  {/* Comments Activity */}
                  {posts && posts.flatMap(post => 
                    post.comments?.filter(comment => comment.user === user?._id).map(comment => ({
                      postId: post._id,
                      commentText: comment.text,
                      date: comment.date
                    }))
                  ).filter(Boolean).map((comment, index) => (
                    <IonItem key={`comment-${index}`}>
                      <IonIcon icon={chatbubbleOutline} slot="start" color="success" />
                      <IonLabel>
                        <h3>Commented on a post</h3>
                        <p>{comment.commentText?.substring(0, 50)}...</p>
                        <p>{moment(comment.date).format('YYYY/MM/DD HH:mm')}</p>
                      </IonLabel>
                    </IonItem>
                  ))}

                  {(!posts || posts.filter(p => p.user === user?._id).length === 0) && (
                    <IonItem>
                      <IonLabel className="ion-text-center">
                        <p>No activity yet</p>
                      </IonLabel>
                    </IonItem>
                  )}
                </IonList>
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </Fragment>
  );
};

ProfileDashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getPosts,
  deleteAccount,
})(ProfileDashboard);
