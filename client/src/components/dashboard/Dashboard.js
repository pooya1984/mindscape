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
import UploadPic from "../profile-forms/UploadPic";
import Alert from "../layout/Alert";
import DashboardPost from "../post/DashboardPost";
import CreateProfile from "../profile-forms/CreateProfile";

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  post: { posts },
  auth: { user },
  match,
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile(match.params.id);
  }, [getCurrentProfile, match.params.id]);

  let src = "";
  const srcf = async () => {
    try {
      src = require(`../../img/profilePics/${user._id}.png`);
    } catch (error) {
      src = "";
    }
  };
  srcf();

  const [show, setShow] = useState(false);
  const [showPic, setShowPic] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClosePic = () => setShowPic(false);
  const handleShowPic = () => setShowPic(true);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Navbar />
      {profile !== null ? (
        <Fragment>
          <div className="m-5 border border-secondary border-top-0 border-left-0 border-right-0 ">
            <section className="m-5 p-3 d-flex justify-content-around">
              {/* Profile Picture */}
              <UserAvatar
                className="profile-pic"
                size="200"
                name={user && user.name}
                src={src}
              />
              {/* Change Profile picture */}
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
                {/* Setting menu */}
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
                <i className="fab fa-teamspeak postForm"></i>
              </Link>
            </section>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="m-5 dashboard-welcome border border-secondary border-top-0 border-left-0 border-right-0 ">
            <UserAvatar
              className="welcome-pic"
              size="200"
              name={user && user.name}
              src={src}
            />
            <i
              variant="primary"
              onClick={handleShowPic}
              className="fa fa-camera upload-pic-new"
            ></i>
            <Modal show={showPic} onHide={handleClosePic}>
              <Modal.Header closeButton>
                <Modal.Title>Change your profile picture</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <UploadPic />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePic}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
            <div className=" welcome-text">
              <p>Welcom {user && user.name}</p>
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
                <div
                  type="button"
                  onClick={handleShow}
                  className="btn btn-outline-success btn-sm"
                >
                  CreateProfile
                </div>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Create your Profile</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <CreateProfile />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </Fragment>
      )}
      {/* create user posts */}
      <Fragment>
        {posts.map((post) => (
          <DashboardPost key={post._id} post={post} />
        ))}{" "}
      </Fragment>{" "}
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
