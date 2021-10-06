import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ReactComponent as Add } from "./plus-box.svg";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const eventSchema = Yup.object()
  .shape({
    event: Yup.string().required("Event name required"),
    description: Yup.string().required("Description required"),
    date: Yup.date().required("Date required"),
  })
  .required();

const highlightSchema = Yup.object()
  .shape({
    award: Yup.string().required("Award name required"),
    highlight_description: Yup.string().required(
      "Highlight description required"
    ),
  })
  .required();

function EditModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //   const [eventdata, setEventData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      props.type === "Event" ? eventSchema : highlightSchema
    ),
  });

  const getEventdata = (data) => {
    // setEventData([...eventdata, data]);
    // console.log(JSON.stringify(data, null, 2));
    // console.log(eventdata);
    sendModalData([...props.mdata, data]);
    setShow(false);
  };

  const sendModalData = (data) => {
    props.setdata(data);
  };

  const displayInputs = () => {
    if (props.type === "Event") {
      return (
        <Modal.Body>
          <Form.Label>{props.type} name: </Form.Label>

          <Form.Control
            type="text"
            {...register("event")}
            placeholder={props.type}
          />
          <p className="error-message">{errors.event?.message}</p>
          <Form.Label>{props.type} date: </Form.Label>

          <Form.Control
            type="date"
            {...register("date")}
            placeholder={"Date"}
          />
          <p className="error-message">{errors.date?.message}</p>

          <Form.Label>{props.type} Description: </Form.Label>
          <Form.Control
            type="text"
            {...register("description")}
            placeholder={"Description"}
          />
          <p className="error-message">{errors.description?.message}</p>
        </Modal.Body>
      );
    } else {
      return (
        <Modal.Body>
          <Form.Label>{props.type} name: </Form.Label>

          <Form.Control
            type="text"
            {...register("award")}
            placeholder={props.type}
          />
          <p className="error-message">{errors.award?.message}</p>

          <Form.Label>{props.type} Description: </Form.Label>
          <Form.Control
            type="text"
            {...register("highlight_description")}
            placeholder={"Description"}
          />
          <p className="error-message">
            {errors.highlight_description?.message}
          </p>
        </Modal.Body>
      );
    }
  };
  return (
    <div>
      <Button variant="btn modal-button shadow-none" onClick={handleShow}>
        <div className="add">
          <Add />
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit(getEventdata)}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new {props.type}</Modal.Title>
          </Modal.Header>
          {displayInputs()}

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit(getEventdata)}>
              Add {props.type}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default EditModal;
