import React from "react";
import { Form, Button } from "react-bootstrap";
import FormInput from "./Form";

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

        <Form>
          <Form.Label className="form-name" column="lg" lg={2}>
            Sign-in
          </Form.Label>
          <FormInput type="text" inputName="Name" />
          <FormInput type="email" inputName="Email" />
          <Button variant="continue-btn" type="submit">
            Continue
          </Button>
        </Form>

        <div className="Formcontainer-options">
          <a href="">Forgot your password?</a>
          <a href="">New? Sign up</a>
        </div>
        <p>Copyright © 2021</p>
      </div>
      {/* <footer className="c-right">
          <p>Copyright © 2021</p>
        </footer> */}
    </>
  );
}

export default SignForm;
