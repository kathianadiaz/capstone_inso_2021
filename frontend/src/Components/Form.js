import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Form.scss";

function FormType(props) {
  return (
    <>
      <div className="Formcontainer">
        <div className="Formcontainer-logo">
          <img
            src="/TempLogo.png"
            className="form-logo"
            alt="React Bootstrap logo"
          />{" "}
        </div>

        <div className="Formcontainer-wrapper">
          <Form>
            <Form.Label className="form-name" column="lg" lg={2}>
              {props.signType}
            </Form.Label>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="continue-btn" type="submit">
              Continue
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default FormType;
