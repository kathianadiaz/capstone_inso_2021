import React, { useState, useContext } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ReactComponent as Add } from "./plus-box.svg";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "./AuthContext";

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
    // date: Yup.date().required("Date required"),
  })
  .required();

const userProfileSchema = Yup.object()
  .shape({
    email: Yup.string().email().required("Email required"),
    phone: Yup.string()
      .required()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Phone number mininum is 10 digits")
      .max(10, "Phone number maximum is 10 digits"),
  })
  .required();

function EditModal(props) {
  const [show, setShow] = useState(false);
  const [state, setState] = useContext(AuthContext);
  // console.log(state?.user);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { OrganizationId } = useParams();

  console.log(OrganizationId);
  //   const [eventdata, setEventData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      props.type === "Event"
        ? eventSchema
        : props.type === "User"
        ? userProfileSchema
        : highlightSchema
    ),
  });

  const getEventdata = (data) => {
    // setEventData([...eventdata, data]);
    // console.log(JSON.stringify(data, null, 2));
    // console.log(eventdata);
    props.type !== "User"
      ? sendModalData([...props.mdata, data])
      : sendModalData(data);
    setShow(false);

    if (props.type === "User") {
      axios
        .post(`http://localhost:8000/organization/${state.user.u_id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (props.type != "User" && props.type != "Event") {
      axios
        .post(`http://localhost:8000/organization/${OrganizationId}/highlight`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
    } else if (props.type === "User") {
      return (
        <Modal.Body>
          <Form.Label>{props.type} email: </Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            placeholder={"Email"}
          />
          <p className="error-message">{errors.email?.message}</p>
          <Form.Label>{props.type} phone: </Form.Label>

          <Form.Control
            type="phone"
            {...register("phone")}
            placeholder={"Phone"}
          />
          <p className="error-message">{errors.phone?.message}</p>
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
          {/* <Form.Label>{props.type} date: </Form.Label>
          <Form.Control
            type="date"
            {...register("date")}
            placeholder={"Date"}
          />
          <p className="error-message">{errors.date?.message}</p> */}
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
            {props.type !== "User" ? (
              <Modal.Title>Add a new {props.type}</Modal.Title>
            ) : (
              <Modal.Title>
                Change your {props.type.toLowerCase()} data
              </Modal.Title>
            )}
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
