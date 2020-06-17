import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import EditProfile from "../profile-forms/EditProfile";

const DashboardActions = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <div
        type="button"
        onClick={handleShow}
        className="btn btn-outline-success btn-sm"
      >
        Edit Profile
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit your Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProfile />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DashboardActions;
