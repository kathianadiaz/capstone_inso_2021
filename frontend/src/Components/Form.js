import React from "react";
import { Form } from "react-bootstrap";

function FormInput(props) {
  return (
    <>
      <Form.Group
        className="mb-3"
        controlId={"formBasicEmail" + props.inputName}
      >
        <Form.Label>{props.inputName}:</Form.Label>
        <Form.Control
          inputName={props.inputName}
          type={props.type}
          placeholder={"Enter " + props.inputName}
        />
      </Form.Group>
    </>
  );
}

export default FormInput;
