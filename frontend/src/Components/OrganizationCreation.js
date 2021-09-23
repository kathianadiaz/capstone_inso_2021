import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "./OrganizationCreation.scss";
import FormInput from "./Form";
import InputTag from "./InputTag";
function OrganzitionCreation(props) {
  const [state, setState] = useState([]);

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
        {/* <button onClick={setState("BAH")}>HERE</button> */}
        <Form>
          <Form.Label className="form-name" column="lg" lg={2}>
            Create an organization
          </Form.Label>
          <FormInput type="text" inputName="Name" />
          <FormInput type="text" inputName="Description" />
          <FormInput type="text" inputName="Department" />
          <FormInput type="email" inputName="Contact - Email" />
          <InputTag tagsType="Tags" />
          <InputTag tagsType="Links" />

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

export default OrganzitionCreation;
