import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Sign-in.scss";

function SignForm(props) {
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
              Sign-in
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

        <div className="Formcontainer-options">
          <a href="">Forgot your password?</a>
          <a href="">New? Sign up</a>
        </div>
      </div>
      <footer className="c-right">
        <p>Copyright © 2021</p>
      </footer>
    </>
  );
}

export default SignForm;
