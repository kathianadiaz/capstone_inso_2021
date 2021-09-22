import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Form.scss";

function FormInput(props) {
  return (
    <>
      <Form.Group
        className="mb-3"
        controlId={"formBasicEmail" + props.inputName}
      >
        <Form.Label>{props.inputName}:</Form.Label>
        <Form.Control
          type={props.type}
          placeholder={"Enter " + props.inputName}
        />
      </Form.Group>
    </>
  );
}

export default FormInput;
