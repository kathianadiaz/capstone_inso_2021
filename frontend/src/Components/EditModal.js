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
    title: Yup.string().required("Award name required"),
    description: Yup.string().required("Highlight description required"),
    date: Yup.date().required("Date required"),
  })
  .required();

const userProfileSchema = Yup.object()
  .shape({
    name: Yup.string().optional("Name required"),
    email: Yup.string().email().optional("Email required"),
    phone_number: Yup.string()
      .optional()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Phone number mininum is 10 digits")
      .max(10, "Phone number maximum is 10 digits"),
  })
  .required();

const memberSchema = Yup.object()
  .shape({
    name: Yup.string().optional("Name required"),
    email: Yup.string().email().optional("Email required"),
  })
  .required();

const organizationSchema = Yup.object()
  .shape({
    name: Yup.string().optional("Name required"),
    email: Yup.string().email().optional("Email required"),
    department: Yup.string().optional("Department needed"),
    tags: Yup.string().optional("Tags needed"),
    status: Yup.string().optional("Status needed"),
  })
  .required();

const joinSchema = Yup.object()
  .shape({
    message: Yup.string().required("Message Required"),
  })
  .required();

function EditModal(props) {
  const [show, setShow] = useState(false);
  const [state, setState] = useContext(AuthContext);
  // console.log(state?.user);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { OrganizationId } = useParams();

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
        : props.type === "Member"
        ? memberSchema
        : props.type === "Organization"
        ? organizationSchema
        : props.type === "Join"
        ? joinSchema
        : highlightSchema
    ),
  });

  const getModalData = (data) => {
    // setEventData([...eventdata, data]);
    // console.log(JSON.stringify(data, null, 2));
    setShow(false);
    console.log(props.mdata);
    if (props.type === "User") {
      sendModalData(data);
      let ujson = {
        username: state?.user.username,
        email: data.email,
        phone_number: data.phone_number,
        name: data.name,
      };
      axios.defaults.headers.put["Authorization"] = `Bearer ${state?.token}`;
      axios
        .put("http://localhost:8000/user", ujson)
        .then((response) => {
          props.setdata(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (props.type === "Member") {
      sendModalData([...props.mdata, data]);
      let hjson = {
        name: data.name,
        email: data.email,
      };
      axios.defaults.headers.post["Authorization"] = `Bearer ${state.token}`;
      axios
        .post(
          `http://localhost:8000/organization/${OrganizationId}/member-information`,
          hjson
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (props.type === "Organization") {
      let ojson = {
        name: data.name,
        email: data.email,
        description: data.description,
        tags: data.tags.split(","),
        status: data.status === "Recruiting" ? true : false,
        department: data.department,
        highlights: props.mdata.highlights,
        members: props.mdata.members,
        administrators: props.mdata.administrators,
      };
      console.log(ojson);
      axios.defaults.headers.put["Authorization"] = `Bearer ${state.token}`;
      axios
        .put(`http://localhost:8000/organization/${OrganizationId}`, ojson)
        .then((response) => {
          props.setdata(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (props.type === "Highlight") {
      sendModalData([...props.mdata, data]);
      let hjson = {
        title: data.title,
        description: data.description,
        date: data.date
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .join("-"),
      };
      axios.defaults.headers.post["Authorization"] = `Bearer ${state.token}`;
      axios
        .post(
          `http://localhost:8000/organization/${OrganizationId}/highlight`,
          hjson
        )
        .then((response) => {
          console.log(response.data.highlights);
          console.log(response);
          props.setdata([...response.data.highlights]);
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
          <p className="error-message">{errors.username?.message}</p>
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
    } else if (props.type === "Member") {
      return (
        <Modal.Body>
          <Form.Label>{props.type} real name: </Form.Label>
          <Form.Control
            type="name"
            {...register("name")}
            placeholder={"Real name"}
          />
          <p className="error-message">{errors.name?.message}</p>
          <Form.Label>{props.type} email: </Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            placeholder={"Email"}
          />
          <p className="error-message">{errors.email?.message}</p>
        </Modal.Body>
      );
    } else if (props.type === "Organization") {
      return (
        <Modal.Body>
          <Form.Label>{props.type} name: </Form.Label>
          <Form.Control
            type="text"
            {...register("name")}
            defaultValue={props.mdata.name}
            placeholder={"Name"}
          />
          <p className="error-message">{errors.name?.message}</p>

          <Form.Label>{props.type} email: </Form.Label>
          <Form.Control
            type="email"
            {...register("email")}
            defaultValue={props.mdata.email}
            placeholder={"Email"}
          />
          <p className="error-message">{errors.email?.message}</p>

          <Form.Label>{props.type} department: </Form.Label>
          <Form.Control
            type="department"
            {...register("department")}
            defaultValue={props.mdata.department}
            placeholder={"Department"}
          />
          <p className="error-message">{errors.department?.message}</p>

          <Form.Label>{props.type} description: </Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            {...register("description")}
            defaultValue={props.mdata.description}
            placeholder={"Description"}
          />
          <p className="error-message">{errors.department?.message}</p>

          <Form.Label>{props.type} tags: </Form.Label>
          <Form.Control
            type="text"
            {...register("tags")}
            defaultValue={props.mdata.tags}
            placeholder={"Tags"}
          />
          <p className="error-message">{errors.tags?.message}</p>

          <Form.Label>{props.type} status: </Form.Label>
          <Form.Select {...register("status")} size="md">
            <option>Recruiting</option>
            <option>Not Recruiting</option>
          </Form.Select>
          {/* <Form.Control
            type="text"
            {...register("status")}
            defaultValue={props.mdata.status}
            placeholder={"status"}
          /> */}
          <p className="error-message">{errors.status?.message}</p>
        </Modal.Body>
      );
    } else if (props.type === "Join") {
      return (
        <Modal.Body>
          <Form.Label>{props.type} message: </Form.Label>
          <Form.Control
            type="text"
            as="textarea"
            {...register("message")}
            placeholder={"message"}
          />
          <p className="error-message">{errors.message?.message}</p>
        </Modal.Body>
      );
    } else if (props.type === "User") {
      return (
        <Modal.Body>
          <Form.Label>{props.type} real name: </Form.Label>
          <Form.Control
            type="name"
            defaultValue={props.mdata.name}
            {...register("name")}
            placeholder={"Real name"}
          />
          <p className="error-message">{errors.name?.message}</p>
          <Form.Label>{props.type} email: </Form.Label>
          <Form.Control
            type="email"
            defaultValue={props.mdata.email}
            {...register("email")}
            placeholder={"Email"}
          />
          <p className="error-message">{errors.email?.message}</p>
          <Form.Label>{props.type} phone: </Form.Label>

          <Form.Control
            type="phone"
            defaultValue={props.mdata.phone_number}
            {...register("phone_number")}
            placeholder={"Phone number"}
          />
          <p className="error-message">{errors.phone_number?.message}</p>
        </Modal.Body>
      );
    } else {
      return (
        <Modal.Body>
          <Form.Label>{props.type} name: </Form.Label>

          <Form.Control
            type="text"
            {...register("title")}
            placeholder={props.type}
          />
          <p className="error-message">{errors.title?.message}</p>

          <Form.Label>{props.type} Description: </Form.Label>
          <Form.Control
            type="text"
            {...register("description")}
            placeholder={"description"}
          />
          <p className="error-message">{errors.description?.message}</p>
          <Form.Label>{props.type} date: </Form.Label>
          <Form.Control
            type="date"
            {...register("date")}
            placeholder={"Date"}
          />
          <p className="error-message">{errors.date?.message}</p>
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
        <Form onSubmit={handleSubmit(getModalData)}>
          <Modal.Header closeButton>
            {props.type !== "User" && props.type !== "Organization" ? (
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
            {props.type != "Organization" ? (
              <Button variant="primary" onClick={handleSubmit(getModalData)}>
                Add {props.type}
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit(getModalData)}>
                Confirm
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default EditModal;
