import React, { useState, useEffect } from "react";
import { Form, Modal, Button, Image } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import JoinRequest from "./JoinRequest";

function JoinModal(props) {
  const [joinRequests, setJoinRequests] = useState([]);
  const s = sessionStorage.getItem("state");
  const ustate = JSON.parse(s);

  const joinSchema = Yup.object()
    .shape({
      message: Yup.string().required("Message Required"),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(joinSchema),
  });
  const sendJoinRequest = (data) => {
    axios.defaults.headers.post["Authorization"] = `Bearer ${ustate?.token}`;
    let rjson = {
      message: data.message,
    };
    axios
      .post(`/${props.orgID}/join`, rjson)
      .then((response) => {
        console.log(response);
        props.setrequeststatus(true);
        props.setshow(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const displayInputs = () => {
    return (
      <Modal.Body>
        <Form.Label>Join message: </Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          {...register("message")}
          placeholder={"message"}
        />
        <p className="error-message">{errors.message?.message}</p>
      </Modal.Body>
    );
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/user`)
      .then((response) => {
        setJoinRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = () => {
    props.setshow(false);
  };
  return (
    <>
      {props.type === "Join" ? (
        <Modal
          show={props.show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Send join request</Modal.Title>
          </Modal.Header>
          {displayInputs()}
          <Modal.Footer>
            <Button variant="primary" onClick={handleSubmit(sendJoinRequest)}>
              Send Join Request
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <Modal
          show={props.show}
          onHide={handleClose}
          backdrop="static"
          scrollable={true}
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Join Requests:</Modal.Title>
          </Modal.Header>

          <Modal.Body className="Requests-wrapper">
            {joinRequests.map((request, i) => (
              <JoinRequest
                key={i}
                name={request.name}
                email={request.email}
                message="Hey really interested in joining your org!"
                image="/defaultProfile.png"
              />
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default JoinModal;
