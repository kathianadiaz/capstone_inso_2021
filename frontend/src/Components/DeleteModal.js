import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function DeleteModal(props) {
  const s = sessionStorage.getItem("state");
  const token = JSON.parse(s);

  const deleteOrganization = () => {
    axios.defaults.headers.delete["Authorization"] = `Bearer ${token.token}`;
    axios
      .delete(`http://localhost:8000/organization/${props.orgID}`)
      .then((response) => {
        console.log(response);
        props.redirect(true);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .delete(`http://localhost:8000/organization/${props.orgID}/image`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    props.setshow(false);
  };
  return (
    <>
      <Modal
        show={props.show}
        backdrop="static"
        onHide={handleClose}
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this organization?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteOrganization}>
            Yes
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
