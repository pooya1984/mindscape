import React, { Fragment, useEffect, useState } from "react";
import UserAvatar from "react-user-avatar";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Navbar from "../../components/layout/Navbar";
import { getCurrentProfile, deleteAccount } from "../../actions/profile";
import { setAlert } from "../../actions/alert";
import CreateProfile from "../profile-forms/CreateProfile";
import UploadPic from "../profile-forms/UploadPic";
import DashboardPosts from "../posts/DashboardPosts";
import Alert from "../layout/Alert";
import DashboardPost from "../post/DashboardPost";
// import profilePic from "../../img/";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  post: { posts },
  auth: { user, avatar },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let src = "";
  const srcf = async () => {
    try {
      src = require(`../../img/profilePics/${user._id}.png`);
    } catch (error) {
      src = src;
    }
  };
  srcf();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      {profile !== null ? (
        <Fragment>
          <div className="m-5 border border-info border-top-0 border-left-0 border-right-0 ">
            <section className="m-5 p-3 d-flex justify-content-around">
              <UserAvatar
                className="profile-pic"
                size="200"
                name={user && user.name}
                src={src}
              />
              {/* <Link className="upload-pic" to="/upload-pic"> */}
              <i
                variant="primary"
                onClick={handleShow}
                className="fa fa-camera upload-pic-update"
              ></i>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Change your profile picture</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <UploadPic />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
              {/* </Link> */}
              <div className="dashboard-info">
                <div className="d-column">
                  <p>{profile.user.name}</p>
                  <p>{profile.status}</p>
                  <p>{profile.location}</p>
                  <div className="icons">
                    {profile.social && profile.social.twitter && (
                      <a
                        href={profile.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter fa-2x p-2" />
                      </a>
                    )}
                    {profile.social && profile.social.facebook && (
                      <a
                        href={profile.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook fa-2x p-2" />
                      </a>
                    )}
                    {profile.social && profile.social.youtube && (
                      <a
                        href={profile.social.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-youtube fa-2x p-2" />
                      </a>
                    )}
                    {profile.social && profile.social.instagram && (
                      <a
                        href={profile.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-instagram fa-2x p-2" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <i className="fa fa-cog dropdown ">
                <div
                  className=" dropdown-toggle"
                  id="navbardrop"
                  data-toggle="dropdown"
                ></div>
                <div className="dropdown-menu border-0 bg-dark">
                  <DashboardActions />{" "}
                  <div className="my-2">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteAccount()}
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </i>
              <Link to="/post-form" type="button">
                <i class="fab fa-teamspeak postForm"></i>
              </Link>
            </section>
          </div>
          {/* <Link to={`/dashboardPost/${_id}`} className="btn btn-primary">
            View posts
          </Link> */}
        </Fragment>
      ) : (
        <Fragment>
          <Alert />
          <p className="lead p-4">Welcom {user && user.name}</p>
          <p>You have not yet setup a profile, please add some info</p>
          <div className="my-2">
            <button
              type="button"
              className="btn btn-outline-danger btn-sm"
              onClick={() => deleteAccount()}
            >
              Delete Account
            </button>
          </div>
          <div>
            <Link to={`/create-profile`}>
              <h4 className="text-secondary">CreateProfile</h4>
            </Link>
          </div>
        </Fragment>
      )}
      {/* TODO: create user posts */}
      <Fragment>
        {posts.map((post) => (
          <DashboardPost key={post._id} post={post} />
        ))}{" "}
      </Fragment>{" "}
      {/* <DashboardPost /> */}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  post: state.post,
});

export default connect(mapStateToProps, {
  setAlert,
  getCurrentProfile,
  deleteAccount,
})(Dashboard);
