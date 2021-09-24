import React from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./Form";

function Signup(props) {
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

        <Form>
          <Form.Label className="form-name" column="lg" lg={2}>
            Sign-up
          </Form.Label>
          <FormInput type="text" inputName="Name" />
          <FormInput type="email" inputName="Email" />
          <FormInput type="password" inputName="Password" />
          <Button variant="continue-btn" type="submit">
            Continue
          </Button>
        </Form>

        <div className="Formcontainer-options">
          <a href="">Already joined? Login</a>
        </div>
      </div>
      <p>Copyright © 2021</p>

      {/* <footer className="c-right">
        <p>Copyright © 2021</p>
      </footer> */}
    </>
  );
}

export default Signup;
