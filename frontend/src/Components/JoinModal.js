import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Modal, Button, Alert } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import JoinRequest from "./JoinRequest";
import { useMutation } from "react-query";

function JoinModal(props) {
  const [joinRequests, setJoinRequests] = useState([]);
  const [deleteRequest, setDeleteRequest] = useState("");
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

  const postJoinRequest = async (message) => {
    axios.defaults.headers.post["Authorization"] = `Bearer ${ustate?.token}`;
    return await axios.post(
      `http://localhost:8000/organization/${props.orgID}/join`,
      message,
      { headers: { "Content-Type": "text/plain" } }
    );
  };

  const handleSendJoinRequest = useMutation(
    (message) => postJoinRequest(message),
    {
      onSuccess: async () => {
        //TODO
      },
      // onError: async (error) => {
      // if (error.response.status === 404) {
      // console.log(error.response.data.detail)
      // }
      // }
    }
  );

  const onSubmission = (data) => {
    handleSendJoinRequest.mutate(data.message);
  };

  // const sendJoinRequest = (data) => {
  // axios.defaults.headers.post["Authorization"] = `Bearer ${ustate?.token}`;
  // axios
  // .post(`http://localhost:8000/organization/${props.orgID}/join`, data.message,{headers: {"Content-Type": "text/plain"}})
  // .then((response) => {
  // console.log(response);
  // props.setrequeststatus(true);
  // props.setshow(false);
  // })
  // .catch((error) => {
  // console.log(error);
  // });
  // };

  const displayInputs = () => {
    return (
      <Modal.Body>
        {handleSendJoinRequest.isError && (
          <Alert variant="danger">
            Member information not found. Click{" "}
            <Alert.Link as={Link} to="/UserProfile">
              here
            </Alert.Link>{" "}
            to create your member information
          </Alert>
        )}
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
    axios.defaults.headers.get["Authorization"] = `Bearer ${ustate?.token}`;
    axios
      .get(`http://localhost:8000/organization/${props.orgID}/request`)
      .then((response) => {
        setJoinRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
   if (deleteRequest !== "") {
    setJoinRequests(joinRequests.filter((request) => request.r_id !== deleteRequest))
    setDeleteRequest("")
    console.log("YAY")
   }
  }, [deleteRequest]);

  const handleClose = () => {
    props.setshow(false);
  };
  console.log(deleteRequest)

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
            <Button variant="primary" onClick={handleSubmit(onSubmission)}>
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
                o_id = {props.orgID}
                r_id = {request.r_id}
                token = {ustate.token}
                requestDeleted = {setDeleteRequest} 
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
