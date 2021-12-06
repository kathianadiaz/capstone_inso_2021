import React from "react";
import {
  Button,
  Image,
  Spinner,
  Container,
  Form,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";

function MemberInfoModal(props) {
  const handleClose = () => {
    props.setShow(false);
  };

  const postMemberInformation = async (data) => {
    axios.defaults.headers.post["Authorization"] = `Bearer ${props.token}`;
    return await axios.post(
      `http://localhost:8000/user/member-information`,
      data
    );
  };

  const handlePostMemberInformation = useMutation(
    (data) => postMemberInformation(data),
    {
      onSuccess: async () => {
        handleClose();
      },
    }
  );

  const onSubmission = (data) => {
    console.log(data);
    let resume = data.resume;
    delete data.resume;
    data.links = [];
    handlePostMemberInformation.mutate(data);
  };

  const { register, handleSubmit } = useForm();

  return (
    <Modal show={props.show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Member Information</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name: </Form.Label>
            <Form.Control
              type="text"
              placeholder="john doe"
              {...register("name")}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              {...register("email")}
            />
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Resume</Form.Label>
            <Form.Control type="file" {...register("resume")} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            className="modal-accept-btn"
            variant="primary"
            onClick={handleSubmit(onSubmission)}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default MemberInfoModal;
